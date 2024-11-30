//reservasController.js
const Reserva = require('../models/Reserva');
const Espacio = require('../models/Espacio');

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Crear una nueva reserva
const crearReserva = async (req, res) => {
  try {
    const { usuario, auditorio, fecha } = req.body;

    console.log("Datos recibidos:", { usuario, auditorio, fecha }); // Para depuración

    // Validar que el espacio existe
    const espacio = await Espacio.findOne({ nombre: auditorio });
    if (!espacio) {
      return res.status(400).json({ error: 'El auditorio/salón no existe' });
    }

    // Crear y guardar la reserva
    const nuevaReserva = new Reserva({ usuario, auditorio, fecha });
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error("Error al crear la reserva:", error); // Log para mayor detalle
    res.status(400).json({ error: 'Error al crear la reserva' });
  }
};


module.exports = { obtenerReservas, crearReserva };
