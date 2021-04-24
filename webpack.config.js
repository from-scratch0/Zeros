const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ["@babel/preset-env", "@babel/preset-react", "mobx"],
                  plugins: [
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-transform-runtime"
                ]
                }

          }
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        { // 字体文件
          test: /\.(ttf|eot|woff|woff2)$/,
          type: 'asset/resource',
        }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        'public',
      ]
    }),
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      chunks: ['app'],
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: './dist',
    open: true,
    hot: true,
  },
};