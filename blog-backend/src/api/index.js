const Router = require('koa-router')
const posts = require('./posts')
const auth = require('./auth')
const company = require('./company')
const crawl = require('./crawl')
const comment = require('./comment')

const api = new Router()

api.use('/posts', posts.routes())
api.use('/auth', auth.routes())
api.use('/company', company.routes())
api.use('/crawl', crawl.routes())
api.use('/comment', comment.routes())

// 라우터를 내보냅니다.
module.exports = api;