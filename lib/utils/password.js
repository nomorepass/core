'use strict'

const crypto = require('crypto')

exports.generateSalt = () => {
  return crypto.randomBytes(16).toString('hex')
}

exports.encrypt = (password, salt) => {
  return new Promise((resolve, reject) => {
    password = Buffer.from(password, 'binary')
    salt = Buffer.from(salt, 'binary')

    crypto.pbkdf2(password, salt, 1000, 32, 'sha256', (err, key) => {
      if (err) {
        reject(err)
      } else {
        resolve(key.toString('hex'))
      }
    })
  })
}

exports.verify = (hashed, password, salt) => {
  return exports.encrypt(password, salt).then(function (_hashed) {
    return hashed === _hashed
  })
}
