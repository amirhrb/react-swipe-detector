<!-- prettier-ignore-start -->

# React Swipe Detector

react-swipe-detector is a React library to detect Touch Swipes and Directions.


```console
npm i react-swipe-detector
```

After installing react-swipe-detector, you can import **useSwipe** hook in your React components like this:

import useSwipe from *'react-swipe-detector'*
and cteate a ref connect it to **div** element that you want swipe happen in it and pass it to useSwipe hook:

```javascript
//1 import 
import { useSwipe } from "react-swipe-detector";

function MyComponent() {
    //2 create the ref using useRef
    const myRef = useRef(null);
    //4 pass ref to useSwipe hook and get primary and secondary value from it!
    const [primary,secondary] = useSwipe(myRef);
    return (
        //3 pass that ref to div you want to swipe in
        <div ref={myRef}>
            Swipe me!
        </div>
    );
}
```

whenever you touch, move your touch and then end touch if this process pass this tests it will return primary as direction of swipe and secondary as unwanted swipe direction(it's actually used as detail).

- Allowed time for move is 250ms
- Minimum of movement distance should be more than 130px

![react-swipe-detector-tests](./public/swipe-detector-tests.jpg)

----------

The returned values are strings of swipe directions and distance of their swipes:
- vertical swipe:

```javascript
primary:{ 
    primaryDir: "up" or "down", 
    primaryDist: //distance of swipe(px) 
    },
secondary:{ 
    secondaryDir: "right" or "left",
    secondaryDist: //distance of swipe(px) 
    },
```

- horizontal swipe: 
```javascript
primary:{ 
    primaryDir: "right" or "left", 
    primaryDist: //distance of swipe(px) 
    },
secondary:{ 
    secondaryDir: "up" or "down",
    secondaryDist: //distance of swipe(px) 
    },
```
![react-swipe-detector-returned-values](./public/swipe-detector-returned-values.jpg)

----------


if primary is vertical secondary will be horizontal and vice versa.

you can use it for your animation or any anything you want happen on swipe.

----------
NOTEs: 
- it only work on touchable devices that support usual touch events
- better to cancel user-select and user-drag for that div using: 
```css
/* css */
    user-select: none;
    -webkit-user-drag: none;
```
and 
```javascript
//javascript
    <div onDragStart={(event)=>{
        event.preventDefault();
        event.target.setAttribute ('draggable', false);
    }}>
```




<!-- prettier-ignore-end -->
