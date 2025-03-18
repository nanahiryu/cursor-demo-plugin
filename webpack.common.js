const path = require("path");

const { default: TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: {
    config: "./src/pages/config/index.tsx",
    desktop: "./src/pages/desktop/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, "plugin", "js"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
};
