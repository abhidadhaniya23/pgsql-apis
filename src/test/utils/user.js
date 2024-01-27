// test-utils.js
import supertest from 'supertest'
// Adjust the import path based on your project structure
import { v4 as uuid } from 'uuid'

import app from '../../../app'

let testUser

export const createTestUser = async () => {
  const response = await supertest(app).post('/api/user/register').send({
    username: 'testuser',
    user_id: uuid(),
    email: 'test@example.com',
    password: 'testpassword',
  })

  testUser = response.body.data
}

export const deleteTestUser = async () => {
  // Implement logic to delete the test user based on the testUser variable.
}

export const getTestUser = () => testUser
