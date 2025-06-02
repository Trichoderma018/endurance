import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        {/* <Link ></Link> */}
        <nav>
            
            <div className="radio-input">
            <label>
                <input
                defaultValue="value-1"
                name="value-radio"
                id="value-1"
                type="radio"
                defaultChecked=""
                />
                <span>Usuarios</span>
            </label>
            <label><Link to={"/Expesiente"}>
                <input
                defaultValue="value-2"
                name="value-radio"
                id="value-2"
                type="radio"
                /></Link>
                <span>Expedientes</span>
            </label>
            <label>
                <input
                defaultValue="value-3"
                name="value-radio"
                id="value-3"
                type="radio"
                />
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