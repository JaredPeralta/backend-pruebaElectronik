import db from '../bd/mysql';
import { RowDataPacket } from 'mysql2';

// Función para registrar un usuario
export const registerUser = (username: string, hashedPassword: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return reject(new Error('El nombre de usuario ya está en uso'));
        }
        return reject(err);
      }
      resolve();
    });
  });
};

// Función para buscar un usuario por nombre de usuario
export const findUserByUsername = (username: string): Promise<RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results: RowDataPacket[]) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

