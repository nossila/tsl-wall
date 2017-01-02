const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const common = {
    entry: {
        app: PATHS.app,
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
        publicPath: "/",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'node_modules/html-webpack-template/index.ejs',
            title: 'TSL\'s wall',
            appMountId: 'root',
            inject: false,
            mobile: true,
        })
    ]
};

const dev = {
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        inline: true,
        progress: true,
        host: process.env.HOST,
        port: process.env.PORT,
        stats: {colors: true},
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};

const prod = {
    // devtool: 'cheap-module-source-map',
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
    },
    plugins: [
        new CleanPlugin([PATHS.build]),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __PRODUCTION__: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

if(TARGET === 'build') {
    module.exports = merge(common, prod);
} else {
    module.exports = merge(common, dev);
}
