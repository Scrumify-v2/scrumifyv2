const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'), // not sure what build script will build re: directory name
    // publicPath: path.resolve(__dirname, 'build') // when I uncomment this, I get 'Cannot GET /' error and nothing displays
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: '/index.html'
    })
  ],
  devServer: {
    static: {
      publicPath: 'build', // used to be /build
      directory: path.resolve(__dirname, 'build') // unsure about contents of static
    },
    historyApiFallback : true,
    proxy: {
      '/**':{
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      } 
    }
  }
};