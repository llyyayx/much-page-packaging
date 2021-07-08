// 自动化引入公共文件(如reset.css)

/**
 * @desc: 自动引入公共文件-所有模板
 * @param { Object } batch.entry 入口文件
 * @param { Array } batch.entryTemplate  模板
 */
exports.automation = (batch) => {
  batch.entry['automations'] = './automation/index.js'
  batch.entryTemplate.forEach(item => {
    item.userOptions.chunks.unshift('automations')
    item.userOptions.chunksSortMode = 'manual'
  })
}