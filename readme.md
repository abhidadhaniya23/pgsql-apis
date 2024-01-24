## Folder structure:

```
  ├── app.js 			- starting point of the application
  ├── src
  │	├── config			- contains configuration files
  │	│   └── db.js 		- contains api database connection
  │	├── controllers 	- contains all the controller for each api end points
  │	├── middleware 		- contains all the middlewares (execution between req and res cycle)
  │	├── queries 		- contains all the queries to execute in db
  │	├── routes 			- contains all the routes of application
  │	├── services 		- contains commonly used services (to communicate with db)
  │	├── utils 			- contains commonly used functionalities
  │	├── validators 		- contains validators to validate payload from incoming req
```

### Environment variables

```
NODE_ENV=development
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRES=
```

## Features

- Microservice architecture
- Validate body data from incoming request for Insert and Delete operations
- Custom error handling middleware
