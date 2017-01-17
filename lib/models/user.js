'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../configs/sequelize')
const passwordUtil = require('../utils/password')

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z][0-9a-zA-Z_-]{4,14}[a-zA-Z0-9]$/
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  paranoid: true
})

function hashPassword (user) {
  if (user.changed('password')) {
    user.salt = passwordUtil.generateSalt()

    return passwordUtil.encrypt(user.password, user.salt)
      .then(function (hashed) {
        user.setDataValue('password', hashed)
      })
  }
}

User.addHook('beforeCreate', hashPassword)
User.addHook('beforeUpdate', hashPassword)

module.exports = User
