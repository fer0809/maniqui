const { getConnection } = require('../config/db');

const getManiquies = async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute('SELECT * FROM maniquies');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error de BD: ' + error.message });
    }
};

const createManiqui = async (req, res) => {
    const { numero_serie, id_cabeza, id_torso, id_brazos, id_piernas } = req.body;

    if (!numero_serie || !id_cabeza || !id_torso || !id_brazos || !id_piernas) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    let connection;
    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const [piezas] = await connection.execute(
            'SELECT id_pieza, estado FROM piezas WHERE id_pieza IN (?, ?, ?, ?)',
            [id_cabeza, id_torso, id_brazos, id_piernas]
        );

        if (piezas.length !== 4) throw new Error('Piezas inexistentes');
        if (piezas.some(p => p.estado !== 'Disponible')) throw new Error('Piezas ya ocupadas');

        await connection.execute(
            'INSERT INTO maniquies (codigo_maniqui, id_cabeza, id_torso, id_brazos, id_piernas, fecha_ensamblaje, estado) VALUES (?, ?, ?, ?, ?, CURDATE(), "En Stock")',
            [numero_serie, id_cabeza, id_torso, id_brazos, id_piernas]
        );

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
};

const deleteManiqui = async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await getConnection();
        await connection.beginTransaction();

        const [maniquis] = await connection.execute(
            'SELECT id_cabeza, id_torso, id_brazos, id_piernas FROM maniquies WHERE id_maniqui = ?',
            [id]
        );

        if (maniquis.length === 0) throw new Error('Maniquí no encontrado');

        const { id_cabeza, id_torso, id_brazos, id_piernas } = maniquis[0];

        await connection.execute(
            'UPDATE piezas SET estado = "Disponible" WHERE id_pieza IN (?, ?, ?, ?)',
            [id_cabeza, id_torso, id_brazos, id_piernas]
        );

        await connection.execute('DELETE FROM maniquies WHERE id_maniqui = ?', [id]);

        await connection.commit();
        res.json({ message: 'Maniquí eliminado y piezas liberadas' });
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(400).json({ error: error.message });
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = { getManiquies, createManiqui, deleteManiqui };
