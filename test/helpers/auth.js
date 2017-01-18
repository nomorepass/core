'use strict'

const request = require('supertest')

module.exports = function * (app, userInfo) {
  let agent = request.agent(app)

  yield agent.post('/api/users/login')
    .send({
      username: userInfo.username,
      password: userInfo.password
    })
    .expect(200)

  return agent
}
