const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/styles", to: "styles" },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
};
