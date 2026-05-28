# Trabajo Práctico: Fábrica de Maniquíes (Parte II)

Este repositorio contiene la implementación técnica de la base de datos y el backend para la gestión de una fábrica de maniquíes.

## Estructura del Proyecto

El proyecto ha sido reestructurado para separar las responsabilidades:

-   **`backend/`**: API desarrollada en Node.js (Express) para interactuar con la base de datos. Incluye definiciones de rutas y archivos `.http` para pruebas.
-   **`database/`**: Contiene toda la lógica de persistencia.
    -   `creates.sql`: Estructura de la base de datos.
    -   `inserts.sql`: Datos de prueba iniciales.
    -   `queries.sql`: Consultas de verificación.
    -   `docker-compose.yml`: Configuración para levantar una instancia de MariaDB automáticamente.
-   **`legacy/`**: Versiones anteriores del servidor para referencia.

## Instrucciones de Ejecución

### Base de Datos (Docker)

La forma más sencilla de iniciar la base de datos es utilizando Docker:

1.  Navegar a la carpeta de base de datos:
    ```bash
    cd database
    ```
2.  Levantar el contenedor:
    ```bash
    docker-compose up -d
    ```

Esto iniciará una instancia de MariaDB en el puerto `3306`.

### Backend

Para iniciar el servidor de desarrollo:

1.  Navegar a la carpeta del backend:
    ```bash
    cd backend
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Iniciar el servidor:
    ```bash
    npm start
    ```

El servidor estará disponible en `http://localhost:3000`.

---
**Autor:** Fer (fer0809)  
**Institución:** Instituto 166 - Tercer Año
