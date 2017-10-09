const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

const ROOT = path.resolve(__dirname, "../");
const HOST = "0.0.0.0";
const PORT = 3000;

// add hot module replacement
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
// add hot loader patch _after_ the polyfill (first index)
baseConfig.entry.splice(1, 0, "react-hot-loader/patch");

module.exports = Object.assign({}, baseConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(ROOT, "src"),
    inline: true,
    hot: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    proxy: [
      {
        context: "/service",
        target: "http://localhost:6040",
        pathRewrite: { "^/service": "" }
      },
      {
        context: "/mail",
        target: "http://localhost:80"
      }
    ],
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: "\u001b[32m"
      }
    }
  }
});
