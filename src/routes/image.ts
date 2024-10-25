import { Router } from 'express';
import { saveFavorites, viewFavorites, deleteFavorite } from '../controllers/imageController'; 
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// Proteger las rutas con el middleware JWT
router.post('/favorites', authenticateJWT, saveFavorites);
router.get('/favorites', authenticateJWT, viewFavorites);
router.delete('/favorites/:imageId', authenticateJWT, deleteFavorite)

export default router;
