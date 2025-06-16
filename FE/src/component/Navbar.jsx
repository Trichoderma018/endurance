import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css' 
function Navbar() {
  return (
    <div>
        {/* <Link ></Link> */}
        <nav>

            <div className="cont-rutas">
            <label>
                <Link to={"/Expediente"}>
                <input
                defaultValue="Expedientes"
                name="value-radio"
                id="value-2"
                className='inp-radio'
                type="button"
                /></Link>
            </label>
            <label><Link to={"/proyectos"}>
                <input
                defaultValue="value-3"
                name="value-radio"
                id="value-3"
                type="radio"
                /></Link>
                <span>Proyectos</span>
            </label>
            <label>
                 <Link to="/MantAdmin">
                <input
                defaultValue="value-3"
                name="value-radio"
                id="value-3"
                type="radio"
                /></Link> 
                <span>Mantenimientos</span>
            </label>
            <span className="selection" />
            </div>
            
            
        </nav>
    </div>
  )
}

export default Navbar