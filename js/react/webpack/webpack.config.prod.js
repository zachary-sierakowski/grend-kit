const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

module.exports = Object.assign({}, baseConfig, {
  plugins: baseConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ])
});
