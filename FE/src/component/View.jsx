import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import { useNavigate } from 'react-router-dom';
import '../style/View.css';

function View() {
    const [expediente, setExpediente] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarExpediente();
    }, []);

    const cargarExpediente = async () => {
        const expedienteId = localStorage.getItem('id');
        
        if (!expedienteId) {
            setError('No se encontró el ID del expediente');
            setIsLoading(false);
            return;
        }

        try {
            // Obtener datos del expediente
            const expedienteData = await Llamados.getData(`api/expedientes/${expedienteId}/`);
            setExpediente(expedienteData);

            // Obtener datos del usuario asociado
            if (expedienteData.user) {
                const usuarioData = await Llamados.getData(`api/users/${expedienteData.user}/`);
                setUsuario(usuarioData);
            }

        } catch (error) {
            console.error('Error cargando expediente:', error);
            setError('Error al cargar la información del expediente');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditar = () => {
        navigate('/agregar'); // Redirige a PaginaAgregar en modo edición
        // Podrías pasar parámetros para indicar que es edición
    };

    const handleVolver = () => {
        navigate('/expediente');
    };

    if (isLoading) {
        return (
            <div className="view-container">
                <div className="loading">Cargando información del expediente...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-container">
                <div className="error">{error}</div>
                <button onClick={handleVolver} className="btn-volver">Volver a Expedientes</button>
            </div>
        );
    }

    if (!expediente) {
        return (
            <div className="view-container">
                <div className="error">No se encontró el expediente</div>
                <button onClick={handleVolver} className="btn-volver">Volver a Expedientes</button>
            </div>
        );
    }

    return (

        <div>
            <h2>User Information</h2>
            

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}


            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
                        {user.username}
                    </li>
                ))}
            </ul>


            <div className="expediente-card">
                {/* Información del Usuario */}
                <div className="info-section">
                    <h2>Información General</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Nombre:</span>
                            <span className="value">{usuario?.name || usuario?.username || 'No disponible'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Rol:</span>
                            <span className="value role">{expediente.rol}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Estado:</span>
                            <span className={`value status ${expediente.activo ? 'activo' : 'inactivo'}`}>
                                {expediente.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="label">Género:</span>
                            <span className="value">{expediente.genero}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Sede:</span>
                            <span className="value">{expediente.sede}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Fecha:</span>
                            <span className="value">{expediente.fecha}</span>
                        </div>
                    </div>
                </div>

                {/* Imagen */}
                {expediente.imagen && (
                    <div className="info-section">
                        <h2>Imagen</h2>
                        <div className="image-container">
                            <img 
                                src={expediente.imagen} 
                                alt="Expediente" 
                                className="expediente-imagen"
                            />
                        </div>
                    </div>
                )}

                {/* Comentarioss */}
                {(expediente.comentario1 || expediente.comentario2 || expediente.comentario3) && (
                    <div className="info-section">
                        <h2>Comentarios</h2>
                        <div className="comentarios-grid">
                            {expediente.comentario1 && (
                                <div className="comentario-item">
                                    <span className="comentario-label">Comentario 1:</span>
                                    <p className="comentario-texto">{expediente.comentario1}</p>
                                </div>
                            )}
                            {expediente.comentario2 && (
                                <div className="comentario-item">
                                    <span className="comentario-label">Comentario 2:</span>
                                    <p className="comentario-texto">{expediente.comentario2}</p>
                                </div>
                            )}
                            {expediente.comentario3 && (
                                <div className="comentario-item">
                                    <span className="comentario-label">Comentario 3:</span>
                                    <p className="comentario-texto">{expediente.comentario3}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default View;