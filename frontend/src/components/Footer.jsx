import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto text-center">
        {/* Título del Footer */}
        <p className="text-lg font-semibold mb-4">Sistema de Reservas de la Universidad</p>

        {/* Enlace o texto adicional */}
        <p className="text-sm mb-4">
          © 2024 Unicomfacauca. Todos los derechos reservados.
        </p>

        {/* Exoneración de responsabilidad */}
        <p className="text-sm text-gray-400">
          Este sistema es proporcionado "tal cual" y la universidad no se hace responsable de
          fallos, errores, o interrupciones en la aplicación. El uso de este sistema es bajo
          responsabilidad del usuario. No se garantiza su disponibilidad o correcto funcionamiento
          en todo momento.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
