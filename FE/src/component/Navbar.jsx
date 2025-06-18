import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        {/* <Link ></Link> */}
        <nav>

            <div className="radio-input">
                
            <label><Link to={"/Expediente"}>
                <input
                defaultValue="value-2"
                name="value-radio"
                id="value-2"
                type="radio"
                /></Link>
                <span>Expedientes</span>
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