const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 分离css文件
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 打包结果使用link引入css
                    'css-loader',
                ]
            }
        ]
    },
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
        },
        // 自定义压缩
        minimizer: [
            // 压缩css
            new OptimizeCssAssetsPlugin(),
            // 压缩js
            new TerserPlugin()
        ],
    },
    devtool: 'none',
})