import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'
import Logo from '../assets/img/Logo-Endurance.jpg'; 

function Navbar() {
  return (
    <div>

        {/* <Link ></Link> */}

    <nav >

        <div className="cont-rutas">
                  <img className="montage" src={Logo} alt="Logo" />
            <label>
                <Link to={"/Expediente"}>
                <input
                defaultValue="expediente"
                name="value-radio"
                id="value-2"
                type="button"
                className='lar'
            />
            </Link>
            </label>
            
            <label>
                <Link to={"/proyectos"}>
                <input
                defaultValue="proyecto"
                name="value-radio"
                id="value-3"
                type="button"
                className='lar'
            />
            </Link>
            </label>
            
            <label>
                 <Link to="/MantAdmin">
                <input
                defaultValue="mantenimiento"
                name="value-radio"
                id="value-3"
                type="button"
                className='lar'
            />
            </Link>
        </label> 
            <div className='afuera'>
                <Link to="/null" className="boton">
                <i className="fas fa-sign-out-alt"></i>
                Cerrar Sesión
                </Link>
          </div>
    </div>
</nav>
</div>
  )
}

export default Navbar