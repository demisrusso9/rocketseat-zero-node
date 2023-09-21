import 'dotenv/config'
import pg from 'pg';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env

const config = {
  host: PGHOST,
  user: PGUSER,     
  password: PGPASSWORD,
  database: PGDATABASE,
  port: 5432,
  ssl: true
};


export const client = new pg.Client(config);
client.connect();