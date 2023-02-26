const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack') //

const config = (env, argv) => {
  console.log('argv.mode:', argv.mode)

  const backend_url = argv.mode === 'production'
    ? 'http://localhost:3003'
    : 'http://localhost:3003'

  return {
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  //entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
//    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    //historyApiFallback: true,
    compress: true,
    proxy: {
      '/': {
          target: 'http://localhost:3003',
          secure: false
      }
    //current: {"node":"12.16.1","npm":"6.13.4"})
    },
    //proxy: {
      //"/": "http://localhost:3003"
    //},
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      BACKEND_URL: JSON.stringify(backend_url)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  //devServer: {
    //historyApiFallback: true,
  //},
  }
};

module.exports = config
