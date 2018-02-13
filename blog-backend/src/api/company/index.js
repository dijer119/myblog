const Router = require('koa-router')
const compnaysCtrl = require('./companys.ctrl')

const compnays = new Router()

compnays.get('/', compnaysCtrl.list)
compnays.post('/', compnaysCtrl.write)
compnays.get('/:code', compnaysCtrl.read)
compnays.delete('/:code', compnaysCtrl.remove)
compnays.put('/:code', compnaysCtrl.replace)
compnays.patch('/:code', compnaysCtrl.update)

module.exports = compnays