# Backend de Gestión de Imágenes Favoritas

Este proyecto es el backend para la gestión de imágenes favoritas, permitiendo a los usuarios autenticarse, marcar imágenes como favoritas, y sincronizar dichas imágenes entre el almacenamiento local y la base de datos. El proyecto está construido con Node.js, Express, y MySQL.

## Arquitectura del Backend

- **Node.js**: Servidor backend que maneja las peticiones HTTP.
- **Express.js**: Framework web para construir las rutas del API.
- **PostgreSQL**: Base de datos relacional para almacenar usuarios y favoritos.
- **JWT**: Utilizado para la autenticación basada en tokens.
- **bcrypt**: Para el hash de contraseñas.

## Estructura de la Base de Datos

El backend utiliza una base de datos MySQL con las siguientes tablas:

- **Users**: Almacena la información de los usuarios.
  - `id`: Identificador único del usuario (Primary Key).
  - `username`: Nombre de usuario.
  - `password`: Contraseña (hash).

- **Favorites**: Almacena las imágenes favoritas de los usuarios.
  - `id`: Identificador único del favorito (Primary Key).
  - `user_id`: Referencia al usuario que guardó la imagen (Foreign Key a `Users`).
  - `image_id`: Identificador de la imagen guardada.

### Diagrama de la BD:
![image](https://github.com/user-attachments/assets/45c790b1-df21-41fc-ae07-c3c6aae84590)

## Documentación del API

### Autenticación

1. **Login**
   - **Endpoint**: `/api/auth/login`
   - **Método**: `POST`
   - **Body**:
     ```json
     {
       "username": "tu_usuario",
       "password": "tu_contraseña"
     }
     ```
   - **Respuesta**: Token JWT para autenticación.

2. **Registro**
   - **Endpoint**: `/api/auth/register`
   - **Método**: `POST`
   - **Body**:
     ```json
     {
       "username": "tu_usuario",
       "password": "tu_contraseña"
     }
     ```

### Favoritos

1. **Obtener Favoritos del Usuario**
   - **Endpoint**: `/api/images/favorites`
   - **Método**: `GET`
   - **Headers**: 
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Respuesta**: Lista de imágenes favoritas.

2. **Agregar a Favoritos**
   - **Endpoint**: `/api/images/favorites`
   - **Método**: `POST`
   - **Headers**: 
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```
   - **Body**:
     ```json
     {
       "imageIds": ["id_imagen_1", "id_imagen_2"]
     }
     ```

3. **Eliminar de Favoritos**
   - **Endpoint**: `/api/images/favorites/:image_id`
   - **Método**: `DELETE`
   - **Headers**: 
     ```json
     {
       "Authorization": "Bearer token"
     }
     ```

### Notas sobre los Tokens JWT

Para todas las rutas protegidas, se requiere incluir el token JWT en los headers de la petición:
```json
{
  "Authorization": "Bearer <tu_token_jwt>"
}
```

## Despliegue del Proyecto

### Requerimientos Previos
```
- Node.js (v14 o superior)
```
### Configuración del Entorno

1. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   JWT_SECRET=```

### Pasos para Desplegar

1. Clonar el repositorio:
```
- (https://github.com/JaredPeralta/backend-pruebaElectronik)
```

2. Instalar las dependencias:

```
   npm install
```
  
4. Iniciar el servidor:

```
   ts-node app.ts
```

## **Testing**

El proyecto incluye pruebas unitarias para las rutas principales. Para ejecutarlas, puedes usar el siguiente comando:

```bash
npm test
```

## Documentación API con Postman

Puedes importar la colección de Postman desde el siguiente archivo:
[]
[Prueba-Electronik.postman_collection.json](https://github.com/user-attachments/files/17527574/Prueba-Electronik.postman_collection.json)
{
	"info": {
		"_postman_id": "8166092d-d050-4a63-91f1-5fe4039616dc",
		"name": "Prueba-Electronik",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "29281644"
	},
	"item": [
		{
			"name": "register",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"username\": \"prueba\",\r\n    \"password\": \"contraseñaValida123\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/auth/register",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"auth",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"username\": \"prueba\",\r\n    \"password\": \"contraseñaValida123\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/auth/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "getImagenesFav",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer <token>",
						"type": "text"
					}
				],
				"url": {
					"raw": "http://localhost:3001/api/images/favorites",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"images",
						"favorites"
					]
				}
			},
			"response": []
		},
		{
			"name": "posImageFav",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer <token>",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"imageId\": \"id\"  \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3001/api/images/favorites",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"images",
						"favorites"
					]
				}
			},
			"response": []
		},
		{
			"name": "deleteImageFav",
			"request": {
				"method": "DELETE",
				"header": [
					{
						"key": "Authorization",
						"value": "Bearer <token>",
						"type": "text"
					}
				],
				"url": {
					"raw": "http://localhost:3001/api/images/favorites/:imageId",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3001",
					"path": [
						"api",
						"images",
						"favorites",
						":imageId"
					],
					"variable": [
						{
							"key": "imageId",
							"value": ""
						}
					]
				}
			},
			"response": []
		}
	]
}
