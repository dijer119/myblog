const Router = require('koa-router')
const postsCtrl = require('./posts.ctrl')

const posts = new Router()

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    psth: ctx.path,
    params: ctx.params,
  }
}

posts.get('/', postsCtrl.list)
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read)

posts.post('/', postsCtrl.checkLogin, postsCtrl.write)
posts.delete('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.remove)
//  posts.put('/:id', postsCtrl.replace)
posts.patch('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId, postsCtrl.update)

module.exports = posts