import React from 'react';
import { Route } from 'react-router-dom';
import ReservationForm from '../pages/FormularioReserva';
import ReservationsList from '../pages/ListaReservas';

const routes = [
  {
    path: "/",
    exact: true,
    component: ReservationForm,
  },
  {
    path: "/reservations",
    component: ReservationsList,
  },
];

export default routes;
