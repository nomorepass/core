'use strict'

const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models').User
const passwordUtil = require('../../utils/password')

passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({
    where: {
      username: username
    }
  }).then(function (user) {
    if (!user) {
      done(null, false, { message: 'username/password not match' })
    } else {
      return passwordUtil
        .verify(user.password, password, user.salt)
        .then(function (isMatched) {
          if (isMatched) {
            done(null, user)
          } else {
            done(null, false, { message: 'username/password not match' })
          }
        })
        .catch(done)
    }
  }).catch(done)
}))
