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
