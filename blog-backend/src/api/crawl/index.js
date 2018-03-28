const Router = require('koa-router')
const crawlCtrl = require('./crawl.ctrl')
const crawl = new Router()

crawl.get('/updateAll', crawlCtrl.updateAll)
crawl.get('/updateSigaInfo', crawlCtrl.updateSigaInfo)
crawl.get('/updateDividendInfo', crawlCtrl.updateDividendInfo)
// crawl.post('/', crawlCtrl.write)
// crawl.post('/:code', crawlCtrl.update)
// crawl.get('/:code', crawltrl.read)

module.exports = crawl