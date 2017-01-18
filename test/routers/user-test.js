'use strict'

const expect = require('chai').expect
const request = require('supertest')
const User = require('../../lib/models').User
const UserMocker = require('../mockers/user')
const app = require('../../lib/app')
const authHelper = require('../helpers/auth')

describe('user apis', () => {
  describe('signup', () => {
    it('should ok', function * () {
      let mocker = UserMocker()

      let res = yield request(app)
        .post('/api/users/signup')
        .send({
          username: mocker.username,
          email: mocker.email,
          password: mocker.password
        })
        .expect(200)

      let user = yield User.findById(res.body.id)
      expect(user).not.be.null
    })
  })

  describe('login', () => {
    it('should ok', function * () {
      let mocker = UserMocker()
      let user = yield User.create(mocker)

      let res = yield request(app)
        .post('/api/users/login')
        .send({
          username: mocker.username,
          password: mocker.password
        })
        .expect(200)

      expect(res.body.id).equal(user.id)
    })
  })

  describe('me', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .get('/api/users/me')
        .expect(401)
    })

    it('should ok', function * () {
      let mocker = UserMocker()
      let user = yield User.create(mocker)

      let agent = yield authHelper(app, mocker)
      let res = yield agent.get('/api/users/me').expect(200)
      expect(res.body.id).equal(user.id)
    })
  })

  describe('logout', () => {
    it('shuold ok', function * () {
      let mocker = UserMocker()
      yield User.create(mocker)

      let agent = yield authHelper(app, mocker)

      agent.post('/api/users/logout').expect(200)
      agent.get('/api/users/me').expect(401)
    })
  })
})
