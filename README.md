## Iniciar aplicacion

### Inicar aplicacion con docker

Para iniciar la aplicacion con docker debes ejecutar el siguiente comando:

`docker compose up`

y esperar a que todo se ejecute.

## Iniciar la aplicacion de la manera tradicional

Para ejecutar tanto el front como el backend debes entrar a sus respectivas carpetas y ejecutar los siguientes comandos:

instalar dependencias:

`` npm i``

Iniciar la aplicacion:

`` npm run dev ``

Luego esperas a que todo ejecute y listo, entras al siguiente url: http://localhost:5173

## Inicar tests

para ejecutar los tests debes ejecutar el siguiente comando en cada una de las carpetas de los proyectos:

``npm run tests``

## Mejores Prácticas

- Optimización de Imágenes Docker: Implementé un archivo .dockerignore para excluir archivos innecesarios durante la construcción de la imagen, reduciendo así su tamaño.

- Uso de Stages en Dockerfile: Implementé etapas (stages) en el Dockerfile para mejorar la eficiencia y reducir el tamaño de la imagen final.

- Documentación con Swagger: Añadí documentación a la API utilizando Swagger para facilitar la comprensión y el uso de la misma.

- Implementación de Helmet: Integré Helmet para mejorar la seguridad de las cabeceras HTTP en la aplicación.

- Comentarios en las Rutas: Documenté las rutas utilizando Swagger en los archivos de rutas para mejorar la mantenibilidad y la comprensión del código.

## Seguridad

- Encriptación de Contraseñas: Utilicé bcryptjs para encriptar las contraseñas, fortaleciendo la seguridad de las credenciales almacenadas.

