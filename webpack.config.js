var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=10000&name=images/[hash:12].[ext]',
                exclude: '/node-modules/'
			},
            {
				test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary 
                use: [{
                    loader: 'css-loader',
                    options:{
                        minimize: true || {/* CSSNano Options */}
                    },
                },{
                    loader: 'sass-loader'
                }]
                }),
                exclude: '/node-modules/'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
                exclude: '/node-modules/'
			},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "font-loader?limit=80000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "font-loader?limit=80000"
            }
        ],
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
				test: /\.(png|jpg|gif)$/,
				use: ['url-loader?limit=10000&name=images/[hash:12].[ext]']
			},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary 
                use: [{
                    loader: 'css-loader',
                    options:{
                        minimize: true || {/* CSSNano Options */}
                    },
                },{
                    loader: 'sass-loader'
                }]
                }),
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../style.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    output:{
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    }
}