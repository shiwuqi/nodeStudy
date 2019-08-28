const Router = require('koa-router')
const error = new Router()

error.get('/', async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 404
  await next()
})

module.exports = error