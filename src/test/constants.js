export const pmUser = {
  email: 'test@pm.com',
  password: 'testpassword',
}

export const devUser = {
  email: 'test@dev.com',
  password: 'testpassword',
}

export const projectConfiguration = {
  createProject: {
    name: 'Test Project',
    description: 'This is a test project.',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
  },
}

export const taskConfiguration = {
  createTask: {
    name: 'Test Task',
    description: 'This is a test task.',
    due_date: '2024-02-15',
    priority: 'p2',
    status: 'todo',
  },
}

export const invalidTaskConfiguration = {
  // Invalid due_date format to trigger validation error
  createTask: {
    name: 'Invalid Test Task',
    description: 'This task has an invalid due date format.',
    due_date: 'invalid_date',
    priority: 'p3',
    status: 'doing',
  },
}

export const userConfiguration = {
  registerUser: {
    username: 'TestUser',
    email: 'testuser@example.com',
    password: 'testpassword',
  },
  loginUser: {
    email: 'testuser@example.com',
    password: 'testpassword',
  },
  invalidUser: {
    // Invalid email format to trigger validation error
    email: 'invalidemail',
    password: 'tooshort',
  },
}
