import request from 'supertest';
import app from '../app';
import { getToken } from './testHelpers/testHelpers'; // Utilidad para obtener el token JWT

describe('Imágenes favoritas', () => {
  let server: any;
  let token: string;

  beforeAll((done) => {
    server = app.listen(4002, async () => {
      // Obtén el token JWT para autenticación
      token = await getToken();
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('debería guardar una imagen como favorita', async () => {
    const response = await request(server)
      .post('/api/images/favorites')
      .set('Authorization', `Bearer ${token}`)
      .send({
        imageIds: ['abc123'],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Imágenes favoritas guardadas exitosamente');
  });

  it('debería ver las imágenes favoritas del usuario', async () => {
    const response = await request(server)
      .get('/api/images/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);  // Debería devolver un array de imágenes
  });

  it('debería eliminar una imagen favorita', async () => {
    const imageId = 'abc123';  // Imagen que fue previamente guardada
    const response = await request(server)
      .delete(`/api/images/favorites/${imageId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Imagen favorita eliminada exitosamente');
  });
});
