import request from 'supertest';
import app from '../app';

describe('Autenticación - Registro de Usuarios', () => {
  let server: any;

  beforeAll((done) => {
    server = app.listen(4001, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('debería fallar si la contraseña tiene menos de 6 caracteres', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'usuarioCorto',
        password: '123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Datos inválidos');
  });

  it('debería registrar un nuevo usuario correctamente', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'usuarioPrueba',
        password: 'contraseña123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente');
  });

  it('debería fallar si ya existe un usuario con ese nombre', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'usuarioPrueba',
        password: 'contraseña123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'El nombre de usuario ya está en uso');
  });

  it('debería fallar si el nombre de usuario es incorrecto', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'usuarioNoExistente',
        password: 'contraseñaValida123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Usuario no encontrado');
  });

  it('debería fallar si la contraseña es incorrecta', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'usuarioPrueba',
        password: 'contraseñaIncorrecta',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Contraseña incorrecta');
  });

  it('debería iniciar sesión correctamente con credenciales válidas', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'usuarioPrueba',
        password: 'contraseña123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
