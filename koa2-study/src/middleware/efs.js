const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const efs = new Router()

efs.get('/', async (ctx, next) => {
  // 同步读取
  const result = fs.readFileSync(path.join(__dirname, '../static/files/hello.txt'), function(err, data) {
    if (err) {
      console.log(err)
    }
  })
  ctx.response.status = 200
  ctx.response.body = result.toString()
  await next()
})

module.exports = efs