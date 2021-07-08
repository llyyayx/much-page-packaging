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

  optimization: {
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          //initial表示提取入口文件的公共部分
          chunks: 'initial',
          //表示提取公共部分最少的文件数
          minChunks: 2,
          //表示提取公共部分最小的大小
          minSize: 0,
          //提取出来的文件命名
          name: 'commons'
        }
      }
    }
  },

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
