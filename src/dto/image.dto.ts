import { IsArray, ArrayNotEmpty, IsString, IsNotEmpty} from 'class-validator';

// DTO para guardar múltiples imágenes favoritas
export class SaveFavoriteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  imageIds!: string[];
}

// DTO para eliminar una imagen favorita
export class DeleteFavoriteDto {
  @IsString()
  @IsNotEmpty()
  imageId!: string;  // El ID de la imagen a eliminar
}