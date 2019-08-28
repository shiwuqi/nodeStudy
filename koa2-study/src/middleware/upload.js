const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const upload = new Router()

upload.get('/', async (ctx, next) => {
  let html = `
    <form action="http://localhost:3009/upload/file" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" id="file" />
      <input type="submit" value="提交"/>
    </form>
  `
  ctx.response.status = 200
  ctx.response.body = html
  await next()
})

upload.post('/file', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  const reader = fs.createReadStream(file.path) // 创建可读流
  const filePath = path.resolve(__dirname, '../../public/upload') + `/${file.name}` // 获取上传文件扩展名
  const upstream = fs.createWriteStream(filePath)  // 创建可写流
  reader.pipe(upstream) // 可读流通过管道写入可写流
  ctx.response.status = 200
  ctx.response.body = "上传成功！"
  await next()
})

module.exports = upload