'use strict'

const passport = require('koa-passport')
const User = require('../../models').User

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      done(null, user)
    })
    .catch(done)
})

require('./local')

module.exports = passport
