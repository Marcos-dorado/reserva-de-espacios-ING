const express = require('express');
const { obtenerEspacios, crearEspacio, eliminarEspacio } = require('../controllers/espaciosController');
const router = express.Router();

router.get('/', obtenerEspacios); // Correcto
router.post('/', crearEspacio);
router.delete('/:id', eliminarEspacio);

module.exports = router;
