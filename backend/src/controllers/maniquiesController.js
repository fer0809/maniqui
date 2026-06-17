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

const updateManiqui = async (req, res) => {
    const { id } = req.params;
    const { numero_serie, id_cabeza, id_torso, id_brazos, id_piernas } = req.body;

    let connection;
    try {
        connection = await getConnection();
        await connection.beginTransaction();

        // 1. Obtener piezas actuales
        const [oldManiqui] = await connection.execute(
            'SELECT id_cabeza, id_torso, id_brazos, id_piernas FROM maniquies WHERE id_maniqui = ?',
            [id]
        );
        if (oldManiqui.length === 0) throw new Error('Maniquí no encontrado');

        const oldIds = [oldManiqui[0].id_cabeza, oldManiqui[0].id_torso, oldManiqui[0].id_brazos, oldManiqui[0].id_piernas];

        // 2. Liberar piezas viejas temporalmente para la validación
        await connection.execute(
            'UPDATE piezas SET estado = "Disponible" WHERE id_pieza IN (?, ?, ?, ?)',
            oldIds
        );

        // 3. Validar nuevas piezas
        const newIds = [id_cabeza, id_torso, id_brazos, id_piernas];
        const [nuevasPiezas] = await connection.execute(
            'SELECT id_pieza, estado FROM piezas WHERE id_pieza IN (?, ?, ?, ?)',
            newIds
        );

        if (nuevasPiezas.length !== 4) throw new Error('Algunas piezas nuevas no existen');
        if (nuevasPiezas.some(p => p.estado !== 'Disponible')) throw new Error('Algunas piezas nuevas ya están ocupadas');

        // 4. Actualizar maniquí
        await connection.execute(
            'UPDATE maniquies SET codigo_maniqui = ?, id_cabeza = ?, id_torso = ?, id_brazos = ?, id_piernas = ? WHERE id_maniqui = ?',
            [numero_serie, id_cabeza, id_torso, id_brazos, id_piernas, id]
        );

        // 5. Ocupar nuevas piezas
        await connection.execute(
            'UPDATE piezas SET estado = "Ensamblado" WHERE id_pieza IN (?, ?, ?, ?)',
            newIds
        );

        await connection.commit();
        res.json({ message: 'Maniquí actualizado con éxito' });
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(400).json({ error: error.message });
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = { getManiquies, createManiqui, deleteManiqui, updateManiqui };
