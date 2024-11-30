//app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const espaciosRoutes = require('./routes/espaciosRoutes');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/espacios', espaciosRoutes);
app.use('/api/reservas', reservasRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err);
  res.status(500).json({
    error: 'Error en el servidor',
    details: err.message,
  });
});

module.exports = app;
