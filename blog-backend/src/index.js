require('dotenv').config()

const mongoose = require('mongoose')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session')
const logger = require('koa-logger')

const api = require('./api')


// console.log(process.env)

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
	COOKIE_SIGN_KEY: signKey,
} = process.env

mongoose.Promise = global.Promise// Node 의 Promise 를 사용 하도록 설정
mongoose.set('debug', true)
mongoose.connect(mongoURI).then(() => {
  console.log('connected to mongodb')
}).catch((e) => {
  console.error(e)
})

const app = new Koa()
const router = new Router()

router.use('/api', api.routes())

// 라우터 적용전에, bodyParser 적용
app.use(bodyParser());


// session
const sessionConfig = {
  maxAge: 86500000, //하루
}

app.use(session(sessionConfig, app))
app.keys = [signKey]

// logger
app.use(logger())

// app 인스턴스에 라우터 적용
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log('listening to port', port)
})