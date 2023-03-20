import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import transformRuntime from "@babel/plugin-transform-runtime";
import presetEnv from "@babel/preset-env";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
      presets: [presetEnv],
      plugins: [transformRuntime],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    terser(),
  ],
  // If you are using React version 17 or higher, make sure to add the following line to avoid warnings.
  external: Object.keys(pkg.peerDependencies || {}),
};
