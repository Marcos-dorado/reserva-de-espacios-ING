//Reserva.js
const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  auditorio: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Reserva', ReservaSchema);
