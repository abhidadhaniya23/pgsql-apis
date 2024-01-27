import { expect } from 'chai'
import supertest from 'supertest'
import { v4 as uuid } from 'uuid'

import adminApp from '../../admin.js'
import app from '../../app.js'
import responseStatus from '../constants/response/responseStatus.js'
import { pmUser } from './constants.js'

describe('User Routes for Admin', () => {
  let testUserId

  it('should register a new user', async () => {
    const response = await supertest(app)
      .post('/api/user/register')
      .send({
        username: 'testuser',
        user_id: uuid(),
        ...pmUser,
      })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('user_id')
    testUserId = response.body.data.user_id
  })

  it('should login the registered user', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ ...pmUser })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('token')
  })

  it('should update the user role', async () => {
    const devLogin = await supertest(app)
      .post('/api/user/login')
      .send({ ...pmUser })

    const { user_id } = devLogin.body.data

    const response = await supertest(adminApp)
      .put(`/api/user/${user_id}`)
      .send({ ...pmUser, role_id: 1 })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
  })
})
