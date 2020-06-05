const path = require("path");

module.exports = {
  entry: {
    index: ["babel-polyfill", "./src/index.js"],
    edit: ["babel-polyfill", "./src/edit.js"],
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: ["transform-object-rest-spread"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/scripts/",
    open: true,
  },
  devtool: "source-map",
};
