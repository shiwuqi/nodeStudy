const log4js = require('log4js')
const data = new Date()

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: `logs/${new Date().toLocaleDateString()}.log` }
  },
  categories: {
    default: { appenders: ['everything'], level: 'info' }
  }
})

let logger = log4js.getLogger()

module.exports = logger