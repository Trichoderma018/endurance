import React from 'react'
import "../style/Cards.css"

function Cards({nombre, imagen, descripcion, rol , view}) {
  return (
  <div>
    <div className="card">
      <div className="image" />
        <p className="card-info">{rol}</p>
      <div className="card-description">
        <p>{descripcion}</p>
      </div>
      <div className="card-info">
        
      </div>
      <button  className="button" onClick={view}>
        view
      </button>
 </div>


</div>
  )
}

export default Cards