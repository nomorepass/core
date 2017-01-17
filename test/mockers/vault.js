'use strict'

let count = 0

module.exports = (options) => {
  count++

  let vault = {
    name: `name${count}`,
    url: `url${count}`,
    note: `note${count}`,
    username: `username${count}`,
    password: `password${count}`
  }

  return Object.assign(vault, options)
}
