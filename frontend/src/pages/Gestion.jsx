import React, { useEffect, useState } from "react";
import axios from "../utils/api"; // Suponiendo que tienes un archivo para las peticiones a la API

const Gestion = () => {
  const [espacios, setEspacios] = useState([]); // Para almacenar los salones/auditorios
  const [nuevoEspacio, setNuevoEspacio] = useState(""); // Para manejar la entrada del nuevo espacio
  const [error, setError] = useState(""); // Para manejar errores

  // Cargar los espacios cuando el componente se monte
  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const response = await axios.get("/espacios"); // Cambia por tu ruta de API
        setEspacios(response.data);
      } catch (error) {
        console.error("Error al obtener los espacios:", error);
        setError("No se pudieron cargar los espacios.");
      }
    };
    fetchEspacios();
  }, []);

  // Manejar la creación de un nuevo espacio
  const handleAgregarEspacio = async (e) => {
    e.preventDefault();
    if (!nuevoEspacio) {
      setError("El nombre del espacio es obligatorio.");
      return;
    }
    try {
      await axios.post("/espacios", { nombre: nuevoEspacio }); // Ruta de API para agregar un espacio
      setNuevoEspacio(""); // Limpiar el campo
      setError(""); // Limpiar errores
      // Recargar la lista de espacios
      const response = await axios.get("/espacios");
      setEspacios(response.data);
    } catch (error) {
      console.error("Error al agregar el espacio:", error);
      setError("Hubo un problema al agregar el espacio.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Salones y Auditorios</h1>
      <p>Aquí los administradores pueden gestionar los espacios y reservas.</p>

      {/* Formulario para agregar un nuevo espacio */}
      <form onSubmit={handleAgregarEspacio} className="my-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={nuevoEspacio}
            onChange={(e) => setNuevoEspacio(e.target.value)}
            placeholder="Nombre del nuevo espacio"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar Espacio
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}

      {/* Lista de espacios */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Espacios Disponibles</h2>
      {espacios.length > 0 ? (
        <ul className="list-disc pl-5">
          {espacios.map((espacio, index) => (
            <li key={index} className="text-lg">{espacio.nombre}</li>
          ))}
        </ul>
      ) : (
        <p>No hay espacios registrados.</p>
      )}
    </div>
  );
};

export default Gestion;
