'use strict'

const Koa = require('koa')
const config = require('config')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-pino-logger')

const middlewares = require('./middlewares')
const routers = require('./routers')
const env = require('./utils/env')

const app = new Koa()
const port = config.port

app.use(middlewares.errhandler)

if (!env.isTest) {
  app.use(logger())
}
app.use(json())
app.use(bodyParser())

routers(app)

const server = app.listen(port, function (err) {
  if (err) {
    console.error('listen failed:', err)
  } else {
    console.log(`listen success:, port: ${port}`)
  }
})

module.exports = server
