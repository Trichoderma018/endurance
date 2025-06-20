import React from 'react'
import "../style/Cards.css"
import { useNavigate } from 'react-router-dom'

function Cards({id, nombre, imagen, descripcion, rol , view}) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate('/views');
    localStorage.setItem('id', id);
  }
  return (
  <div>
    <div className="card">
      <div className="image" />
        <p>{nombre}</p>
        <p className="card-info">{rol}</p>
      <div className="card-description">
        <p>{descripcion}</p>
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