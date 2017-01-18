'use strict'

const Router = require('koa-router')
const passport = require('koa-passport')
const userController = require('../controllers/user')
const authenticated = require('../middlewares').authenticated

var router = new Router({
  prefix: '/api/users'
})

router.post('/signup', function * (next) {
  this.checkBody('username').isAlphanumeric()
  this.checkBody('password').isHexadecimal().len(32)
  this.checkBody('email').isEmail()

  if (this.errors) {
    let err = new Error(JSON.stringify(this.errors[0], null, 2))
    err.status = 400
    throw err
  }

  yield next
}, userController.signup)

router.post('/login', function * (next) {
  this.checkBody('username').isAlphanumeric()
  this.checkBody('password').isHexadecimal().len(32)

  if (this.errors) {
    let err = new Error(JSON.stringify(this.errors[0], null, 2))
    err.status = 400
    throw err
  }

  yield next
}, passport.authenticate('local'), userController.login)

router.get('/me', authenticated, userController.me)

router.post('/logout', authenticated, userController.logout)

module.exports = router
