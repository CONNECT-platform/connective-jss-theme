import path from 'path';
import config from './base.conf';
import webpack from 'webpack';

const HTMLWebpackPlugin =  require('html-webpack-plugin');
const merge = require('webpack-merge');


export default merge(config, <webpack.Configuration>{
  entry: path.resolve(__dirname, '../../samples/csr-index.tsx'),
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../../dist'),
    overlay: true,
    port: 3000,
  },
  plugins: [
    new HTMLWebpackPlugin({ title: 'CONNECTIVE JSS THEME DEV' })
  ],
  output: {
    filename: 'test.bundle.js',
    path: path.resolve(__dirname, '../../dist'),
  }
});
