import { expect } from 'chai'
import supertest from 'supertest'
import { v4 as uuid } from 'uuid'

import app from '../../app.js'
import responseStatus from '../constants/response/responseStatus.js'
import { verifyToken } from '../utils/jwtTokens.js'
import { devUser, pmUser, projectConfiguration } from './constants.js'

let pmToken, devToken, testProjectId

describe('User Routes', () => {
  it('should register a new user', async () => {
    const response = await supertest(app)
      .post('/api/user/register')
      .send({
        username: 'testuser',
        user_id: uuid(),
        ...devUser,
      })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('user_id')
  })

  it('should login the registered user', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ ...devUser })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('token')
  })

  it('should return an error if email is incorrect', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ ...devUser, email: 'incorrect@user.com' })

    expect(response.body.code).to.equal(404)
    expect(response.body).to.have.property('status').equal(responseStatus.recordNotFound)
    // expect(response.body).to.have.property('message').equal('Incorrect Email!')
  })

  it('should return an error if password is incorrect', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ ...devUser, password: 'incorrectpassword' })

    expect(response.body.code).to.equal(404)
    expect(response.body).to.have.property('status').equal(responseStatus.recordNotFound)
    // expect(response.body).to.have.property('message').equal('Wrong credentials!')
  })

  it('should return an error if email or password is invalid', async () => {
    const response = await supertest(app)
      .post('/api/user/login')
      .send({ email: 'invalidemail', password: 'invalid' })

    expect(response.body.code).to.equal(422)
    expect(response.body).to.have.property('status').equal(responseStatus.validationError)
    expect(response.body).to.have.property('data').to.be.an('array').lengthOf(2)
  })
})

describe('Project Routes', () => {
  before(async () => {
    // Login with project manager credentials
    const loginResponse = await supertest(app)
      .post('/api/user/login')
      .send({ ...pmUser })

    expect(loginResponse.body.code).to.equal(200)
    expect(loginResponse.body).to.have.property('status').equal(responseStatus.success)
    expect(loginResponse.body).to.have.property('data')
    expect(loginResponse.body.data).to.have.property('token')
    pmToken = loginResponse.body.data.token
  })

  it('should create a project using project manager credentials', async () => {
    const { userId } = verifyToken(pmToken)

    const response = await supertest(app)
      .post('/api/project')
      .set('Authorization', `Bearer ${pmToken}`)
      .send({
        ...projectConfiguration.createProject,
        manager_id: userId, // Assuming a random manager ID for simplicity
      })

    expect(response.body.code).to.equal(200)
    expect(response.body).to.have.property('status').equal(responseStatus.success)
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.have.property('project_id')
    testProjectId = response.body.data.project_id
  })

  it('should return an error if the user tries to create a project without authorization', async () => {
    const { userId: managerId } = verifyToken(pmToken)
    const response = await supertest(app)
      .post('/api/project')
      .send({
        ...projectConfiguration.createProject,
        manager_id: managerId, // Assuming a random manager ID for simplicity
      })

    expect(response.body.code).to.equal(401)
    expect(response.body).to.have.property('status').equal(responseStatus.unauthorized)
  })

  it('should return an error if the developer tries to create a project', async () => {
    // Login with project manager credentials
    const devLogin = await supertest(app)
      .post('/api/user/login')
      .send({ ...devUser })

    devToken = devLogin.body.data.token

    const { userId: devId } = verifyToken(devToken)
    const response = await supertest(app)
      .post('/api/project')
      .set('Authorization', `Bearer ${devToken}`)
      .send({
        ...projectConfiguration.createProject,
        manager_id: devId, // Assuming a random manager ID for simplicity
      })

    expect(response.body.code).to.equal(401)
    expect(response.body).to.have.property('status').equal(responseStatus.unauthorized)
  })

  it('should delete the created project', async () => {
    if (testProjectId) {
      const response = await supertest(app)
        .delete(`/api/project/${testProjectId}`)
        .set('Authorization', `Bearer ${pmToken}`)

      expect(response.body.code).to.equal(200)
      expect(response.body).to.have.property('status').equal(responseStatus.success)
    }
  })
})

after(async () => {
  // Delete the registered users created for testing
  const usersTokenToDelete = [devToken, pmToken]
  for (const token of usersTokenToDelete) {
    await supertest(app).delete(`/api/user`).set('Authorization', `Bearer ${token}`)
  }
})
