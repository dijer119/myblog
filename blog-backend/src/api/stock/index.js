const Router = require('koa-router')
const stockCtrl = require('./stock.ctl')
const stock = new Router()

stock.get('/', stockCtrl.list)
stock.post('/', stockCtrl.write)
stock.post('/:code', stockCtrl.update)
stock.get('/:code', stockCtrl.read)

module.exports = stock