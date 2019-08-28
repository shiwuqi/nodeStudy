const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const _static = require('koa-static') // 加载静态资源 localhost:3009/images/men.png
const bodyParser = require('koa-bodyparser')  // 获取post请求参数

app.use(bodyParser())

app.use(_static(
  path.join(__dirname, './static')
))

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.status === 200
    ctx.response.body = `
      <ul>
        <li><a href="/page">/page</a></li>
        <li><a href="/page/helloworld">/page/helloworld</a></li>
        <li><a href="/get?id=1&name=zhangsan">/get</a></li>
        <li><a href="/post">/post</a></li>
      </ul>
    `
  }
  await next()
})

let pages = fs.readdirSync(__dirname + '/middleware')

pages.forEach(item => {
  let module = require(__dirname + '/middleware/' + item)
  router.use('/' + item.replace('.js', ''), module.routes(), module.allowedMethods())
})

app.use(router.routes())


// 挂载日志模块
app.use(async (ctx, next) => {
  ctx.util = {
    log: require('./utils/log')
  }
  await next()
})

// 记录日志
app.use(async (ctx, next) => {
  ctx.util.log.info('Something important')
  await next()
})

app.listen(3009, () => {
  console.log('starting ar port 3009')
})