import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SaveFavoriteDto, DeleteFavoriteDto } from '../dto/image.dto';
import { saveFavoriteToDb, getFavoritesFromDb, deletFavoriteToDb } from '../services/imageService';  // Servicios para la base de datos

// Controlador para guardar imágenes favoritas
export const saveFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto = plainToClass(SaveFavoriteDto, req.body);

  // Validar los datos recibidos con el DTO
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: 'Datos inválidos', errors });
    return;
  }

  const { imageIds } = dto;

  try {
    const userId = (req as any).user.userId;  // Extraer el userId del token JWT

    // Guardar cada imagen favorita en la base de datos
    for (const imageId of imageIds) {
      await saveFavoriteToDb(imageId, userId);
    }

    res.status(201).json({ message: 'Imágenes favoritas guardadas exitosamente' });
  } catch (error) {
    next(error);
  }
};

// Controlador para ver imágenes favoritas
export const viewFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.userId;  // Obtener el userId desde el token JWT
    const favorites = await getFavoritesFromDb(userId);
    res.json(favorites);  // Devolver las imágenes favoritas del usuario
  } catch (error) {
    next(error);
  }
};

// Controlador para eliminar una imagen favorita
export const deleteFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto = plainToClass(DeleteFavoriteDto, req.params);  // Captura el parámetro imageId desde la URL

  // Validar los datos recibidos con el DTO
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: 'Datos inválidos', errors });
    return;
  }

  const { imageId } = dto;

  try {
    const userId = (req as any).user.userId;  // Extraer el userId del token JWT
    await deletFavoriteToDb(imageId, userId);  // Llamar al servicio para eliminar la imagen
    res.status(200).json({ message: 'Imagen favorita eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};


