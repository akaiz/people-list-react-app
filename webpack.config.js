const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8888';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const SRC_DIR = `${__dirname}/src`;
const DIST_DIR = `${__dirname}/public`;

module.exports = {
  entry: [`${SRC_DIR}/index.jsx`],
  devtool: devMode === 'development' ? 'inline-source-map' : false,
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader'],
        exclude: /node_modules(?!\/react-conventions)/,
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: { minimize: true },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Src: path.resolve('src'),
      styles: path.resolve('styles'),
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/template.html`,
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: PORT,
    host: HOST,
  },
};
