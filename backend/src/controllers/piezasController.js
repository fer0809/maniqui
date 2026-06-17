const { getConnection } = require('../config/db');

const getPiezas = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM piezas');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error de BD: ' + error.message });
    }
};

module.exports = { getPiezas };
