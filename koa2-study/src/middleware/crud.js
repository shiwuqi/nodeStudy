const Router = require('koa-router')
const crud = new Router()
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

crud.get('/', async (ctx, next) => {
  let html = `
    <form action="http://localhost:3009/crud/insert" method="GET" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      年龄：<input type="number" name="age" />
      职位：<input type="text" name="job" />
      <input type="submit" value="写入"/>
    </form>
    <form action="http://localhost:3009/crud/find" method="POST" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      <input type="submit" value="查询"/>
    </form>
    <form action="http://localhost:3009/crud/update" method="POST" enctype="multipart/form-data">
      更改签姓名：<input type="text" name="before" />
      更改后姓名：<input type="text" name="after" />
      <input type="submit" value="更改"/>
    </form>
    <form action="http://localhost:3009/crud/deleteone" method="POST" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      <input type="submit" value="删除单个数据"/>
    </form>
    <form action="http://localhost:3009/crud/deletemany" method="POST" enctype="multipart/form-data">
      姓名：<input type="text" name="name" />
      <input type="submit" value="删除多个数据"/>
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

crud.post('/find', async (ctx, next) => {
  try {
    const data = await connectMongo.find('user', ctx.request.body)
    ctx.response.status = 200
    ctx.response.body = data
  } catch (e) {
    ctx.response.body = e
  }
})

crud.post('/update', async (ctx, next) => {
  try {
    const params = ctx.request.body
    await connectMongo.update('user', { name: params.before }, { $set: { name: params.after } }, true)
    ctx.response.status = 200
    ctx.response.body = "更改成功！"
  } catch (e) {
    ctx.response.body = e
  }
})

crud.post('/deleteone', async (ctx, next) => {
  try {
    await connectMongo.deleteOne('user', ctx.request.body)
    ctx.response.status = 200
    ctx.response.body = '删除成功！'
  } catch (e) {
    ctx.response.body = e
  }
})

crud.post('/deletemany', async (ctx, next) => {
  try {
    await connectMongo.deleteMany('user', ctx.request.body)
    ctx.response.status = 200
    ctx.response.body = '删除成功！'
  } catch (e) {
    ctx.response.body = e
  }
})

module.exports = crud