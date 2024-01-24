// app.js
import { configDotenv } from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import appRouter from './src/routes/app.routes.js'

configDotenv()

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get('/', async (req, res) => {
  res.send('API is running...!')
})

// Routes
app.use('/api', appRouter)

// TODO: Implement Error handling middleware

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
