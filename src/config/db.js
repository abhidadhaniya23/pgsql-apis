import { configDotenv } from 'dotenv'
import pgPool from 'pg'

const { Pool } = pgPool

configDotenv()

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pm',
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
})

export default pool
