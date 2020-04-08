const webpack = require('webpack');
const webpackMerge = require('webpack-merge')

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const path = require('path');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const formatMessages = require('./common/format-messages');
const config = require('./config');
const webpackBaseConfig = require('./webpack.config.base');

const resolvePath = p => path.resolve(__dirname, p);

// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
//////////******** */

const OutPutPath = resolvePath('../dist/static');
const JsFileName = 'zz-static/js/[name].[chunkhash:8].js';
const JsChunkFileName = 'zz-static/js/[name].[chunkhash:8].js';
const CssFileName = 'zz-static/css/[name].[contenthash:8].css';
const CssChunkFileName = 'zz-static/css/[name].[contenthash:8].css';
const ImgFileName = 'zz-static/img/[name].[hash:8].[ext]';

const wpConfig = {
    entry: {
        entry: [resolvePath('../src/app/polyfill.js'),resolvePath('../src/app/index.js')]
    },
    output: {
        path: OutPutPath,
        publicPath: '/', //生产环境设置成根即可
        filename: JsFileName,
        chunkFilename: JsChunkFileName
    },
    module: {
        rules: []
    },
    plugins: []
}


wpConfig.mode = 'production';
wpConfig.devtool = 'none';

wpConfig.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: false
            },
        },
        {
            loader: "css-loader",
        },
        {
            loader: "sass-loader"
        },
        {
            loader: "postcss-loader"
        }
    ]
});
//暂不开启,使用下面的基础 loader
// wpConfig.module.rules.push({
//     test: /\.(png|jpg|gif)$/,
//     use: [{
//         loader: 'url-loader',
//         options: {
//             limit: 8192,
//             name: ImgFileName
//         }
//     }]
// });

//使用这个来把图片的地址和 cdn 地址进行绑定
//获得随机cdn 地址

function getAssetsCdnHost() {

    let i=0;
    let len = config.staticAssetsCdnHost.length || 0;
    
    return function(url){
        if (!len) {
            return url;
        }
        if(i>=len){
            i=0;
        }
        const r = config.staticAssetsCdnHost[i] + url; 

        i++;

        return r;
    }
  
}

const getAssetsCdnHost1=getAssetsCdnHost();

wpConfig.module.rules.push({
    // "file" loader 可以把 js 和 css 中导入图片的语句替换成正确的地址，并同时把文件输出到对//应的位置。
    test: /\.(png|jpg|gif|jpeg|webp)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: ImgFileName,
            publicPath: getAssetsCdnHost1
        }
    }]
});



const plugins = [
    new MiniCssExtractPlugin({
        filename: CssFileName,
        chunkFilename: CssChunkFileName
    }),
    // 删除文件 保留新文件
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"development"', IS_DEV: true },
        __SERVER__: false,
        __CLIENT__: true
    }),
    //生成 manifest 方便定位对应的资源文件
    new ManifestPlugin({
        fileName: '../server/server/asset-manifest.json',
    })
    // new ProgressBar({
    //     format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    //     clear: false
    // })
];

wpConfig.plugins = wpConfig.plugins.concat(plugins);

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    //console.info(percentage, message, ...args);
};

//TODO:压缩不需要 source map
wpConfig.optimization = {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                },
                warnings: false,
                ie8: true,
                output: {
                    comments: false,
                },
            },
            cache: true,
            parallel: true,
            sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin(),
       // new webpack.ProgressPlugin(handler) 
    ],
    splitChunks: {
        cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.scss$/,
                chunks: 'all',
                enforce: true,
            },
            libs: { // 抽离第三方插件
                test: /node_modules/, // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'libs', // 打包后的文件名，任意命名    
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: -10
            },
            commons: { // 抽离自己写的公共代码
                chunks: 'async',
                test: /\.jsx?$/,
                name: 'commons', // 任意命名
                minSize: 0, // 只要超出0字节就生成一个新包
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true
            }
        }
    }
    // runtimeChunk: {
    //     name: entrypoint => `manifest.${entrypoint.name}`
    // }
}

//###下面代码隐藏打包的信息，还是应该看到比较好,可以知道每个包的大小
// const comipler = webpack(wpConfig);
// comipler.run((error, stats) => {
//     var res = formatMessages(stats.toJson({}, true));
//     if (res.errors.length) {
//         console.log('Failed to compile.\n');
//         //比如parse失败 通常会返回两个同样的错误 一个parse fail一个module build
//         //fail 但是内容是一样的；我们只取第一个即可;
//         res.errors.length = 1;
//         console.log(res.errors.join('\n\n'));
//     } else if (res.warnings.length) {
//         console.log('Compiled with warnings.\n');
//         console.log(res.warnings.join('\n\n'));
//     }
// });
////###END


module.exports = webpackMerge(webpackBaseConfig, wpConfig);