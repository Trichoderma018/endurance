import React from 'react'  

import { Link } from 'react-router-dom'; // Importa Link si necesitas navegación


import '../style/Sidebar.css'; // Asegúrate de tener este archivo CSS para los estilos
// Asegúrate de que la ruta sea correcta según tu estructura de carpetas

function Sidebar() {
 return (
  <div>
    <div className="sidebar-container">
        <Link to="/mantAdmin" className="btn-sidebar">
          <i className="fas fa-user"></i>
          Mantenimiento Admin
        </Link>
        <Link to="/mantStaff" className="btn-sidebar">
          <i className="fas fa-user"></i>
          Mantenimiento Staff
        </Link>
        <Link to="/mantUser" className="btn-sidebar">
          <i className="fas fa-user"></i>
          Mantenimiento Users
        </Link>
        <Link to="/mantProyects" className="btn-sidebar">
          <i className="fas fa-user"></i>
          Mantenimiento Proyectos
        </Link>
        <Link to="/configurations" className="btn-sidebar">
          <i className="fas fa-cog"></i>
          Configuración

        </Link>
        <Link to="/null" className="btn-sidebar">
          <i className="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </Link>
     <div className='colocation'>
        <Link to="/Expediente" className="btn-sidebar">
          <i className="fas -sign-out-alt"></i>
          volver
        </Link>
        </div>
      </div>
  </div>
 );
}

export default Sidebar