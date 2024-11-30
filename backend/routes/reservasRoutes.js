//reservasRoutes.js
const express = require('express');
const { obtenerReservas, crearReserva } = require('../controllers/reservasController');
const router = express.Router();

router.get('/', obtenerReservas);
router.post('/', crearReserva);

module.exports = router;
