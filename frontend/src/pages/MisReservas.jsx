import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Building2, User, Loader2 } from "lucide-react";
import DataTable from "react-data-table-component";
import axios from "../utils/api";

// Componente principal de Mis Reservas
const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get("/reservas");
        setReservas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
        setError("No pudimos cargar tus reservas. Por favor, intenta de nuevo más tarde.");
        setLoading(false);
      }
    };
    fetchReservas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
      {/* Header con animación suave */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-24 pb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mis Reservas
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Consulta, gestiona y organiza todas tus reservas de forma sencilla y rápida.
        </p>
      </motion.div>

      {/* Contenedor de la tabla con animación */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 pb-12"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center p-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <ReservaTable reservas={reservas} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Componente de la tabla
const ReservaTable = ({ reservas }) => {
  const columns = [
    {
      name: "Fecha",
      selector: (row) => new Date(row.fecha).toLocaleDateString(),
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span>{new Date(row.fecha).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      name: "Hora",
      selector: (row) => new Date(row.fecha).toLocaleTimeString(),
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span>{new Date(row.fecha).toLocaleTimeString()}</span>
        </div>
      ),
    },
    {
      name: "Espacio",
      selector: (row) => row.auditorio,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span>{row.auditorio}</span>
        </div>
      ),
    },
    {
      name: "Usuario",
      selector: (row) => row.usuario,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" />
          <span>{row.usuario}</span>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
      },
    },
    headCells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#1e293b',
        padding: '1rem',
      },
    },
    cells: {
      style: {
        fontSize: '0.875rem',
        padding: '1rem',
        color: '#334155',
      },
    },
    rows: {
      style: {
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#f1f5f9',
          transition: 'all 0.2s ease',
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f8fafc',
        color: '#334155',
        padding: '1rem',
      },
      pageButtonsStyle: {
        color: '#3b82f6',
        fill: '#3b82f6',
        '&:disabled': {
          color: '#cbd5e1',
          fill: '#cbd5e1',
        },
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={reservas}
      pagination
      highlightOnHover
      customStyles={customStyles}
      responsive
      noDataComponent={
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hay reservas disponibles.</p>
        </div>
      }
    />
  );
};

export default MisReservas;