import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

// Importa las imágenes
import salon1 from '../assets/images/salon.jpg';
// import salon2 from '../assets/images/salon2.png';
import salon3 from '../assets/images/auditorio.jpg';

// Mapea las imágenes a los nombres de los espacios 
const imagenes = {
  "Salon A": salon1,
  // "Salon B": salon2,
  "Salon C": salon3,
};

const ReservationContent = ({
  paso,
  espacios,
  formData,
  setFormData,
  espacioSeleccionado,
  setEspacioSeleccionado,
  setPaso,
}) => {
  switch (paso) {
    case 1:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {espacios.map((espacio) => (
            <div
              key={espacio._id}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                formData.espacio === espacio.nombre ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => {
                setFormData({ ...formData, espacio: espacio.nombre });
                setEspacioSeleccionado(espacio);
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <img
                    src={imagenes[espacio.nombre] || '/salon.jpg'} // Usa la imagen correspondiente o un placeholder
                    alt={espacio.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{espacio.nombre}</h3>
                    <p className="text-sm opacity-90">{espacio.tipo}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Capacidad: {espacio.capacidad}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 2:
      return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selecciona Fecha y Hora</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Horarios Populares</h4>
              <div className="grid grid-cols-2 gap-2">
                {['09:00', '11:00', '14:00', '16:00'].map((hora) => (
                  <button
                    key={hora}
                    onClick={() => setFormData({ ...formData, hora })}
                    className="p-2 text-sm bg-white rounded border hover:bg-blue-50 transition"
                  >
                    {hora}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Propósito de la Reserva
              </label>
              <textarea
                value={formData.proposito}
                onChange={(e) => setFormData({ ...formData, proposito: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Describe brevemente el propósito de tu reserva..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Participantes
              </label>
              <input
                type="number"
                value={formData.participantes}
                onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                max={espacioSeleccionado?.capacidad}
              />
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h3>
            <p className="text-gray-600 mb-6">
              Tu reserva ha sido procesada exitosamente.
            </p>
            <button
              onClick={() => {
                setPaso(1);
                setFormData({
                  espacio: "",
                  fecha: "",
                  hora: "",
                  proposito: "",
                  participantes: "",
                });
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Realizar otra reserva
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ReservationContent;
