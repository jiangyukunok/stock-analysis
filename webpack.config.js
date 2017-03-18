var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/app/app-client.js',
    output: { path: __dirname, filename: './public/build/bundle.js'},
    watch: true,
    module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
          }
        ]
    },
};