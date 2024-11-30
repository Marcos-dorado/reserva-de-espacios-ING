import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Building2 } from 'lucide-react';

const Inicio = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden mt-10">
      {/* Hero Section */}
      <main className="relative max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Gestiona tus espacios de
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> manera inteligente</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Simplifica la gestión de tus reservas con nuestra plataforma intuitiva. 
            Administra salones y auditorios con facilidad y eficiencia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              to="/reservar" 
              className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reservar
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/mis-reservas" 
              className="group inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Building2 className="mr-2 h-5 w-5" />
              Mis Reservas
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;