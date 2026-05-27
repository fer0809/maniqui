# Trabajo Práctico: Fábrica de Maniquíes (Parte II)

Este repositorio contiene la implementación técnica de la base de datos para la gestión de una fábrica de maniquíes, incluyendo su estructura, carga de datos y consultas de verificación.

## Estructura del Proyecto

Los scripts SQL están organizados de forma independiente para asegurar una correcta ejecución:

1.  **`creates.sql`**: Define la estructura de la base de datos `fabrica_maniquies`, crea las tablas y establece las restricciones de integridad (Primary Keys, Foreign Keys, NOT NULL).
2.  **`inserts.sql`**: Contiene la carga inicial de datos de prueba (10 registros por cada tipo de pieza y 5 maniquíes completos).
3.  **`queries.sql`**: Incluye las consultas de verificación solicitadas para validar el funcionamiento del sistema.

## Instrucciones de Ejecución

Para poner en marcha la base de datos, ejecute los scripts en el siguiente orden:

1.  **Crear la estructura:**
    ```bash
    mysql -u tu_usuario -p < creates.sql
    ```
2.  **Cargar los datos:**
    ```bash
    mysql -u tu_usuario -p fabrica_maniquies < inserts.sql
    ```
3.  **Realizar consultas de verificación:**
    ```bash
    mysql -u tu_usuario -p fabrica_maniquies < queries.sql
    ```

---
**Autor:** Fer (fer0809)  
**Institución:** Instituto 166 - Tercer Año
