const Router = require('koa-router')
const crud = new Router()
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

crud.get('/', async (ctx, next) => {
  let html = `
    <form action="http://localhost:3009/crud/insert" method="GET" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      <input type="submit" value="写入"/>
    </form>
    <form action="http://localhost:3009/crud/remove" method="POST" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      <input type="submit" value="删除"/>
    </form>
  `
  ctx.response.status = 200
  ctx.response.body = html
})

crud.get('/insert', async (ctx, next) => {
  try {
    const { query } = ctx
    await connectMongo.insert('user', query)
    ctx.response.status = 200
    ctx.response.body = '插入成功'
  } catch (e) {
    ctx.response.body = e
  }
})

crud.post('/remove', async (ctx, next) => {
  try {
    await connectMongo.remove('user', ctx.request.body)
    ctx.response.status = 200
    ctx.response.body = '删除成功！'
  } catch (e) {
    ctx.response.body = e
  }
})

module.exports = crud