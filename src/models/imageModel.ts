import { resolve } from 'path';
import db from '../bd/mysql';
import { RowDataPacket } from 'mysql2';

// Función para guardar una imagen favorita en la base de datos
export const saveFavoriteImage = (imageId: string, userId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO favorites (image_id, user_id) VALUES (?, ?)';
    db.query(query, [imageId, userId], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Función para obtener todas las imágenes favoritas de un usuario
export const getFavoriteImages = (userId: string): Promise<RowDataPacket[]> => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM favorites WHERE user_id = ?';
    db.query(query, [userId], (err, results: RowDataPacket[]) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Función para eliminar la imagen favorita de un usuario
export const deleteFavoriteImages = (imageId: string, userId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM favorites WHERE image_id = ? AND user_id = ?';
    db.query(query, [imageId, userId], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
