import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import { useNavigate } from 'react-router-dom';
import '../style/Expediente.css';

import Navbar from './Navbar';
import Cards from './Cards';
import Search from './Search';

function Expediente() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const users = await Llamados.getData('api/expedientes/');
        setUsers(users);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
        setError('Hubo un problema al cargar los datos.');
      } finally {
        setIsLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className='fondo'>
      <div className='static'>
      <header className='Endurance'>ENDURANCE</header>
      <Navbar />
      <div className='tablita'>
      <Search />
     
      <button className='buttong' onClick={() => navigate('/agregar')}>Agregar +</button>
      
      </div>
      </div>
        <h2>Lista de Expediente</h2>
      <div className='barra'></div>

      <div className="registro-container">

        {isLoading && <p className="mensaje-cargando">Cargando expedientes...</p>}
        {error && <p className="mensaje-error">{error}</p>}

        {!isLoading && !error && users.length > 0 && users.map((user) => (
          <Cards
            key={user.id}
            id={user.id}
            imagen={user.imagen}
            descripcion={user.descripcion}
            nombre={user.nombreCompleto}
            rol={user.rol}
          />
        ))}

        {!isLoading && !error && users.length === 0 && (
          <p className="mensaje-vacio">No hay expedientes disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Expediente;