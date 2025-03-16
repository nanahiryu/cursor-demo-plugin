const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  plugins: [
    new Dotenv({
      path: "./.env.prod",
    }),
  ],
});
