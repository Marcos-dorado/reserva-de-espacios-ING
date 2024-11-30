    import React from 'react';
    import { CheckCircle } from 'lucide-react';

    const ProgressSteps = ({ paso }) => {
    const steps = ['Seleccionar Espacio', 'Elegir Horario', 'Detalles', 'Confirmación'];

    return (
        <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between relative">
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -z-10"></div>
            {steps.map((label, index) => (
            <div
                key={label}
                className={`flex flex-col items-center ${
                paso > index + 1 ? 'text-green-600' : paso === index + 1 ? 'text-blue-600' : 'text-gray-400'
                }`}
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paso > index + 1 ? 'bg-green-100' : paso === index + 1 ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                {paso > index + 1 ? (
                    <CheckCircle className="w-5 h-5" />
                ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                )}
                </div>
                <span className="text-sm mt-2">{label}</span>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default ProgressSteps;