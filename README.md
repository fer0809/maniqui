# Sistema de Gestión: Fábrica de Maniquíes 🏭

Este proyecto es una aplicación **Full Stack** desarrollada para la gestión integral del inventario y ensamblaje de piezas en una fábrica de maniquíes. Implementa una arquitectura moderna de microservicios con un enfoque en la integridad de datos y experiencia de usuario premium.

---

## 🚀 Guía de Inicio Rápido

Para poner en marcha todo el sistema, sigue estos pasos en el orden indicado:

### 1. Base de Datos (MariaDB + Docker)
Levanta el motor de base de datos de forma aislada:
```bash
cd database
docker-compose up -d
```
*El sistema cargará automáticamente las tablas y 40 piezas de inventario inicial.*

### 2. Backend (API REST)
Inicia el servidor de lógica de negocio:
```bash
cd backend
npm install
npm run dev
```
*Servidor activo en: `http://localhost:3000`*

### 3. Frontend (React + Vite)
Lanza la interfaz de usuario moderna:
```bash
cd frontend
npm install
npm run dev
```
*Interfaz disponible en: `http://localhost:5173`*

---

## 🏗️ Arquitectura del Sistema

El proyecto utiliza una arquitectura de **Tres Capas** para asegurar la escalabilidad y el mantenimiento:

### 1. Capa de Presentación (Frontend)
- **Tecnología**: React + Vite + CSS3 (Glassmorphism).
- **Características**:
    - Interfaz reactiva (sin recargas de página).
    - Diseño premium con paleta de colores Slate & Indigo.
    - Modales de confirmación personalizados.
    - Validación de piezas en tiempo real.

### 2. Capa de Aplicación (Backend)
- **Tecnología**: Node.js + Express.
- **Estructura Profesional**:
    - `src/config`: Configuración de conexión a la base de datos.
    - `src/controllers`: Lógica de negocio (Ensamblaje, Edición, Borrado).
    - `src/routes`: Definición de endpoints de la API.
- **Lógica de Transacciones**: El proceso de ensamblaje y edición utiliza **Transacciones SQL** (Begin, Commit, Rollback) para garantizar que los datos nunca queden en un estado inconsistente.

### 3. Capa de Persistencia (Base de Datos)
- **Tecnología**: MariaDB (Dockerizada).
- **Tablas**: `piezas` y `maniquies`, vinculadas mediante claves foráneas.
- **Integridad**: Uso de `ENUM` para tipos y estados, asegurando que solo se ingresen datos válidos.

---

## ✨ Funcionalidades Principales

-   **Panel de Control**: Resumen visual del stock (Total, Libres, En Uso).
-   **Gestión de Inventario**: Listado completo de piezas con filtrado por tipo y material.
-   **Ensamblaje Inteligente**: Formulario que solo permite seleccionar piezas disponibles.
-   **Edición Completa (Nuevo)**: Posibilidad de modificar maniquíes existentes, liberando automáticamente las piezas anteriores y reservando las nuevas.
-   **Borrado Seguro**: Al eliminar un maniquí, sus piezas vuelven automáticamente al estado "Disponible".

---

## 🛠️ Requisitos Técnicos
- **Node.js**: v18 o superior.
- **Docker**: Para la base de datos MariaDB.
- **NPM**: Para la gestión de paquetes.

---
**Autor:** Fer (fer0809)  
**Institución:** Instituto 166 - Tercer Año  
**Materia:** Base de Datos
