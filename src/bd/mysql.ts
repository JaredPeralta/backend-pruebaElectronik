import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Definir los tipos de la conexión
const db: mysql.Connection = mysql.createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  //port: process.env.DB_PORT as string,
});

// Verificar la conexión
db.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

export default db;
