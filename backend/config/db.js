import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();  // Carrega as variáveis do .env

// Conexão com o banco de dados usando as variáveis de ambiente
const connection = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export default connection;
