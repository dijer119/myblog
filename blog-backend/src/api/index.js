const Router = require('koa-router')
const posts = require('./posts')
const auths = require('./auth')

const api = new Router()

api.use('/posts', posts.routes())
api.use('/auth', auths.routes())

// 라우터를 내보냅니다.
module.exports = api;