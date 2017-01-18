'use strict'

const User = require('../models').User

exports.signup = function * (next) {
  let user = yield User.create(this.request.body)

  this.body = user
}

exports.login = function * (next) {
  this.body = this.req.user
}

exports.me = function * (next) {
  this.body = this.req.user
}

exports.logout = function * (next) {
  this.session = null

  this.body = {
    ok: true
  }
}
