import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RegisterUserDto, LoginUserDto } from '../dto/auth.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerUser, findUserByUsername } from '../models/users';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto = plainToClass(RegisterUserDto, req.body);

  // Validar el DTO
  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: 'Datos inválidos', errors });
    return;
  }

  const { username, password } = dto;

  try {
    // Verificar si el nombre de usuario ya existe
    const existingUser = await findUserByUsername(username);
    if (existingUser.length > 0) {
      res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registrar el nuevo usuario
    await registerUser(username, hashedPassword);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto = plainToClass(LoginUserDto, req.body);

  const errors = await validate(dto);
  if (errors.length > 0) {
    res.status(400).json({ message: 'Datos inválidos', errors });
    return;
  }

  const { username, password } = dto;

  try {
    const results = await findUserByUsername(username);
    if (results.length === 0) {
      res.status(400).json({ message: 'Usuario no encontrado' });
      return;
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ message: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

