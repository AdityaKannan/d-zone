var webpack = require("webpack");
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var merge = require('webpack-merge');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;

var common = {
    entry: './script-client/main.js',
    output: {
        path: './web',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js',''],
        root: path.resolve('./script-client'),
        modulesDirectories: [
            'node_modules',
            'common',
            'components',
            'managers',
            'managers/ui',
            'managers/view',
            'managers/world',
            'systems'
        ]
    }
};

if(TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                sourceMap: false,
                compress: {
                    warnings: false
                }
            })
        ]
    });
}

if(TARGET === 'watch') {
    module.exports = merge(common, {
        devtool: 'source-map',
        output: {
            path: './web',
            filename: 'bundle.js',
            sourceMapFilename: '[file].map'
        }
    });
}

if(TARGET === 'dev') {
    module.exports = merge(common, {
        devtool: 'source-map',
        output: {
            path: './web',
            filename: 'bundle.js',
            sourceMapFilename: '[file].map'
        },
        devServer: {
            historyApiFallback: true,
            hot: false,
            inline: true,
            progress: true,
            contentBase: './web',
            host: '0.0.0.0',
            port: 7778
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'webpack/index.ejs',
                inject: 'body'
            })
        ]
    });
}