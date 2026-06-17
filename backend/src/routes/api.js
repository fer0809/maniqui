const express = require('express');
const router = express.Router();
const piezasController = require('../controllers/piezasController');
const maniquiesController = require('../controllers/maniquiesController');

// Rutas para Piezas
router.get('/piezas', piezasController.getPiezas);

// Rutas para Maniquíes
router.get('/maniquies', maniquiesController.getManiquies);
router.post('/maniquies', maniquiesController.createManiqui);
router.delete('/maniquies/:id', maniquiesController.deleteManiqui);

module.exports = router;
