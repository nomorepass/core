'use strict'

const Router = require('koa-router')
const vaultCtl = require('../controllers/vault')

const router = new Router({
  prefix: '/api/vaults'
})

router.get('/', vaultCtl.list)

module.exports = router
