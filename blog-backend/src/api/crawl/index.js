const Router = require('koa-router')
const crawlCtrl = require('./crawl.ctrl')
const crawl = new Router()

crawl.get('/updateAll', crawlCtrl.updateAll)
// crawl.post('/', crawlCtrl.write)
// crawl.post('/:code', crawlCtrl.update)
// crawl.get('/:code', crawltrl.read)

module.exports = crawl