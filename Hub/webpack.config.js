const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
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
      template: "./src/template.html",
      filename: "../index.html",
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname),
        publicPath: "/",
        watch: true,
      },
      {
        // Serve all pattern directories from the repo root so iframe
        // URLs like /Behavioral/ChainOfResponsibility/index.html resolve correctly
        directory: path.join(__dirname, ".."),
        publicPath: "/",
        watch: false,
      },
    ],
    compress: true,
    port: 9001,
    hot: true,
    open: true,
  },
};
