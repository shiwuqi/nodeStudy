const Router = require('koa-router')
const post = new Router()

post.post('/', async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = ctx.request.body
  await next()
})

module.exports = post