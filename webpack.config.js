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
        new webpack.HotModuleReplacementPlugin(),
        // 定义项目变量值
        new webpack.DefinePlugin({
            API_BASE_URL: JSON.stringify('https://api.example.com')
        })
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
    }
    
}

module.exports = (env, argv) => {
    if (env === 'development') {
      // 为 config 添加开发模式下的特殊配置
      config.mode = 'development'
      config.devtool = 'cheap-eval-module-source-map'
    } else if (env === 'production') {
      // 为 config 添加生产模式下的特殊配置
      config.mode = 'production'
      config.devtool = 'none'
    }
    
    return config
}