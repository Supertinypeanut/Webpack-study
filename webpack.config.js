const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveAnnotationPlugin = require('./remove-annotate-plugin')
/**
 * @type {import('webpack').Configuration}
*/
const config = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new RemoveAnnotationPlugin()
    ]
}

module.exports = config