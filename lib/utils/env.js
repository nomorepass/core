'use strict'

let env = process.env.NODE_ENV

module.exports = {
  isTest: env === 'test',
  isDevlopment: env === 'dev'
}
