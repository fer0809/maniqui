# Trabajo Práctico: Fábrica de Maniquíes (Parte II)

Este repositorio contiene la implementación técnica de una aplicación completa para la gestión de una fábrica de maniquíes, utilizando una arquitectura de microservicios con React, Node.js y MariaDB.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

-   **`frontend/`**: Aplicación moderna desarrollada en **React + Vite**. Proporciona una interfaz intuitiva con estados reactivos y confirmaciones personalizadas (Glassmorphism).
-   **`backend/`**: API desarrollada en **Node.js (Express)** que gestiona la lógica de negocio y la comunicación con la base de datos.
-   **`database/`**: Configuración de persistencia con **MariaDB** y **Docker Compose**.
-   **`legacy/`**: Versiones anteriores para referencia histórica.

---

## 🚀 Guía de Inicio Rápido

Para poner en marcha todo el sistema, sigue estos pasos en orden:

### 1. Base de Datos (MariaDB)
Utiliza Docker para levantar el motor de base de datos de forma aislada:
```bash
cd database
docker-compose up -d
```
*Esto creará el contenedor e inicializará las tablas automáticamente.*

### 2. Backend (API)
Inicia el servidor que conecta la interfaz con los datos:
```bash
cd backend
npm install
npm run dev
```
*El backend escuchará en el puerto `3000`.*

### 3. Frontend (React)
Finalmente, arranca la interfaz de usuario:
```bash
cd frontend
npm install
npm run dev
```
*Vite levantará el sitio en [http://localhost:5173](http://localhost:5173).*

---

## 🛠 Comandos Útiles

| Servicio | Comando de Inicio | Puerto |
| :--- | :--- | :--- |
| **Base de Datos** | `docker-compose up -d` | 3306 |
| **Backend** | `npm run dev` | 3000 |
| **Frontend** | `npm run dev` | 5173 |

---

## ⚠️ Requisitos
- **Node.js** (v18 o superior)
- **Docker** y **Docker Compose**
- **Git**

---
**Autor:** Fer (fer0809)  
**Institución:** Instituto 166 - Tercer Año
