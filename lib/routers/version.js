'use strict'

const Router = require('koa-router')
const pkg = require('../../package')

const router = new Router({
  prefix: '/api/version'
})

router.get('/', function * () {
  this.body = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    license: pkg.license
  }
})

module.exports = router
