require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', apiRoutes);

// Servir archivos estáticos si fuera necesario (opcional en esta arquitectura separada)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`   SERVIDOR INICIADO EN PUERTO ${PORT}    `);
    console.log('       LISTO PARA RECIBIR PETICIONES     ');
    console.log('=========================================');
});
