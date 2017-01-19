'use strict'

const Koa = require('koa')
const config = require('config')
const json = require('koa-json')
const cors = require('koa-cors')
const session = require('koa-generic-session')
const validate = require('koa-validate')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-pino-logger')

const passport = require('./configs/passport')
const middlewares = require('./middlewares')
const routers = require('./routers')
const env = require('./utils/env')

const app = new Koa()
const port = config.port

app.use(middlewares.errhandler)

if (!env.isTest) {
  app.use(logger())
}
app.use(cors())
app.use(json())
app.use(bodyParser())
validate(app)
app.keys = config.session.keys
app.use(session())
app.use(passport.initialize())
app.use(passport.session())

routers(app)

const server = app.listen(port, function (err) {
  if (err) {
    console.error('listen failed:', err)
  } else {
    console.log(`listen success: ${port}`)
  }
})

module.exports = server
