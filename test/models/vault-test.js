'use strict'

const expect = require('chai').expect
const Vault = require('../../lib/models').Vault
const VaultMocker = require('../mockers/vault')
const User = require('../../lib/models').User
const UserMocker = require('../mockers/user')

describe('Vault model', () => {
  describe('definition', () => {
    it('should have expect fields', () => {
      let vault = Vault.build(VaultMocker())
      expect(vault.dataValues).have.all.keys([
        'id',
        'name',
        'username',
        'password',
        'url',
        'note'
      ])
    })
  })

  describe('getUser', () => {
    it('should have getUser methods', function * () {
      let vault = yield Vault.create(VaultMocker({ userId: 4 }))
      expect(vault.getUser).instanceof(Function)
    })

    it('should get user', function * () {
      let user = yield User.create(UserMocker())
      let vault = yield Vault.create(VaultMocker({ userId: user.id }))

      let u = yield vault.getUser()
      expect(u.id).equal(user.id)
    })
  })

  describe('create', () => {
    it('should ok', function * () {
      let mocker = VaultMocker({ userId: 0 })
      let vault = yield Vault.create(mocker)

      for (let key in mocker) {
        expect(mocker[key]).equal(vault[key])
      }
    })
  })
})
