'use strict'

module.exports = function * (next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    let err = new Error('Unauthorized')
    err.status = 401
    throw err
  }
}
