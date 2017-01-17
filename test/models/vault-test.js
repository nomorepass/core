'use strict'

const expect = require('chai').expect
const Vault = require('../../lib/models/vault')
const VaultMocker = require('../mockers/vault')

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

  describe('create', () => {
    it('should ok', function * () {
      let mocker = VaultMocker()
      let vault = yield Vault.create(mocker)

      for (let key in mocker) {
        expect(mocker[key]).equal(vault[key])
      }
    })
  })
})
