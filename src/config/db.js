import pgPool from 'pg'
const { Pool } = pgPool
import { configDotenv } from 'dotenv'
configDotenv()

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
})

export default pool
