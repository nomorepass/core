'use strict'

const Vault = require('../models').Vault

exports.create = function * (next) {
  let user = this.req.user
  let body = this.request.body
  body.userId = user.id

  this.body = yield Vault.create(body)
}

exports.getById = function * (next) {
  let user = this.req.user
  let id = this.params.id

  let vault = yield Vault.findOne({
    where: {
      userId: user.id,
      id: id
    }
  })

  if (vault) {
    this.body = vault
  } else {
    let err = new Error('Not Found')
    err.status = 404
    throw err
  }
}

exports.update = function * (next) {
  let user = this.req.user
  let id = this.params.id
  let body = this.request.body

  let vault = yield Vault.findOne({
    where: {
      userId: user.id,
      id: id
    }
  })

  if (vault) {
    for (let key of ['name', 'username', 'password', 'url', 'note']) {
      if (body[key]) {
        vault[key] = body[key]
      }
    }
    this.body = yield vault.save()
  } else {
    let err = new Error('Not Found')
    err.status = 404
    throw err
  }
}

exports.list = function * (next) {
  let user = this.req.user

  this.body = yield user.getVaults()
}

exports.remove = function * (next) {
  let user = this.req.user
  let id = this.params.id

  let vault = yield Vault.findOne({
    where: {
      userId: user.id,
      id: id
    }
  })

  if (vault) {
    yield vault.destroy()
    this.body = {
      ok: true
    }
  } else {
    let err = new Error('Not Found')
    err.status = 404
    throw err
  }
}
