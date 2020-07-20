const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const PACKAGE = require('../package.json');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        // JSON Loader
        type: 'javascript/auto',
        test: /\.(json)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      },
      {
        /**
         * Loader for bitmap fonts. (.fnt and .png from src/assets/bmpfonts/)
         * src/assets/bmpfonts/ is excluded in the default image loader.
         */
        test: /\.(fnt|png)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src/assets/bmpfonts/')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/bmpfonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: PACKAGE.name,
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '',
    filename: 'bundle.js',
  },
  stats: {
    chunks: false,
    hash: false,
    children: false,
    source: false,
    modules: false,
    warnings: false,
  },
};
