const Router = require('koa-router')
const companyCtrl = require('./companys.ctrl')
const company = new Router()

company.get('/', companyCtrl.list)
company.post('/', companyCtrl.write)
company.post('/:code', companyCtrl.update)
company.get('/:code', companyCtrl.read)

module.exports = company