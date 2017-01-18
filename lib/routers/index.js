'use strict'

const debug = require('debug')('nomorepass:routers')

module.exports = function (app) {
  let routers = ['vault', 'version', 'user']

  for (let routerName of routers) {
    let router = require(`./${routerName}`)
    debug(`loading router: ${routerName}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
