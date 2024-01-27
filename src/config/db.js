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

const adminClient = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'pm',
  password: process.env.ADMIN_DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
})

export { adminClient }

export default pool
