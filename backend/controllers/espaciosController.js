//espaciosController.js
const Espacio = require('../models/Espacio');

// Obtener todos los espacios
const obtenerEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los espacios' });
  }
};

// Crear un nuevo espacio
const crearEspacio = async (req, res) => {
  try {
    const { nombre, tipo, capacidad } = req.body;
    const nuevoEspacio = new Espacio({ nombre, tipo, capacidad });
    await nuevoEspacio.save();
    res.status(201).json(nuevoEspacio);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el espacio' });
  }
};

// Eliminar un espacio
const eliminarEspacio = async (req, res) => {
  try {
    const { id } = req.params;
    await Espacio.findByIdAndDelete(id);
    res.json({ mensaje: 'Espacio eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el espacio' });
  }
};

// Exportar las funciones
module.exports = {
  obtenerEspacios,
  crearEspacio,
  eliminarEspacio,
};
