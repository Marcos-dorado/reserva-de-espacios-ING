import React from "react";
import DataTable from "react-data-table-component";

const eservaTable = ({ reservas }) => {
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

export default ReservaTable;