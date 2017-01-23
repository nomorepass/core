'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../configs/sequelize')

const Vault = sequelize.define('vault', {
  name: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  note: {
    type: Sequelize.TEXT,
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
