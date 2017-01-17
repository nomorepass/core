'use strict'

const expect = require('chai').expect
const User = require('../../lib/models/user')
const UserMocker = require('../mockers/user')

describe('User model', () => {
  describe('definition', () => {
    it('should have expect fields', () => {
      let user = User.build(UserMocker())
      expect(user.dataValues).have.all.keys([
        'id',
        'username',
        'password',
        'salt',
        'email'
      ])
    })
  })

  describe('create', () => {
    it('should ok', function * () {
      let usermock = UserMocker()
      let user = yield User.create(usermock)
      expect(user.username).equal(usermock.username)
      expect(user.password).not.equal(usermock.password)
    })

    it('should fail if dumplicate username', function * () {
      let error = null
      let username = UserMocker().username
      try {
        yield User.create(UserMocker({ username: username }))
        expect(true).be.true
        yield User.create(UserMocker({ username: username }))
      } catch (err) {
        error = err
      }
      expect(error).not.be.null
    })

    it('should fail if dumplicate email', function * () {
      let error = null
      let email = UserMocker().email
      try {
        yield User.create(UserMocker({ email: email }))
        expect(true).be.true
        yield User.create(UserMocker({ email: email }))
      } catch (err) {
        error = err
      }
      expect(error).not.be.null
    })
  })

  describe('save', () => {
    it('should ok', function * () {
      let usermock = UserMocker()
      let user = yield User.build(usermock).save()
      expect(user.username).equal(usermock.username)
      expect(user.password).not.equal(usermock.password)
    })

    it('should re enctypt if password changed', function * () {
      let rawpassword = 'a password'
      let user = yield User.build(UserMocker({
        password: rawpassword
      })).save()
      let hashed = user.password
      user.password = rawpassword
      user = yield user.save()
      expect(user.password).not.equal(hashed)
      expect(user.password).not.equal(rawpassword)
    })
  })
})
