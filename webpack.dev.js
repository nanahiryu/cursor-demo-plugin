const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  plugins: [
    new Dotenv({
      path: "./.env.dev",
    }),
  ],
});
