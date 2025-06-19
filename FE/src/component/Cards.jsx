import React from 'react'
import "../style/Cards.css"
import { Navigate } from 'react-router-dom'
const navigate = Navigate

function Cards({nombre, imagen, descripcion, rol , view}) {
  return (
  <div>
    <div className="card">
      <div className="image" />
        <p className="card-info">{rol}</p>
      <div className="card-description">
        <p style={{backgroundColor: 'transparent'}}>{nombre}</p>
        <p style={{backgroundColor: 'transparent'}}>{descripcion}</p>
      </div>
      <div className="card-info">
        
      </div>
      <button onClick={() => navigate('/view')} className="button">
        view
      </button>
 </div>


</div>
  )
}

export default Cards