'use strict'

module.exports = {
  port: 4217,
  name: 'nomorepass',
  sequelize: {
    sqlite: {
      storage: 'nomorepass.db'
    }
  },
  session: {
    keys: ['random key']
  }
}
