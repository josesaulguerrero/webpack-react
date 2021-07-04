const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const miniCSS = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle[contenthash].js', 
      clean: true, 
   },
   resolve: {
      extensions: ['.js', '.jsx']
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
   ],
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3006,
      open: true,
   }
}