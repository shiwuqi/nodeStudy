const Router = require('koa-router')
const crud = new Router()
const { ConnectMongo } = require('../utils/mongo')

let connectMongo = new ConnectMongo()
connectMongo.open()

const data = {
  id: 2,
  name: '李四',
  age: 21
}

crud.get('/', async (ctx, next) => {
  try {
    await connectMongo.insert('user', data)
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