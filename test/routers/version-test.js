'use strict'

const expect = require('chai').expect
const request = require('supertest')
const app = require('../../lib/app')
const pkg = require('../../package')

describe('version', function () {
  it('should ok', function * () {
    let res = yield request(app)
      .get('/api/version')
      .expect(200)

    let keys = ['name', 'version', 'description', 'author', 'license']
    expect(res.body).have.all.keys(keys)
    for (let key of keys) {
      expect(res.body[key]).equals(pkg[key])
    }
  })
})
