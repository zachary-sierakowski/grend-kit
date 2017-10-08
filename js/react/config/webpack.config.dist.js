const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

const jsSourcePath = path.join(__dirname, "./src");
const buildPath = path.join(__dirname, "./dist");
const imgPath = path.join(__dirname, "./src/assets/img");
const sourcePath = path.join(__dirname, "./src");

// Common plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor-[hash].js",
    minChunks(module) {
      const context = module.context;
      return context && context.indexOf("node_modules") >= 0;
    }
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, "../../index.html"),
    path: buildPath,
    filename: "index.html"
  }),
  new CopyWebpackPlugin([
    { from: path.join(__dirname, "favicon.ico"), to: buildPath }
  ])
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"]
  },
  {
    test: /\.(png|gif|jpg|svg|otf|eot|ttf|woff|woff2)$/,
    include: [imgPath],
    use: "url-loader?limit=20480&name=assets/[name]-[hash].[ext]"
  }
];

if (isProduction) {
  // Production plugins
  plugins.push(
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
  );
} else {
  // Development plugins
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  devtool: isProduction ? false : "source-map",
  context: jsSourcePath,
  entry: ["babel-polyfill", "./render.js"],
  output: {
    path: buildPath,
    publicPath: "/",
    filename: "app-[hash].js"
  },
  module: {
    rules
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "node_modules"), jsSourcePath]
  },
  plugins,
  devServer: {
    contentBase: isProduction ? buildPath : sourcePath,
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/service": {
        target: "http://localhost:6040",
        pathRewrite: { "^/service": "" }
      },
      "/mail": {
        target: "http://localhost:80"
      }
    },
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: "0.0.0.0",
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
};
