'use strict'

const expect = require('chai').expect
const passwordUtil = require('../../lib/utils/password')

describe('password', () => {
  describe('generateSalt', () => {
    it('should have length of 16', () => {
      let salt = passwordUtil.generateSalt()

      expect(salt).match(/[a-z0-9]{16}/)
    })
  })

  describe('encrypt', () => {
    it('should ok', function * () {
      let salt = 'salt'
      let password = 'password'
      let encrypt = yield passwordUtil.encrypt(password, salt)
      expect(encrypt).equal('632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb3')
    })
  })

  describe('verify', () => {
    it('should ok', function * () {
      let salt = 'salt'
      let password = 'password'
      let result = yield passwordUtil.verify('632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb3', password, salt)
      expect(result).be.true
    })

    it('should fail', function * () {
      let salt = 'salt'
      let password = 'password'
      let result = yield passwordUtil.verify('632c2812e46d4604102ba7618e9d6d7d2f8128f6266b4a03264d2a0460b7dcb4', password, salt)
      expect(result).be.false
    })
  })
})
