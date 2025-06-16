import React from 'react'  

import { Link } from 'react-router-dom'; // Importa Link si necesitas navegación

import '../style/Sidebar.css'; // Asegúrate de tener este archivo CSS para los estilos
// Asegúrate de que la ruta sea correcta según tu estructura de carpetas

function Sidebar() {
 return (
  <div>
    <div className="sidebar-container">
        <button className="btn-sidebar">
          <i className="fas fa-user"></i>
          Usuarios
        </button>
        <button className="btn-sidebar">
          <i className="fas fa-cog"></i>
          Configuración

        </button>
        <button className="btn-sidebar">
          <i className="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </button>
      </div>
  </div>
 );
}

export default Sidebar