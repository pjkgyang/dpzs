var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('postcss-cssnext')({
                        features: {
                            rem: false
                        }
                    })
                    // ,
                    // require('postcss-pxtorem')({
                    //   rootValue: 20,
                    //   propWhiteList: []
                    // })
                ],
                loaders: {
                    'scss': 'style-loader!css-loader!sass-loader'
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }, {
        test: /\.(eot|svg|ttf|woff|woff2|otf|mov)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },{
            test: /\.s[a|c]ss$/,
            loader: 'style!css!sass',
            options: {
              includePaths: [
                'node_modules/breakpoint-sass/stylesheets',
                'node_modules/normalize-scss/sass'
                // 'node_modules/susy/sass'
              ]
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            'src',
            'node_modules'
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true,
        host: '0.0.0.0',
        port: 8081
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.output.publicPath = './dist/';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            "WEBPACK_CONFIG_HOST": '"http://careful.wisedu.com/emap/sys/etender/api/"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        })
    ])
} else if (process.env.NODE_ENV === 'development') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            "WEBPACK_CONFIG_HOST": '"http://172.16.121.166:8080/emap/sys/etender/api/"'
        })
    ])
}