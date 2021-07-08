const batch = require('./wepack.batch.entry')['entry']()
const autoLoad = require('./webpack.automation.load')
autoLoad.automation(batch)

const plugin = [
  ...batch.entryTemplate
]

console.log(plugin)
console.log(batch.entry)
