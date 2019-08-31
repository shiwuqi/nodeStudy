const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const _static = require('koa-static') // 加载静态资源 localhost:3009/images/men.png
const bodyParser = require('koa-bodyparser')  // 获取post请求参数
const views = require('koa-views')
const koaBody = require('koa-body')

app.use(bodyParser())

app.use(_static(
  path.join(__dirname, './static')
))

// 模板引擎要放在ctx.render之前(bug: ctx.render is not a function)
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小限制  默认最大2M
  }
}))

app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.status === 200
    ctx.response.body = `
      <ul>
        <li><a href="/page">/page</a></li>
        <li><a href="/page/helloworld">/page/helloworld</a></li>
        <li><a href="/get?id=1&name=zhangsan">/get</a></li>
        <li><a href="/post">/post</a></li>
        <li><a href='/cookie'>/cookie</a></li>
        <li><a href='/view'>/view</a></li>
        <li><a href='/upload'>/upload</a></li>
        <li><a href='/curd'>/crud</a></li>
        <li><a href='/epath'>/epath</a></li>
        <li><a href='/querystring'>/querystring</a></li>
        <li><a href='/querystring/stringify'>/querystring/stringify</a></li>
        <li><a href='/efs'>/efs</a></li>
        <li><a href='/efs/async'>/efs/async</a></li>
        <li><a href='/efs/readdir'>/efs/readdir</a></li>
        <li><a href='/efs/readdirSync'>/efs/readdirSync</a></li>
        <li><a href='/efs/unlink'>/efs/unlink</a></li>
        <li><a href='/efs/unlinkSync'>/efs/unlinkSync</a></li>
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
  console.log('Server starts at http://127.0.0.1:3009/')
})