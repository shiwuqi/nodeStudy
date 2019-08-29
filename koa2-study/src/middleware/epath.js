const Router = require('koa-router')
const path = require('path')
const epath = new Router()

epath.get('/', async (ctx, next) => {
  ctx.response.body = {
    'normalize': path.normalize('D:/github/nodeStudy/koa2-study/src///static//images/men.png'),
    'join': path.join(__dirname, '../../src/static/images/men.png'),
    '__dirname': __dirname,
    '__filename': __filename,
    '路径目录名': path.dirname('/src/static/images/men.png'),
    '路径最后一部分': path.basename('/src/static/images/men.png'),
    '路径最后一部分 排除指定字符串': path.basename('/src/static/images/men.png', '.png'),
    'extname': path.extname('/src/static/images/men.png'),
    'resolve': path.resolve('src', 'static/images', 'men.png'),
    'isAbsolute': path.isAbsolute('./men.png'),
    'parse': path.parse(__dirname),
    'format': path.format(path.parse(__dirname))
  }
  await next()
})

module.exports = epath