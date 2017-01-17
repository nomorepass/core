'use strict'

const Sequelize = require('sequelize')
const config = require('config')
const debug = require('debug')('nomorepass:configs:sequelize')
const envUtil = require('../utils/env')

const sequelizeConfig = config.sequelize

let sequelize = new Sequelize('passwordmanager', null, null, {
  dialect: 'sqlite',
  storage: sequelizeConfig.sqlite.storage,
  logging: function () {}
})

sequelize
  .sync({
    force: envUtil.isTest
  })
  .then(function () {
    debug('connect ok')
  })
  .catch(function (err) {
    debug('connect fail', err)
  })

module.exports = sequelize
