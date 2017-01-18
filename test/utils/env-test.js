'use strict'

const expect = require('chai').expect
const env = require('../../lib/utils/env')

describe('env', function () {
  it('should ok', function () {
    expect(env.isTest).be.true
    expect(env.isDevlopment).be.false
  })
})
