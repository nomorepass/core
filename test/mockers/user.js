'use strict'

let count = 0

module.exports = (options) => {
  count++

  let user = {
    username: `usernmae${count}`,
    password: `password${count}`,
    salt: `salt${count}`,
    email: `email${count}@test.com`
  }

  return Object.assign(user, options)
}
