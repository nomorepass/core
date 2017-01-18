'use strict'

const crypto = require('crypto')

let count = 0

module.exports = (options) => {
  count++

  let user = {
    username: `usernmae${count}`,
    password: crypto.randomBytes(16).toString('hex'),
    salt: `salt${count}`,
    email: `email${count}@test.com`
  }

  return Object.assign(user, options)
}
