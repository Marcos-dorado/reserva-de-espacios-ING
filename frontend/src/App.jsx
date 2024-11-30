import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Reservar from "./pages/Reservar";
import Inicio from "./pages/Inicio";
import MisReservas from "./pages/MisReservas";
import Gestion from "./pages/Gestion";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        {/* <Route path="/gestion" element={<Gestion />} /> */}
      </Routes>
      <Chatbot/>

      <Footer />
    </Router>
  );
};

export default App;
