import React, { useState, useEffect } from 'react';
import ProgressSteps from '../components/PasoProgreso';
import ReservationContent from '../components/ReservacionContent';

const Reservar = () => {
  const [espacios, setEspacios] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  const [error, setError] = useState(null);
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    espacio: "",
    fecha: "",
    hora: "",
    proposito: "",
    participantes: ""
  });

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/espacios");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setEspacios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEspacios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fechaCompleta = new Date(formData.fecha);
      const [horas, minutos] = formData.hora.split(":");
      fechaCompleta.setHours(horas, minutos);

      const response = await fetch("http://localhost:5000/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: "Usuario",
          auditorio: formData.espacio,
          fecha: fechaCompleta,
          proposito: formData.proposito,
          participantes: parseInt(formData.participantes)
        }),
      });

      if (!response.ok) throw new Error("Error al realizar la reserva");
      setPaso(4);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-16"> 
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Reserva tu Espacio Ideal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra y reserva el espacio perfecto para tus necesidades
          </p>
        </div>

        <ProgressSteps paso={paso} />

        <div className="mb-8">
          <ReservationContent
            paso={paso}
            espacios={espacios}
            formData={formData}
            setFormData={setFormData}
            espacioSeleccionado={espacioSeleccionado}
            setEspacioSeleccionado={setEspacioSeleccionado}
            setPaso={setPaso}
          />
        </div>

        {paso < 4 && (
          <div className="flex justify-between max-w-4xl mx-auto mt-8">
            <button
              onClick={() => paso > 1 && setPaso(paso - 1)}
              className={`px-6 py-2 rounded-lg transition ${
                paso > 1
                  ? 'bg-white text-gray-600 hover:bg-gray-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={paso === 1}
            >
              Anterior
            </button>
            {paso === 3 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={!formData.espacio || !formData.fecha || !formData.hora}
              >
                Confirmar Reserva
              </button>
            ) : (
              <button
                onClick={() => setPaso(paso + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                disabled={
                  (paso === 1 && !formData.espacio) ||
                  (paso === 2 && (!formData.fecha || !formData.hora))
                }
              >
                Siguiente
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservar;
