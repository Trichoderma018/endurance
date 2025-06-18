import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

function Navbar() {
  return (
    <div>
        {/* <Link ></Link> */}
        <nav>

            <div className="">

            <label><Link to={"/Expediente"}>
                <input
                defaultValue="expediente"
                name="value-radio"
                id="value-2"
                type="button"

                /></Link>
            </label>
            <label><Link to={"/proyectos"}>
                <input
                defaultValue="proyecto"
                name="value-radio"
                id="value-3"
                type="button"
                /></Link>
             
            </label>
            <label>
                 <Link to="/MantAdmin">
                <input
                defaultValue="mantenimiento"
                name="value-radio"
                id="value-3"
                type="button"

                /></Link> 
            
            </label>
          
            </div>

            
        </nav>
    </div>
  )
}

export default Navbar