const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const batch = require('./wepack.batch.entry')['entry']();

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {

  target: "web",

  entry: batch.entry,

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name]/[name].[hash].js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase:  path.resolve(__dirname, "dist"),
    compress: true,
    hot: false,
    open: true,
    port: 8080,
  },

  plugins: [
    // 清除生成文件夹在build
    new CleanWebpackPlugin(),
    // 入口文件对应的模板
    ...batch.entryTemplate,
    // 合并文件内css
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[hash].css'
    }),
    // css压缩
    new CssMinimizerPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: false
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
        generator: {
					filename: 'static/[hash][ext][query]'
				}
      }
    ],
  },

};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
