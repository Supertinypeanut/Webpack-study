const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveAnnotationPlugin = require('./remove-annotate-plugin')
const { VueLoaderPlugin }  = require('vue-loader')
const webpack = require('webpack')
const copyWebpackPlugin  = require('copy-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
*/
const config = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist')
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
            title: 'DevServer&Proxy',
            template: 'public/index.html'
        }),

        new RemoveAnnotationPlugin(),
        new copyWebpackPlugin({
            patterns: [{ from: './src/assets', to: 'assets' }]
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // port: 9000,
        // 详细配置文档：https://webpack.js.org/configuration/dev-server/
        proxy: {
            '/api': {
              target: 'https://api.github.com',
              pathRewrite: {
                '^/api': '' // 替换掉代理地址中的 /api
              },
              changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
            }
        },
            // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
    },
    devtool: '#cheap-module-eval-source-map',
}

module.exports = config