import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth';
import imageRoutes from './src/routes/image';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ha ocurrido un error interno del servidor',
    error: err.message,
  });
});

// Ruta de prueba para asegurarnos que el servidor funciona
app.get('/', (req: Request, res: Response) => {
  res.send('Backend funcionando');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default app;