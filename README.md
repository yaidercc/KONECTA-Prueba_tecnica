## Iniciar aplicacion

### Iniciar aplicacion con docker

1. Para iniciar la aplicacion con docker debes ejecutar el siguiente comando:

`docker compose up`

2. Luego esperas a que todo ejecute y listo, entras al siguiente url: http://localhost:5173

## Iniciar la aplicacion de la manera tradicional

1. Antes de ejecutar el backend es importante que crees este usuario en postgres para conectarse a la base de datos:

``
CREATE ROLE yaidercc WITH LOGIN PASSWORD 'yaidercc123';
``

``
ALTER ROLE yaidercc WITH SUPERUSER;
``

2. Entras a la carpeta de cada proyecto y ejecutas los siguientes comandos:

instalar dependencias:

`` npm i``

Iniciar la aplicacion:

`` npm run dev ``

3. Luego esperas a que todo ejecute y listo, entras al siguiente url: http://localhost:5173

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

- **Encriptación de Contraseñas:** Utilicé bcryptjs para encriptar las contraseñas, fortaleciendo la seguridad de las credenciales almacenadas.
  
- **Uso de Sequelize ORM:** Utilizamos Sequelize para manejar las consultas de la base de datos de manera segura, evitando inyecciones SQL y eliminando la necesidad de consultas SQL en crudo.
  
- **Autenticación con Tokens:** Implementé tokens para validar la autenticación de los usuarios, garantizando que solo los usuarios autenticados puedan acceder a recursos protegidos.
  
- **Control de Acceso con Middlewares:** Implementé middlewares en las rutas para restringir el acceso a ciertas funcionalidades, asegurando que solo los usuarios con roles adecuados (como administradores) puedan realizar acciones específicas.

