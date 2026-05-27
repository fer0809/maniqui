# Gestión de Maniquíes y Piezas

Este proyecto contiene un script SQL para la gestión de maniquíes y sus componentes físicos.

## Cómo empezar (Configuración de la Base de Datos)

Para ejecutar este script y configurar la base de datos, sigue estos pasos:

### 1. Requisitos
- Tener instalado **MariaDB** o **MySQL**.
- Un cliente SQL (consola, phpMyAdmin, DBeaver, etc.).

### 2. Pasos para la instalación

#### Opción A: Desde la terminal (Recomendado)
1. Abre tu terminal o consola de comandos.
2. Crea la base de datos (opcional):
   ```sql
   CREATE DATABASE maniqui_db;
   USE maniqui_db;
   ```
3. Ejecuta el script:
   ```bash
   mysql -u tu_usuario -p maniqui_db < maniqui.sql
   ```

#### Opción B: Desde phpMyAdmin
1. Crea una nueva base de datos llamada `maniqui_db`.
2. Haz clic en la pestaña **Importar**.
3. Selecciona el archivo `maniqui.sql` de este repositorio.
4. Haz clic en **Continuar/Ejecutar**.

## Estructura de la Base de Datos
El script incluye la creación y carga de datos para:
- **piezas**: Gestión de componentes (Cabezas, Torsos, Brazos, Piernas).
- **maniquies**: Registro de ensamblaje de maniquíes completos.
