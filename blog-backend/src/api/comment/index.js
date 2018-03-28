const Router = require('koa-router')
const commentCtrl = require('./comment.ctrl')
const comment = new Router()

comment.get('/', commenCtrl.listAll)
comment.get('/:code', commentCtrl.list)
comment.post('/:code', commentCtrl.write)
// comment.post('/:id', commentCtrl.update)
// comment.get('/:id', commentCtrl.read)

module.exports = comment