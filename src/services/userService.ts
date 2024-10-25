import { registerUser as registerUserModel, findUserByUsername as findUserByUsernameModel } from '../models/users';

// Servicio para registrar un usuario
export const registerUser = (username: string, hashedPassword: string): Promise<void> => {
  return registerUserModel(username, hashedPassword);
};

// Servicio para buscar un usuario
export const findUserByUsername = (username: string): Promise<any[]> => {
  return findUserByUsernameModel(username);
};

