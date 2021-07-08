## 多页面优化打包

基于wepack5.0的多页面打包配置，优化了css及html的静态资源，兼容性css构建，css及js压缩优化，html未压缩这样有利于传统的后端绑定，es6语法转es5, 自刷新服务器以及自动加载入口文件与自动配置html-webpack-plugin模板。您可以根据自身的项目要求来手动添加更多的laoder与plugin

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