const Router = require('koa-router')
const posts = require('./posts')
const auth = require('./auth')
const stock = require('./stock')
const comapny = require('./company')
const crawl = require('./crawl')

const api = new Router()

api.use('/posts', posts.routes())
api.use('/auth', auth.routes())
api.use('/company', comapny.routes())
api.use('/stock', stock.routes())
api.use('/crawl', crawl.routes())

// 라우터를 내보냅니다.
module.exports = api;