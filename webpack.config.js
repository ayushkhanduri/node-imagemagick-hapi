const webpack = require("webpack");
const path = require("path");

const BUILD_DIR =  path.resolve(__dirname,"build/client");
const APP_DIR = path.resolve(__dirname, "client/src")


const webpackPackConfiguration = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module :  {
        loaders : [
            {
                test : /\.jsx?$/,
                exclude: /node_modules/,
                include : APP_DIR,
                loader : 'babel-loader',
                query:
                {
                    presets:['react']
                }
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            },
            {
                test: /\.gif$/,
                loader: 'file-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]&limit=10000&mimetype=application/font-woff'
            }, //
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]&limit=10000&mimetype=application/octet-stream' },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]'
            }, //
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]&limit=10000&mimetype=image/svg+xml'
            }//
        ]

    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        })
    ]
}

module.exports = webpackPackConfiguration;
