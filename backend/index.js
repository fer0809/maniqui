require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

// Ruta por defecto para confirmar que el servidor está online
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido al Backend del Sistema de Maniquíes',
        estado: 'online',
        endpoints_disponibles: {
            obtener_piezas: 'GET /api/piezas',
            ensamblar_maniqui: 'POST /api/maniquies'
        }
    });
});

app.get('/api/piezas', async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM piezas');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error de BD: ' + error.message });
    }
});

app.post('/api/maniquies', async (req, res) => {
    console.log('--- Nueva Petición Recibida ---');
    const { numero_serie, id_cabeza, id_torso, id_brazos, id_piernas } = req.body;

    if (!numero_serie || !id_cabeza || !id_torso || !id_brazos || !id_piernas) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    let connection;
    try {
        connection = await getConnection();
        await connection.beginTransaction();

        // 1. Validar disponibilidad
        const [piezas] = await connection.execute(
            'SELECT id_pieza, estado FROM piezas WHERE id_pieza IN (?, ?, ?, ?)',
            [id_cabeza, id_torso, id_brazos, id_piernas]
        );

        if (piezas.length !== 4) throw new Error('Piezas inexistentes');
        if (piezas.some(p => p.estado !== 'Disponible')) throw new Error('Piezas ya ocupadas');

        // 2. Insertar Maniquí
        await connection.execute(
            'INSERT INTO maniquies (codigo_maniqui, id_cabeza, id_torso, id_brazos, id_piernas, fecha_ensamblaje, estado) VALUES (?, ?, ?, ?, ?, CURDATE(), "En Stock")',
            [numero_serie, id_cabeza, id_torso, id_brazos, id_piernas]
        );

        // 3. Actualizar Piezas
        await connection.execute(
            'UPDATE piezas SET estado = "Ensamblado" WHERE id_pieza IN (?, ?, ?, ?)',
            [id_cabeza, id_torso, id_brazos, id_piernas]
        );

        await connection.commit();
        res.status(201).json({ message: 'Éxito: Guardado en Base de Datos' });
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(400).json({ error: error.message });
    } finally {
        if (connection) await connection.end();
    }
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log('   SISTEMA CONECTADO A MARIA DB (DOCKER)  ');
    console.log('       LISTO EN http://localhost:3000    ');
    console.log('=========================================');
});
