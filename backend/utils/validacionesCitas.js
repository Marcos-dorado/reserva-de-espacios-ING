const moment = require('moment');

// Lista de días festivos en formato 'YYYY-MM-DD'
const diasFestivos = [
  '2024-01-01', // Año Nuevo
  '2024-08-15', // Asunción de la Virgen
  '2024-09-15', // Día de la Independencia
  '2024-10-12', // Día de la Hispanidad
  '2024-11-01', // Todos los Santos
  '2024-12-25', // Navidad
  // Añadir más días festivos según sea necesario
];

const validacionesCitas = {
  esDiaFestivo: (fecha) => {
    const fechaFormateada = moment(fecha).format('YYYY-MM-DD');
    return diasFestivos.includes(fechaFormateada);
  },

  validarHorarioCita: (fecha, hora) => {
    const fechaMoment = moment(fecha);
    const horaMoment = moment(hora, 'HH:mm');
    const diaSemana = fechaMoment.day(); // 0: Domingo, 6: Sábado
    const horaNum = horaMoment.hours() + horaMoment.minutes() / 60;

    // Validar rango de hora general (8:00 AM a 6:00 PM)
    if (horaNum < 8 || horaNum > 18) {
      throw new Error('Las citas solo se pueden programar entre 8:00 AM y 6:00 PM');
    }

    // Validar domingo
    if (diaSemana === 0) {
      throw new Error('No se pueden programar citas en domingo');
    }

    // Validar sábado después de la 1:00 PM
    if (diaSemana === 6 && horaNum >= 13) {
      throw new Error('Los sábados solo se pueden programar citas hasta la 1:00 PM');
    }

    // Validar día festivo
    if (validacionesCitas.esDiaFestivo(fecha)) {
      throw new Error('No se pueden programar citas en días festivos');
    }

    return true;
  },

  esCitaDisponible: async (fecha, hora, monitor, Cita) => {
    // Verificar si ya existe una cita para ese monitor en esa fecha y hora
    const citaExistente = await Cita.findOne({
      fecha: moment(fecha).startOf('day').toDate(),
      hora,
      monitor
    });

    if (citaExistente) {
      throw new Error('Ya existe una cita programada para este horario con el monitor seleccionado');
    }

    return true;
  }
};

module.exports = validacionesCitas;