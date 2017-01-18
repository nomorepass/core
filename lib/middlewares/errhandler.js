'use strict'

const env = require('../utils/env')

module.exports = function * (next) {
  try {
    yield * next
  } catch (err) {
    let status = err.status || 500
    let errcode = err.code || 100
    let message = err.message || 'unknown error'

    if (env.isDevlopment || status === 500) {
      console.error(err)
    }

    this.status = status
    this.body = {
      code: errcode,
      message: message
    }
  }
}
