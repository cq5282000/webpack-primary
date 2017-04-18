# webpack-primary

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。本片博客主要是关于webpack一些基础知识讲解，webpack入门学习笔记，工程已经上传，测试的时候，记得修改webpack.config.js，把对应部分的注释取消掉

## webpack安装

基础工具npm,react,node等的安装请参照github上另一篇博客 <a href=https://github.com/cq5282000/NpmProject>NpmProject</a>，安装webpack，请运行指令

```bash
# Linux & Mac
$ npm install --save webpack webpack-dev-server 
```
注：运行指令加上--save会把依赖添加到dependencies

## 入口文件设置

### 单个文件入口设置

```javascript
// index.js
document.write('<h1>Hello World</h1>');
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body>
        <script type="text/javascript" src="bundle.js"></script>
    </body>
</html>
```
webpack.config.js是webpack的配置文件，需要手动新建。

```javascript
// webpack.config.js
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    }
};
```

启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```
然后访问 http://127.0.0.1:8080

### 多文件入口设置

```javascript
// index1.js
document.write('<h1>Hello World index1.js</h1>');
```

```javascript
// index2.js
document.write('<h1>Hello World index2.js</h1>');
```

```html
<!-- index1.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body>
        <script type="text/javascript" src="bundle1.js"></script>
        <script type="text/javascript" src="bundle2.js"></script>
    </body>
</html>
```

```javascript
// webpack.config.js
module.exports = {
    entry: {
        bundle1: './index1.js',
        bundle2: './index2.js',
    },
    output: {
        filename: '[name].js'
    }
};
```

启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```
然后访问 http://127.0.0.1:8080/index1.html

## loader－加载器

loader是一个能编译你app资源文件的预加载器。

### babal-loader

Babel-loader能编译JSX/ES6文件为JS文件,首先安装babel-loader

```bash
# Linux & Mac
$ npm install --save babel-loader
```

此时会提示安装 ^6.4.0，需要安装babel-core@^6.0.0，运行

```bash
# Linux & Mac
$ npm install --save babel-core
```

然后安装babel-preset-es2015,添加对ES2015的支持,

```bash
# Linux & Mac
$  npm install --save babel-preset-es2015
```

```javascript
// index.jsx
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);
```

```html
<!-- index3.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body>
        <div id="wrapper"></div>
        <script type="text/javascript" src="bundle.js"></script>
    </body>
</html>
```

```javascript
// webpack.config.js
module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  }
};
```
webpack.config.js的配置文件也可以写成如下形式

```javascript
// webpack.config.js
module.exports = {
  entry: './index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        }
      },
    ]
  }
};
```
启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```
然后访问 http://127.0.0.1:8080/index3.html

### css-loader

Webpack允许你在JS文件中require CSS , 然后用CSS加载器预加载CSS，你必须用两个加载器来编译CSS文件，第一个是css-loader用来阅读CSS文件，另一个是style-loader来插入style标签到HTML页面中,不同的加载器靠感叹号标记链接（!）,首先安装这两个加载器：


```bash
# Linux & Mac
$ npm install --save css-loader style-loader
```
```css
//app.css
body{
    background-color: blue;
}
```

```javascript
// index3.js
require('./app.css');
```


```javascript
// webpack.config.js
module.exports = {
    entry: './index3.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader'
            },
        ]
    }
};
```

启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```
然后访问 http://127.0.0.1:8080/

### image loader

首先安装图片加载器

```bash
# Linux & Mac
$ npm install --save url-loader
```
此时会提示需要安装file-loader，版本无要求

```bash
# Linux & Mac
$ npm install --save file-loader
```

```javascript
// index4.js
var img1 = document.createElement("img");
img1.src = require("./1.jpg");
document.body.appendChild(img1);
```

```javascript
// webpack.config.js
module.exports = {
    entry: './index4.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.(png|jpg)?$/,
                loader: 'url-loader?limit=8192'
            },
        ]
    }
};
```
小于8192字节的图片将会被转化base64数据流，大于他的正常链接传输

启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```
然后访问 http://127.0.0.1:8080/

## Plugins

webpack有一个插件系统来扩展它的功能，这里我挑两个个人觉得比较有意思的插件来给大家讲解一下

### Open Browser Webpack Plugin 

open-browser-webpack-plugin 插件可以当webpack服务器启动时自动打开浏览器设置。

首先安装open-browser-webpack-plugin插件

```bash
# Linux & Mac
$ npm install --save open-browser-webpack-plugin
```

```javascript
// index5.js
document.write('<h1>open-browser-webpack-plugin</h1>');
```

```javascript
// webpack.config.js
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
```

启动服务器

```bash
# Linux & Mac
$ webpack-dev-server 
```

## Hot Module Replacement  

HMR即webpack的模块热替换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新。

```javascript
// App.js
import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <h1>Hot module Replacement</h1>
        );
    }
}
```

```javascript
// index6.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
 
```html
<!-- index5.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
    <body>
        <div id='root'></div>
        <script type="text/javascript" src="/static/bundle.js"></script>
    </body>
</html>
```

启动热模块替换

```bash
# Linux & Mac
$ webpack-dev-server --hot --inline
```
此时不要关闭服务器，开启终端，用vim编辑App.js，观察到效果。
