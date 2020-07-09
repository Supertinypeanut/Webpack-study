const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')

module.exports = merge(common, {
    plugins: [
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
    devtool: 'cheap-module-eval-source-map'
})