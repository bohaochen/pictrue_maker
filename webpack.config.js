const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './main/index.js',
    output: {
        path: path.resolve(__dirname, 'builded'),
        filename: 'abc.bundle.js'
    },
    mode: 'production',
    devServer: {
        contentBase: path.join(__dirname, "builded"),
        compress: true,
        port: 9011
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '小小小页面'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.coffee$/, // may apply this only for some modules
            options: {
              unknownContextCritical: false
            }
          })
   
    ],
    module: {
        unknownContextCritical: false,
        rules: [
            {
                test: /(?:\.js|\.jsx|\.es6)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.coffee$/,
                use: [ 'coffee-loader' ]
              },
              {
                test: /coffee/,
                loaders: ['shebang-loader']
              }
        ]
    }
};