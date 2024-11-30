//Espacio.js
const mongoose = require('mongoose');

const EspacioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true, // Cada espacio debe tener un nombre único
  },
  tipo: {
    type: String,
    enum: ['auditorio', 'salón'], // Clasificación de los espacios
    required: true,
  },
  capacidad: {
    type: Number,
    required: true, // Número de personas que soporta
  },
  disponible: {
    type: Boolean,
    default: true, // Indica si el espacio está disponible
  },
});

module.exports = mongoose.model('Espacio', EspacioSchema);
