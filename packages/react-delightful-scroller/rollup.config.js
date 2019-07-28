import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import pkg from "./package.json";

// eslint-disable-next-line no-undef
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";

const getPlugins = () => [
  eslint(),
  external(),
  resolve(),
  babel({
    comments: true,
    exclude: "node_modules/**"
  }),
  commonjs()
];

export default [
  !isDev && {
    input: "src/index.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      }
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: getPlugins().concat([terser()])
  },
  // Built in both dev and prod
  {
    input: "src/index.js",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      }
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: getPlugins()
  },
  !isDev && {
    input: "src/index.js",
    output: {
      globals: {
        react: "React"
      },
      name: "ReactDelightfulScroller",
      file: pkg["umd:main"],
      format: "umd",
      sourcemap: true
    },
    plugins: getPlugins().concat([terser()])
  }
].filter(Boolean);
