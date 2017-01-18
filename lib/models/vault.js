'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../configs/sequelize')

const Vault = sequelize.define('vault', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  paranoid: false
})

module.exports = Vault
