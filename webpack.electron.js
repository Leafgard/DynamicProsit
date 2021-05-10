const path = require('path')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, opts) => ({
    // Build Mode
    mode: 'development',
    // Electron Entrypoint
    entry: './src/main.ts',
    target: 'electron-main',
    devtool: 'source-map',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: /src/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                }
            ]
        }]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    plugins: [
        new Dotenv(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '/src/preload.js'),
                    to: path.join(__dirname, '/dist/preload.js')
                }
            ]
        })
    ]
})
