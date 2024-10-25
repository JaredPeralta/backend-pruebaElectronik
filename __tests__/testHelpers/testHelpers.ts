import request from 'supertest';
import app from '../../app';

export const getToken = async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'usuarioPrueba',
      password: 'contraseña123',
    });

  return response.body.token;
};
