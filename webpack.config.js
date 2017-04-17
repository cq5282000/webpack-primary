/**
 * Created by chenqu on 17/4/17.
 */
// webpack.config.js

/*单个文件入口设置*/

// module.exports = {
//     entry: './index.js',
//     output: {
//         filename: 'bundle.js'
//     }
// };

/*多个文件入口设置*/

// module.exports = {
//     entry: {
//         bundle1: './index1.js',
//         bundle2: './index2.js'
//     },
//     output: {
//         filename: '[name].js'
//     }
// };

/*加载器 babel-loader*/

// module.exports = {
//     entry: './index.jsx',
//     output: {
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders:[
//             {
//                 test: /\.js[x]?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader?presets[]=es2015&presets[]=react'
//             },
//         ]
//     }
// };

/*css-loader*/

// module.exports = {
//     entry: './index3.js',
//     output: {
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders:[
//             {
//                 test: /\.css?$/,
//                 loader: 'style-loader!css-loader'
//             },
//         ]
//     }
// };

/*image-loader*/

// module.exports = {
//     entry: './index4.js',
//     output: {
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders:[
//             {
//                 test: /\.(png|jpg)?$/,
//                 loader: 'url-loader?limit=8192'
//             },
//         ]
//     }
// };

/*open-browser-webpack-plugin*/

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: './index5.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
};
