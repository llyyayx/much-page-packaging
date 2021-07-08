const batch = require('./wepack.batch.entry')['entry']()

const plugin = [
  ...batch.entryTemplate
]

console.log(plugin)
console.log(batch.entry)