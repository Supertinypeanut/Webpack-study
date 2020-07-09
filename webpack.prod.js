const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    optimization: {
        // 使用导出
        usedExports: true,
        // 压缩代码
        minimize: true,
        // 尽可能将模块合并到一个函数
        concatenateModules: true,
        // 模块副作用移除
        sideEffects: true,
        splitChunks: {
            // 自动提取所有公共模块到单独 bundle
            chunks: 'all'
        }
    },
    devtool: 'none',
})