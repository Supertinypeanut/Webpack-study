const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveAnnotationPlugin = require('./remove-annotate-plugin')
const { VueLoaderPlugin }  = require('vue-loader')
const copyWebpackPlugin  = require('copy-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
*/
module.exports = {
    mode: 'none',
    entry: {
        main: './src/main.js',
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js', // [name] 是入口名称
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.md$/,
                use: './markdown-loader'
            },
            {
                test: /\.html/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['index'], // 指定使用 index.bundle.js
        }),
        new HtmlWebpackPlugin({
            title: 'main',
            template: 'public/main.html',
            filename: 'main.html',
            chunks: ['main'] // 指定使用 main.bundle.js
        }),

        new RemoveAnnotationPlugin(),
        new copyWebpackPlugin({
            patterns: [{ from: './src/assets', to: 'assets' },{ from: './public/favicon.ico', to: '' }]
        }),
    ],
}