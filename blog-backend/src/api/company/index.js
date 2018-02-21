const Router = require('koa-router')
const companysCtrl = require('./companys.ctrl')

const companys = new Router()

companys.get('/', companysCtrl.list)
companys.post('/', companysCtrl.write)
companys.get('/:code', companysCtrl.read)
companys.delete('/:code', companysCtrl.remove)
companys.put('/:code', companysCtrl.replace)
companys.patch('/:code', companysCtrl.update)

module.exports = companys