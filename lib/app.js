'use strict'

const Koa = require('koa')
const config = require('config')
const logger = require('koa-pino-logger')

const app = new Koa()
const port = config.port

app.use(logger())

app.use(function * (next) {
  this.log.info('logger')

  yield next
})

app.use(function * () {
  this.body = 'Hello World!'
})

app.listen(port, function (err) {
  if (err) {
    console.error('listen failed:', err)
  } else {
    console.log(`listen success:, port: ${port}`)
  }
})
