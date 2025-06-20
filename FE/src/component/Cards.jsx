import React from 'react'
import "../style/Cards.css"
import { useNavigate } from 'react-router-dom'

function Cards({nombre, imagen, descripcion, rol , view}) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate('/views');
  }
  return (
  <div>
    <div className="card">
      <div className="image" />
        <p className="card-info">{rol}</p>
        <p style={{backgroundColor: 'transparent'}}>{nombre}</p>
      <div className="card-description">
        <p style={{backgroundColor: 'transparent'}}>{descripcion}</p>
      </div>
      <div className="card-info">
        
      </div>
      <button onClick={handleView} className="button">
        view
      </button>
 </div>


</div>
  )
}

export default Cards