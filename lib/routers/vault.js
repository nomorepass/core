'use strict'

const Router = require('koa-router')
const authenticated = require('../middlewares').authenticated
const vaultController = require('../controllers/vault')

const router = new Router({
  prefix: '/api/vaults'
})

router.use(authenticated)

router.post('/', vaultController.create)

router.get('/:id', vaultController.getById)

router.put('/:id', vaultController.update)

router.get('/', vaultController.list)

router.del('/:id', vaultController.remove)

module.exports = router
