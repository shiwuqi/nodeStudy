const Router = require('koa-router')
const querystring = new Router()
const qystring = require('querystring')

querystring.get('/', async (ctx, next) => {
  const str1 = 'id=1&name=张三&age=17'
  const str2 = 'id:2*name:李四*age:26'
  ctx.response.body = {
    str1: qystring.parse(str1),
    str2: qystring.parse(str2, '*', ':'),
    '编码': qystring.escape(str1)
  }
  await next()
})

querystring.get('/stringify', async (ctx, next) => {
  const obj1 = {"id":"2","name":"李四","age":"26"}
  const obj2 = {"id":"1","name":"张三","age":"17"}
  ctx.response.body = {
    obj1: qystring.stringify(obj1),
    obj2: qystring.unescape(qystring.stringify(obj2, '*', ':'))
  }
  await next()
})


module.exports = querystring