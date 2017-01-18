'use strict'

exports.list = function * (next) {
  let user = this.req.user

  this.body = yield user.getVaults()
}
