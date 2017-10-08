const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ENV = process.env.NODE_ENV || "development";
const HOST = "0.0.0.0";
const PORT = 3000;

const ROOT = path.resolve(__dirname, "../");
const IMG_PATH = path.resolve(ROOT, "src/assets/img");

const devServer = {
  contentBase: path.resolve(ROOT, "src"),
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
};

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
  devtool: "source-map",
  context: path.resolve(ROOT, "src"),
  devServer,
  resolve: {
    extensions: [".js"],
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
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, "../index.html"),
      path: path.resolve(ROOT, "dist"),
      filename: "index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(ROOT, "favicon.ico"),
        to: path.resolve(ROOT, "dist")
      }
    ]),
    new webpack.HotModuleReplacementPlugin()
  ]
};
