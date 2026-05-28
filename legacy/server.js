const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Datos iniciales en arreglos (Simulando la base de datos)
let piezas = [
    { id_pieza: 1, numero_serie: 'SN-CAB-101', tipo_pieza: 'Cabeza', material: 'Fibra de Vidrio', color: 'Blanco', estado: 'Ensamblado' },
    { id_pieza: 2, numero_serie: 'SN-CAB-102', tipo_pieza: 'Cabeza', material: 'Madera', color: 'Marrón', estado: 'Ensamblado' },
    { id_pieza: 3, numero_serie: 'SN-CAB-103', tipo_pieza: 'Cabeza', material: 'Plástico', color: 'Negro', estado: 'Disponible' }
];

let maniquies = [
    { id_maniqui: 1, numero_serie: 'MQ-WHITE-01', id_cabeza: 1, id_torso: 4, id_brazos: 7, id_piernas: 10, fecha_ensamblado: '2026-05-01', estado: 'En Stock' }
];

// --- ENDPOINTS PARA PIEZAS ---

// Obtener todas las piezas
app.get('/api/piezas', (req, res) => {
    res.json(piezas);
});

// Obtener una pieza por ID
app.get('/api/piezas/:id', (req, res) => {
    const pieza = piezas.find(p => p.id_pieza === parseInt(req.params.id));
    if (!pieza) return res.status(404).send('Pieza no encontrada');
    res.json(pieza);
});

// Agregar una nueva pieza
app.post('/api/piezas', (req, res) => {
    const nuevaPieza = {
        id_pieza: piezas.length + 1,
        ...req.body
    };
    piezas.push(nuevaPieza);
    res.status(201).json(nuevaPieza);
});

// Actualizar una pieza
app.put('/api/piezas/:id', (req, res) => {
    const pieza = piezas.find(p => p.id_pieza === parseInt(req.params.id));
    if (!pieza) return res.status(404).send('Pieza no encontrada');
    
    Object.assign(pieza, req.body);
    res.json(pieza);
});

// Eliminar una pieza
app.delete('/api/piezas/:id', (req, res) => {
    const index = piezas.findIndex(p => p.id_pieza === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Pieza no encontrada');
    
    const borrada = piezas.splice(index, 1);
    res.json(borrada);
});

// --- ENDPOINTS PARA MANIQUIES ---

// Obtener todos los maniquíes (con detalle de piezas)
app.get('/api/maniquies', (req, res) => {
    const resultado = maniquies.map(m => ({
        ...m,
        detalle_piezas: {
            cabeza: piezas.find(p => p.id_pieza === m.id_cabeza),
            torso: piezas.find(p => p.id_pieza === m.id_torso),
            brazos: piezas.find(p => p.id_pieza === m.id_brazos),
            piernas: piezas.find(p => p.id_pieza === m.id_piernas)
        }
    }));
    res.json(resultado);
});

// Crear un nuevo maniquí
app.post('/api/maniquies', (req, res) => {
    const nuevoManiqui = {
        id_maniqui: maniquies.length + 1,
        fecha_ensamblado: new Date().toISOString().split('T')[0],
        ...req.body
    };
    maniquies.push(nuevoManiqui);
    res.status(201).json(nuevoManiqui);
});

app.listen(port, () => {
    console.log(`Servidor de Maniquíes corriendo en http://localhost:${port}`);
});
