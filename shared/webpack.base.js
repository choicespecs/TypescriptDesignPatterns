/**
 * Shared webpack configuration factory for all design pattern demos.
 *
 * Usage in each pattern's webpack.config.js:
 *
 *   const createConfig = require("../../shared/webpack.base.js");
 *   module.exports = createConfig(__dirname);
 *
 * Options:
 *   template  - path to the HTML template (default: "./src/template.html")
 *   port      - dev server port (default: 9000)
 */

const path = require("path");
const { createRequire } = require("module");

module.exports = function createConfig(patternDir, options = {}) {
  const {
    template = "./src/template.html",
    port = 9000,
  } = options;

  // Resolve packages from the pattern's own node_modules
  const patternRequire = createRequire(path.join(patternDir, "package.json"));
  const HtmlWebpackPlugin = patternRequire("html-webpack-plugin");

  return {
    entry: "./src/index.ts",
    output: {
      path: path.join(patternDir, "dist"),
      filename: "index.js",
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template,
        filename: "../index.html",
      }),
    ],
    devServer: {
      static: [
        { directory: path.join(patternDir, "dist") },
        { directory: patternDir, publicPath: "/", watch: true },
        {
          // Serve shared/ at /shared so @import "/shared/base.css" resolves
          directory: path.resolve(patternDir, "../../shared"),
          publicPath: "/shared",
          watch: true,
        },
      ],
      compress: true,
      port,
      hot: true,
      open: true,
    },
  };
};
