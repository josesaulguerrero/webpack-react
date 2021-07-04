const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const miniCSS = require('mini-css-extract-plugin');
const cssMinimizer = require('css-minimizer-webpack-plugin');
const terser = require('terser-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle[contenthash].js', 
      clean: true, 
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         '@components': path.resolve(__dirname, 'src', 'components/'),
         '@styles': path.resolve(__dirname, 'src', 'styles')
      }
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            }
         },
         {
            test: /\.html$/,
            use: [
               { loader: 'html-loader' }
            ]
         },
         {
            test: /\.s?[ac]ss$/,
            use: [
               miniCSS.loader,
               'css-loader',
               'sass-loader',
            ]
         },
      ]
   },
   plugins: [
      new htmlPlugin({
         inject: true,
         template: './public/index.html',
         filename: './index.html',
      }),
      new miniCSS({
         filename: 'assets/styles/[name].[contenthash].css',
      }),
      // new cssMinimizer(),
   ],
   optimization: {
      minimize: true,
      minimizer: [
         new cssMinimizer(),
         new terser(),
      ]
   }
}