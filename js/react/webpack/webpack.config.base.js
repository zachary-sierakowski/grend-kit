const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT = path.resolve(__dirname, "../");
const IMG_PATH = path.resolve(ROOT, "src/assets/img");

module.exports = {
  entry: [
    "babel-polyfill",
    "isomorphic-fetch",
    path.resolve(ROOT, "src/render.js")
  ],
  output: {
    path: path.resolve(ROOT, "dist"),
    publicPath: "/",
    filename: "app-[hash].js"
  },
  devtool: false,
  context: path.resolve(ROOT, "src"),
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(ROOT, "node_modules")]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        include: path.resolve(ROOT, "node_modules", "antd"),
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|gif|jpg|svg|otf|eot|ttf|woff|woff2)$/,
        include: [IMG_PATH],
        use: "url-loader?limit=20480&name=assets/[name]-[hash].[ext]"
      }
    ]
  },
  plugins: [
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      path: path.resolve(ROOT, "dist"),
      template: path.resolve(ROOT, "../index.html"),
      favicon: path.resolve(ROOT, "favicon.ico")
    })
  ]
};
