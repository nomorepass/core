'use strict'

const expect = require('chai').expect
const request = require('supertest')
const User = require('../../lib/models').User
const UserMocker = require('../mockers/user')
const Vault = require('../../lib/models').Vault
const VaultMocker = require('../mockers/vault')
const authHelper = require('../helpers/auth')
const app = require('../../lib/app')

describe('vault apis', () => {
  describe('create', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .post('/api/vaults')
        .send(VaultMocker())
        .expect(401)
    })

    it('should ok', function * () {
      let usermock = UserMocker()
      let user = yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)

      expect(res.body).have.all.keys(['id', 'userId', 'name', 'url', 'note', 'username', 'password', 'createdAt', 'updatedAt'])
      expect(res.body).include(vaultmock)

      expect(res.body.userId).equal(user.id)

      let vault = yield Vault.findOne({ where: { id: res.body.id, userId: user.id } })
      expect(vault).exist
    })
  })

  describe('list', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .get('/api/vaults')
        .expect(401)
    })

    it('should ok', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vault = res.body

      res = yield agent
        .get('/api/vaults')
        .expect(200)

      expect(res.body.length).equal(1)
      expect(res.body[0].id).equal(vault.id)
    })
  })

  describe('getById', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .get('/api/vaults/1')
        .expect(401)
    })

    it('should ok', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vault = res.body

      res = yield agent
        .get(`/api/vaults/${vault.id}`)
        .expect(200)

      expect(res.body.id).equal(vault.id)
    })

    it('should return 404', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)

      let vaultId = res.body.id + 1
      yield agent
        .get(`/api/vaults/${vaultId}`)
        .expect(404)
    })
  })

  describe('update', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .put('/api/vaults/1')
        .send({ username: 'newname' })
        .expect(401)
    })

    it('should ok', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vaultId = res.body.id

      let newvaultmock = VaultMocker()

      res = yield agent
        .put(`/api/vaults/${vaultId}`)
        .send(newvaultmock)
        .expect(200)

      expect(res.body.id).equal(vaultId)
      expect(res.body).include(newvaultmock)

      let vault = yield Vault.findOne({ where: { id: vaultId } })
      expect(vault.toJSON()).include(newvaultmock)
    })

    it('should return 404', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vaultId = res.body.id

      let newvaultmock = VaultMocker()

      yield agent
        .put(`/api/vaults/${vaultId + 1}`)
        .send(newvaultmock)
        .expect(404)
    })
  })

  describe('remove', () => {
    it('should return 401 before login', function * () {
      yield request(app)
        .del('/api/vaults/1')
        .expect(401)
    })

    it('should ok', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vaultId = res.body.id

      res = yield agent
        .del(`/api/vaults/${vaultId}`)
        .expect(200)

      let vault = yield Vault.findOne({ where: { id: vaultId } })
      expect(vault).not.exist
    })

    it('should return 404', function * () {
      let usermock = UserMocker()
      yield User.create(usermock)
      let agent = yield authHelper(app, usermock)

      let vaultmock = VaultMocker()
      let res

      res = yield agent
        .post('/api/vaults')
        .send(vaultmock)
        .expect(200)
      let vaultId = res.body.id

      yield agent
        .del(`/api/vaults/${vaultId + 1}`)
        .expect(404)
    })
  })
})
