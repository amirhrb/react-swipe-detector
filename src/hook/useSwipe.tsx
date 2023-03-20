import React, { useEffect, useState } from "react";

let startX: number,
  startY: number,
  distY: number,
  distX: number,
  elapsedTime: number,
  startTime: number;
const threshold = 130;
const allowedTime = 250;

interface States {
  0: string | null;
  1: string | null;
}

const useSwipe = (elRef: React.RefObject<HTMLDivElement>) => {
  const [directions, setDirections] = useState<States>(() => [null, null]);
  const touchStartHandler = (e: TouchEvent) => {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
  };
  const touchMoveHandler = (e: TouchEvent) => {
    e.preventDefault(); // prevent scrolling when inside DIV
  };
  const touchEndHandler = (e: TouchEvent) => {
    const touchObj = e.changedTouches[0];
    distY = startY - touchObj.pageY; // get total dist traveled by finger while in contact with surface
    distX = startX - touchObj.pageX;
    elapsedTime = new Date().getTime() - startTime; // get time elapsed
    // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
    const verticalDirection = distY > 0 ? "up" : "down";
    const horizontalDirection = distX > 0 ? "left" : "right";
    const swipeTypeCheck = () => {
      if (elapsedTime > allowedTime) return false;
      if (Math.abs(distY) > threshold && !(Math.abs(distX) >= 100)) {
        setDirections(() => [verticalDirection, horizontalDirection]);
      }
      if (Math.abs(distX) > threshold && !(Math.abs(distY) >= 100)) {
        setDirections(() => [horizontalDirection, verticalDirection]);
      }
      return false;
    };
    swipeTypeCheck();
    e.preventDefault();
  };
  useEffect(() => {
    elRef.current.addEventListener("touchstart", touchStartHandler);
    elRef.current.addEventListener("touchmove", touchMoveHandler);
    elRef.current.addEventListener("touchend", touchEndHandler);
    return () => {
      elRef.current.removeEventListener("touchstart", touchStartHandler);
      elRef.current.removeEventListener("touchmove", touchMoveHandler);
      elRef.current.removeEventListener("touchend", touchEndHandler);
    };
  }, []);
  return directions;
};
export default useSwipe;
