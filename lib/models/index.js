'use strict'

const User = require('./user')
const Vault = require('./vault')

User.hasMany(Vault, {
  constraints: false
})

Vault.belongsTo(User, {
  constraints: false
})

exports.User = User
exports.Vault = Vault
