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
      template: "./index.html", // Reference index.html in the root directory
      filename: "../index.html", // Output index.html in the root directory
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
    ],
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
