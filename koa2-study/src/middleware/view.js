const Router = require('koa-router')
const view = new Router()

view.get('/', async (ctx, next) => {
  await ctx.render('index', {
    message: '模板引擎'
  })
})

module.exports = view