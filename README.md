# webpack-primary

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。本片博客主要是关于webpack一些基础知识讲解，webpack入门学习笔记。

## webpack安装

基础工具npm,react,node等的安装请参照github上另一篇博客 <a href=https://github.com/cq5282000/NpmProject>NpmProject</a>，安装webpack，请运行指令

```bash
# Linux & Mac
$ npm install --save webpack webpack-dev-server 
```
注：运行指令加上--save会把依赖添加到package.json

## 入口文件设置

### 单个文件入口设置

```javascript
// index.js
document.write('<h1>Hello World</h1>');
```

```html
// index.html
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
// index1.html
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
// index3.html
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
