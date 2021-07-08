## 多页面优化打包

基于wepack5.0的多页面打包配置，优化了css及html的静态资源，兼容性css构建，css及js压缩优化，html未压缩这样有利于传统的后端绑定，es6语法转es5, 自刷新服务器以及自动加载入口文件与自动配置html-webpack-plugin模板。您可以根据自身的项目要求来手动添加更多的laoder与plugin。

### 公共文件

提供了公共文件抽离配置，公共的css,js请放入common文件夹内，并且在入口文件引用，在打包的时候这些公共文件不会被重复打包而是抽离出来。
如果你想要的是自动引入某些公共类库,请在automation/index.js中的引入，这些文件将会自动打包并引入进模板，但注意入口文件禁止命名为automations。
禁用自动引入可以webpack.config.js中注释autoLoad.automation(batch)即可。
一些ui库js库无需打包的直接在模板引入即可。

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


### 启动


```
gir clone 项目地址
cd much-page-packaging
npm install
npm run serve

```