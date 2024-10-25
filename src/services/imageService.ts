import { saveFavoriteImage as saveFavoriteImageModel, getFavoriteImages as getFavoriteImagesModel, deleteFavoriteImages as deleteFavoriteImagesModel} from '../models/imageModel';

// Servicio para guardar una imagen favorita
export const saveFavoriteToDb = (imageId: string, userId: string): Promise<void> => {
  return saveFavoriteImageModel(imageId, userId);
};

// Servicio para obtener todas las imágenes favoritas de un usuario
export const getFavoritesFromDb = (userId: string): Promise<any[]> => {
  return getFavoriteImagesModel(userId);
};

// Servicio para eliminar una imagen favorita
export const deletFavoriteToDb = (imageId: string, userId: string): Promise<void> => {
  return deleteFavoriteImagesModel(imageId, userId);
};