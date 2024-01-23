// app.js
import express from 'express'
import morgan from 'morgan'
import pool from './src/config/db.js'
import { configDotenv } from 'dotenv'
import appRouter from './src/routes/app.routes.js'
configDotenv()

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

// app.get('/', async (req, res) => {
//   // const result = pool.query('select * from orders')
//   // console.log((await result).rows)
//   res.send('API is running...!')
// })

// Routes
app.use('/api', appRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
