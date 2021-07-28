## 多页面优化打包

基于wepack5.0的多页面打包配置，优化了css及html的静态资源，兼容性css构建，css及js压缩优化，html未压缩这样有利于传统的后端绑定，es6语法转es5, 自刷新服务器以及自动加载入口文件与自动配置html-webpack-plugin模板。您可以根据自身的项目要求来手动添加更多的loader与plugin。

### 公共文件

提供了公共文件抽离配置，公共的css,js请放入common文件夹内，并且在入口文件引用，在打包的时候这些公共文件不会被重复打包而是抽离出来。
如果你想要的是自动引入某些公共类库,请在automation/index.js中的引入，这些文件将会自动打包并引入进模板，但注意入口文件禁止命名为automations。
禁用自动引入可以webpack.config.js中注释autoLoad.automation(batch)即可。
一些ui库js库无需打包的放入static文件夹并直接在模板引入即可。

### 前提

目录结构请按照demo中的设置

```
pages
  --main
    main.js
    main.html
  --serch
    serch.js
    serch.html

src
  --css
    --main
        --main.css
  --js
    --main
        --main.js
  --image
    --main
        --icon.pnf
```

### 目录说明

```
automation 自动引入公共资源js脚本(index.js内的资源会自动注入)
common 公共资源(css/js)存放的文件夹
pages html静态页面
src 资源存放文件夹(按页面划分)，存放各个页面的图片，css，js资源等
static 静态资源文件夹(一般存放库文件)，如jquery, uicss等
```


### 启动


```
git clone 项目地址
cd much-page-packaging
npm install
npm run serve
chrome: 127.0.0.1:8080/main.html  // 这是一个404页面
```


### 关于热更新

```
在webpack.config.js中热更新是开启的
{ 
  devServer: {
    hot: true
  }
}
但是新入手的同志们需要注意：在你更改入口文件及其依赖文件(js\jsx等等)时，更改保存后浏览器会自动更新，无需手动
刷新浏览器(所谓热更新嘛)，但是更新模板文件(.html)webpack是不会记录更新的！你需要刷新浏览器来看模板文件的改动，
如果你想更改模板文件(.html)浏览器自动刷新的话，请把webpack.config.js文件中devServer配置项中的hot改为false
```