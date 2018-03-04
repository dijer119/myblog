const Router = require('koa-router')
const stockCtrl = require('./stock.ctl')
const stock = new Router()

stock.post('/', stockCtrl.write)

module.exports = stock