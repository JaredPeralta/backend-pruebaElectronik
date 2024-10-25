import { IsString, IsNotEmpty, Length } from 'class-validator';

// DTO para registro de usuarios
export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password!: string;
}

// DTO para login de usuarios
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}