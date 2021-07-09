const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const publicPath = './'

// 入口文件
const entry = {}
// 入口文件对应的模板
const entryTemplate = []

exports.entry = () => {
  seekAllFile()
  setEntryTemplate()
  return { entry, entryTemplate }
}

// 得到pages文件夹下所有入口文件(支持无限嵌套)
const seekAllFile = (parent = 'pages/*') => {
  const fileList = glob.sync(path.resolve(__dirname, parent))
  if (fileList.length > 0) {
    fileList.forEach(file => {
      const regJs = file.match(/.*\/(.*js)/i)
      if (regJs !== null && regJs[1]) {
        const jsName = regJs[1]
        const key = jsName.match(/(.*).js/i)[1]
        entry[key] = publicPath + parent.replace(/\*/, '') + jsName
      } else {
        const parentPath = parent.replace(/\*/, '')
        const reg = new RegExp(parentPath + '(.*)', 'i')
        const folder = file.match(reg)[1]
        if (!file.match(/.*\/(.*?)\..*/)) {
          console.log(file)
          seekAllFile(parentPath + folder + '/*')
        }
      }
    })
  } else {
    return
  }
}

// 设置入口文件的模板文件(附加功能)
const setEntryTemplate = () => {
  Object.keys(entry).forEach(key => {
    entryTemplate.push(new HtmlWebpackPlugin({
      template: entry[key].replace(/\.js/, '.html'),
      filename: key + '.html',
      chunks: [key],
      inject: 'body',
      minify: false
    }))
  })
}
