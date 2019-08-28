const Router = require('koa-router')
const cookie = new Router()
const { MathRandom } = require('../utils/util')

cookie.get('/', async (ctx, next) => {
  ctx.cookies.set(
    'id',
    MathRandom(),
    {
      domain: 'localhost',  // 域名
      path: '/cookie',  // 路径
      maxAge: 24 * 60 * 60 * 1000,  // 有效时长
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      httpOnly: true, // 是否只用于http请求获取，设置true js脚本将无法读取到cookie信息，能有效防止XSS攻击
      overwrite: false, // 是否允许重写
    }
  )

  ctx.response.status = 200
  ctx.response.body = 'cookie 设置成功！'
  await next()
})

module.exports = cookie