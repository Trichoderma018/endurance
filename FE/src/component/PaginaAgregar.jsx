import React, { useState, useEffect, useRef } from 'react';
import Llamados from '../services/Llamados';
import '../style/ExpeInput.css'; 
import uploadImageToS3 from './credenciales';
import { useNavigate } from 'react-router-dom';

function PaginaAgregar() {
    const [userExpediente, setUserExpediente] = useState('');
    const [rolExpediente, setRolExpediente] = useState('');
    const fileInputRef = useRef(null);
    const [imagenExpediente, setImagenExpediente] = useState('');
    const [activoExpediente, setActivoExpediente] = useState('');
    const [generoExpediente, setGeneroExpediente] = useState('');
    const [sedeExpediente, setSedeExpediente] = useState('');
    const [comentario1Expediente, setComentario1Expediente] = useState('');
    const [comentario2Expediente, setComentario2Expediente] = useState('');
    const [comentario3Expediente, setComentario3Expediente] = useState('');
    const [fechaExpediente, setFechaExpediente] = useState('');
    const [expedientes, setExpedientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentExpedienteId, setCurrentExpedienteId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
   
    // Cargar expedientes y usuarios al montar el componente
    // Esto se puede optimizar para que solo se carguen una vez

    useEffect(() => {
        obtenerExpedientes();
        obtenerUsuarios();
    }, []);

    async function obtenerExpedientes() {
        try {
            const response = await Llamados.getData('api/expedientes/');
            setExpedientes(response.data || response);
        } catch (error) {
            console.error('Error obteniendo expedientes:', error);
        }
    }

    async function obtenerUsuarios() {
        try {
            const response = await Llamados.getData('api/users/');
            setUsuarios(response.data || response);
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
        }
    }

 
    function obtenerNombreUsuario(userId) {
        const usuario = usuarios.find(user => user.id === userId);
        return usuario ? usuario.name || usuario.username || usuario.nombre : 'Usuario no encontrado';
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await uploadImageToS3(file);
                const imagenUrl = result.Location;
                setImagenExpediente(imagenUrl);
            } catch (error) {
                console.error('Error al subir la imagen a S3:', error);
                setError('No se pudo subir la imagen a S3');
            }
        }
    };

    async function cargarDatos() {
        const obj = {
            user: userExpediente,
            rol: rolExpediente,
            activo: activoExpediente === 'activo',
            imagen: imagenExpediente,
            genero: generoExpediente,
            sede: sedeExpediente,
            comentario1: comentario1Expediente,
            comentario2: comentario2Expediente,
            comentario3: comentario3Expediente,
            fecha: fechaExpediente
        };

        try {
            await Llamados.postData(obj, 'api/expedientes/');
            limpiarFormulario();
            obtenerExpedientes();
        } catch (error) {
            console.error('Error al crear expediente:', error);
            setError('Error al crear expediente');
        }
    }

    async function actualizarExpediente() {
        const expedienteActualizado = {
            user: userExpediente,
            rol: rolExpediente,
            activo: activoExpediente === 'activo',
            imagen: imagenExpediente,
            genero: generoExpediente,
            sede: sedeExpediente,
            comentario1: comentario1Expediente,
            comentario2: comentario2Expediente,
            comentario3: comentario3Expediente,
            fecha: fechaExpediente
        };

        try {
            await Llamados.patchData(expedienteActualizado, 'api/expedientes', currentExpedienteId);
            limpiarFormulario();
            setEditMode(false);
            setCurrentExpedienteId(null);
            obtenerExpedientes();
        } catch (error) {
            console.error('Error al actualizar expediente:', error);
            setError('Error al actualizar expediente');
        }
    }

    async function eliminarExpediente(id) {
        if (window.confirm('¿Está seguro que desea eliminar este expediente?')) {
            try {
                await Llamados.deleteData('api/expedientes', id);
                obtenerExpedientes();
            } catch (error) {
                console.error('Error al eliminar expediente:', error);
                setError('Error al eliminar expediente');
            }
        }
    }

    function editarExpediente(expediente) {
        setUserExpediente(expediente.user || '');
        setRolExpediente(expediente.rol || '');
        setActivoExpediente(expediente.activo ? 'activo' : 'inactivo');
        setImagenExpediente(expediente.imagen || '');
        setGeneroExpediente(expediente.genero || '');
        setSedeExpediente(expediente.sede || '');
        setComentario1Expediente(expediente.comentario1 || '');
        setComentario2Expediente(expediente.comentario2 || '');
        setComentario3Expediente(expediente.comentario3 || '');
        setFechaExpediente(expediente.fecha || '');
        setCurrentExpedienteId(expediente.id);
        setEditMode(true);
    }

    function limpiarFormulario() {
        setUserExpediente('');
        setRolExpediente('');
        setImagenExpediente('');
        setActivoExpediente('');
        setGeneroExpediente('');
        setSedeExpediente('');
        setComentario1Expediente('');
        setComentario2Expediente('');
        setComentario3Expediente('');
        setFechaExpediente('');
        setEditMode(false);
        setCurrentExpedienteId(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!userExpediente || !sedeExpediente || !generoExpediente || !activoExpediente || !fechaExpediente) {
            setError('Por favor, complete todos los campos.');
            setIsLoading(false);
            return;
        }

        try {
            if (editMode) {
                await actualizarExpediente();
            } else {
                await cargarDatos();
            }
        } catch (error) {
            setError('Error en el envío del formulario.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleConfirm = () => {
        if (window.confirm('¿Está seguro que desea confirmar este expediente?')) {
            cargarDatos("confirmar");
        }
        navigate('/expediente');
    };

    return (
        <div className='fondo'>
            <div className='barra'>
                <header className='Endurance'>ENDURANCE</header>
            </div>

            <div className="registro-container">
                <h2>{editMode ? 'EDITAR EXPEDIENTE' : 'EXPEDIENTES'}</h2>
                <form onSubmit={handleSubmit}>
                    <select className='input' value={userExpediente} onChange={e => setUserExpediente(e.target.value)} required>
                        <option value="">Name</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.name || usuario.username || usuario.nombre}
                            </option>
                        ))}

                    </select>


                    <select className='input' value={rolExpediente} onChange={e => setRolExpediente(e.target.value)} required>
                        <option value="">Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>

                    <div className="campo">
                        <label htmlFor="imagen">Imagen del Expediente</label> <br />
                        <input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        />
                        {imagenExpediente && (
                        <div style={{marginTop: '10px'}}>
                            <img src={imagenExpediente} alt="Preview" style={{maxWidth: '200px', maxHeight: '200px'}} />
                        </div>
                        )}
                    </div>

                    <select className='input' value={activoExpediente} onChange={e => setActivoExpediente(e.target.value)} required>
                        <option value="">Estado</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                    </select>

                    <select className='input' value={generoExpediente} onChange={e => setGeneroExpediente(e.target.value)} required>
                        <option value="">Género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <select className='input' value={sedeExpediente} onChange={e => setSedeExpediente(e.target.value)} required>
                        <option value="">Sede</option>
                        <option value="sede1">San José</option>
                        <option value="sede2">Limón</option>
                        <option value="sede3">Cartago</option>
                        <option value="sede4">Heredia</option>
                        <option value="sede5">Alajuela</option>
                        <option value="sede6">Guanacaste</option>
                        <option value="sede7">Puntarenas</option>
                    </select>

                    <input className='input' type="text" value={comentario1Expediente} onChange={e => setComentario1Expediente(e.target.value)} placeholder="Comentario °1" />
                    <input className='input' type="text" value={comentario2Expediente} onChange={e => setComentario2Expediente(e.target.value)} placeholder="Comentario °2" />
                    <input className='input' type="text" value={comentario3Expediente} onChange={e => setComentario3Expediente(e.target.value)} placeholder="Comentario °3" />

                    <input className='input' type="date" value={fechaExpediente} onChange={e => setFechaExpediente(e.target.value)} required />

                    <div style={{ marginTop: '10px' }}>
                        <button type="submit">{editMode ? 'Actualizar' : 'Agregar'}</button>
                        {editMode && <button type="button" onClick={limpiarFormulario} style={{ marginLeft: '10px' }}>Cancelar</button>}
                    </div>

                    {isLoading && <div className="spinner"><span></span><span></span><span></span></div>}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <button onClick={handleConfirm}>Confirmar expediente</button>

            <div className="registro-container">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Género</th>
                            <th>Sede</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expedientes.map(expediente => (
                            <tr key={`exp-${expediente.id}`}>
                                <td>{obtenerNombreUsuario(expediente.user)}</td>
                                <td>{expediente.rol}</td>
                                <td>{expediente.activo ? 'Activo' : 'Inactivo'}</td>
                                <td>{expediente.genero}</td>
                                <td>{expediente.sede}</td>
                                <td>{expediente.fecha}</td>
                                <td>
                                    <button onClick={() => editarExpediente(expediente)}>Editar</button>
                                    <button onClick={() => eliminarExpediente(expediente.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaginaAgregar;
