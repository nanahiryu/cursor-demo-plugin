const path = require("path");

const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "plugin-playwright", "js"),
    filename: "[name].js",
  },
  plugins: [
    new Dotenv({
      path: "./.env.test",
    }),
  ],
});
