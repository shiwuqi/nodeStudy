const Router = require('koa-router')
const get = new Router()

get.get('/', async (ctx, next) => {
  const { url, request, query, querystring } = ctx
  const req_query = request.query
  const req_querystring = request.querystring
  ctx.response.body = {
    url,
    query,
    querystring,
    req_query,
    req_querystring,
  }
  await next()
})

module.exports = get