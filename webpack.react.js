const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = (env, opts) => ({
    mode: 'development',
    entry: './src/renderer.tsx',
    target: 'web',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist/renderer.js'),
        compress: true,
        port: 9000,
        historyApiFallback: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'font-family': 'Poppins',
                                    'primary-color': '#7B2CBF',
                                    'link-color': '#7B2CBF'
                                },
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'renderer.js',
        publicPath: opts.mode === 'development' ? '/' : './'
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
})
