import React from 'react';
import { Link } from 'react-router-dom';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import '../style/Sidebar.css'; // Asegúrate de que esta ruta sea correcta

function Sidebar() {

  const CerrarSesion = () => {
    
    // SweetAlert de ejemplo (Revisar estilos)
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará y volverás al inicio de sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#ffffff',
    });

    localStorage.clear()


  }

  return (
    <div className="sidebar-container">
      <Link to="/Expediente" className="btn-sidebar">
        <ArrowBackIcon style={{ marginRight: '10px' }} />
        Volver
      </Link>

      <Link to="/mantAdmin" className="btn-sidebar">
        <PersonIcon style={{ marginRight: '10px' }} />
        Mantenimiento Admin
      </Link>

      <Link to="/mantStaff" className="btn-sidebar">
        <PersonIcon style={{ marginRight: '10px' }} />
        Mantenimiento Staff
      </Link>

      <Link to="/mantUser" className="btn-sidebar">
        <PersonIcon style={{ marginRight: '10px' }} />
        Mantenimiento Users
      </Link>

      <Link to="/mantProyects" className="btn-sidebar">
        <FolderOpenIcon style={{ marginRight: '10px' }} />
        Mantenimiento Proyectos
      </Link>

      {/* <Link to="/configurations" className="btn-sidebar">
        <MiscellaneousServicesOutlinedIcon style={{ marginRight: '10px' }} />
        Configuración
      </Link> */}

      <button onClick={(e) => CerrarSesion()} className="btn-sidebar">
        <ExitToAppIcon style={{ marginRight: '10px' }} />
        Cerrar Sesión
      </button>

    </div>
  );
}

export default Sidebar;