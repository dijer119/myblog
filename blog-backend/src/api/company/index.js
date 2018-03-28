const Router = require('koa-router')
const companyCtrl = require('./companys.ctrl')
const company = new Router()

company.get('/:code', companyCtrl.list)
company.post('/:code', companyCtrl.write)
company.post('/:code/:id', companyCtrl.update)
company.get('/:code/:id', companyCtrl.read)

module.exports = company