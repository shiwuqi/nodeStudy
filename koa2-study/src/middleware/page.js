const Router = require('koa-router')
const page = new Router()

page.get('/', async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 'page'
  await next()
})

page.get('/helloworld', async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 'Hello World!'
  await next()
})

module.exports = page