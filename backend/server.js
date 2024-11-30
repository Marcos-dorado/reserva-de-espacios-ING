//server.js
require('dotenv').config(); // Carga las variables de entorno
const app = require('./app'); // Importa la configuración de la aplicación
const conectarDB = require('./config/db'); // Importa la función de conexión a MongoDB

// Conectar a la base de datos
conectarDB();

const PORT = process.env.PORT || 5000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
