import React, { useEffect } from 'react'
import Llamados from '../services/Llamados'
import "../style/ExpeInput.css"

function PaginaAgregar() {
    // Estados del formulario
    const [userExpediente, setUserExpediente] = React.useState("")
    const [rolExpediente, setRolExpediente] = React.useState("")
    const [imagenExpediente, setImagenExpediente] = React.useState("")
    const [activoExpediente, setActivoExpediente] = React.useState("")
    const [generoExpediente, setGeneroExpediente] = React.useState("")
    const [sedeExpediente, setSedeExpediente] = React.useState("")
    const [comentario1Expediente, setComentario1Expediente] = React.useState("")
    const [comentario2Expediente, setComentario2Expediente] = React.useState("")
    const [comentario3Expediente, setComentario3Expediente] = React.useState("")
    const [fechaExpediente, setFechaExpediente] = React.useState("")
    
    const [expedientes, setExpedientes] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)
    const [currentExpedienteId, setCurrentExpedienteId] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    useEffect(() => {
        obtenerExpedientes()
    }, [])

    async function obtenerExpedientes() {
        try {
            const response = await Llamados.getData('api/expedientes/')
            console.log("Expedientes obtenidos:", response)
            setExpedientes(response.data || response)
        } catch (error) {
            console.error("Error obteniendo expedientes:", error)
        }
    }

    async function cargarDatos() {
        try {
            const obj = {
                user: userExpediente,
                rol: rolExpediente,
                activo: activoExpediente,
                imagen: imagenExpediente,
                genero: generoExpediente,
                sede: sedeExpediente,
                comentario1: comentario1Expediente,
                comentario2: comentario2Expediente,
                comentario3: comentario3Expediente,
                fecha: fechaExpediente
            }
            
            console.log('Objeto a enviar:', obj)
            const response = await Llamados.postData(obj, 'api/expedientes/')
            console.log('Response Data', response)
            limpiarFormulario()
            obtenerExpedientes()
        } catch (error) {
            console.error("Error al crear expediente:", error)
        }
    }

    async function actualizarExpediente() {
        try {
            const expedienteActualizado = {
                user: userExpediente,
                rol: rolExpediente,
                activo: activoExpediente,
                imagen: imagenExpediente,
                genero: generoExpediente,
                sede: sedeExpediente,
                comentario1: comentario1Expediente,
                comentario2: comentario2Expediente,
                comentario3: comentario3Expediente,
                fecha: fechaExpediente
            }
            
            console.log('Objeto a actualizar:', expedienteActualizado)
            await Llamados.patchData(expedienteActualizado, "api/expedientes", currentExpedienteId)
            limpiarFormulario()
            setEditMode(false)
            setCurrentExpedienteId(null)
            obtenerExpedientes()
        } catch (error) {
            console.error("Error al actualizar expediente:", error)
        }
    }

    async function eliminarExpediente(id) {
        if (window.confirm("¿Está seguro que desea eliminar este expediente?")) {
            try {
                await Llamados.deleteData("api/expedientes", id)
                obtenerExpedientes()
            } catch (error) {
                console.error("Error al eliminar expediente:", error)
            }
        }
    }

    function editarExpediente(expediente) {
        setUserExpediente(expediente.user)
        setRolExpediente(expediente.rol)
        setActivoExpediente(expediente.activo)
        setImagenExpediente(expediente.imagen)
        setGeneroExpediente(expediente.genero)
        setSedeExpediente(expediente.sede)
        setComentario1Expediente(expediente.comentario1)
        setComentario2Expediente(expediente.comentario2)
        setComentario3Expediente(expediente.comentario3)
        setFechaExpediente(expediente.fecha)
        setCurrentExpedienteId(expediente.id)
        setEditMode(true)
    }

    function limpiarFormulario() {
        setUserExpediente("")
        setRolExpediente("")
        setImagenExpediente("")
        setActivoExpediente("")
        setGeneroExpediente("")
        setSedeExpediente("")
        setComentario1Expediente("")
        setComentario2Expediente("")
        setComentario3Expediente("")
        setFechaExpediente("")
        setEditMode(false)
        setCurrentExpedienteId(null)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        
        if (!userExpediente || !sedeExpediente || !generoExpediente || !activoExpediente || 
            !comentario1Expediente || !comentario2Expediente || !comentario3Expediente || !fechaExpediente) {
            setError('Por favor, complete todos los campos.')
            setIsLoading(false)
            return
        }
        
        if (editMode) {
            actualizarExpediente()
        } else {
            cargarDatos()
        }
        setIsLoading(false)
    }

    return (
        <div className='fondo'>
            <div className='barra'>
                <header className='Endurance'>ENDURANCE</header>
            </div>
            
            <div className="registro-container">
                <h2>{editMode ? 'EDITAR EXPEDIENTE' : 'EXPEDIENTES'}</h2>
                <form>
                    <input 
                        className='input' 
                        type="text" 
                        name="name" 
                        value={userExpediente}
                        onChange={(e) => setUserExpediente(e.target.value)} 
                        placeholder="Full name" 
                        required 
                    />

                    <select 
                        className='input' 
                        name="Estado" 
                        value={rolExpediente}
                        onChange={(e) => setRolExpediente(e.target.value)} 
                        required
                    >
                        <option value="">Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>

                    <input 
                        className='input' 
                        type="file" 
                        name='wall' 
                        accept="image/*" 
                        onChange={(e) => setImagenExpediente(e.target.files[0])}
                    />

                    <select 
                        className='input' 
                        value={activoExpediente} 
                        onChange={(e) => setActivoExpediente(e.target.value)}
                    >
                        <option value="">estado</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                    </select>

                    <select 
                        className='input' 
                        name="Genero" 
                        value={generoExpediente}
                        onChange={(e) => setGeneroExpediente(e.target.value)} 
                        required
                    >
                        <option value="">género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <select 
                        className='input' 
                        name="Sede" 
                        value={sedeExpediente}
                        onChange={(e) => setSedeExpediente(e.target.value)} 
                        required
                    >
                        <option value="">Sede</option>
                        <option value="sede1">San Jose</option>
                        <option value="sede2">Limon</option>
                        <option value="sede3">Cartago</option>
                        <option value="sede4">Heredia</option>
                        <option value="sede5">Alajuela</option>
                        <option value="sede6">Guanacaste</option>
                        <option value="sede7">Puntarenas</option>
                    </select>
                    <br />
                    
                    <input 
                        value={comentario1Expediente}
                        onChange={(e) => setComentario1Expediente(e.target.value)} 
                        className='input' 
                        type="text" 
                        name="comentario1" 
                        placeholder="Comentario °1" 
                        required 
                    />
                    <input 
                        value={comentario2Expediente}
                        onChange={(e) => setComentario2Expediente(e.target.value)} 
                        className='input' 
                        type="text" 
                        name="comentario2" 
                        placeholder="Comentario °2" 
                        required 
                    />
                    <input 
                        value={comentario3Expediente}
                        onChange={(e) => setComentario3Expediente(e.target.value)} 
                        className='input' 
                        type="text" 
                        name="comentario3" 
                        placeholder="Comentario °3" 
                        required 
                    />
                    <input 
                        className='input' 
                        type="date" 
                        name="fecha" 
                        value={fechaExpediente}
                        onChange={(e) => setFechaExpediente(e.target.value)} 
                        required 
                    />
                    <br />
                    
                    <button className='' type="submit" onClick={(e) => handleSubmit(e)}>
                        {editMode ? 'Update Expedient' : 'Create Expedient'}
                    </button>
                    
                    {editMode && (
                        <button 
                            className='' 
                            type="button" 
                            onClick={limpiarFormulario}
                        >
                            Cancelar
                        </button>
                    )}
                    
                    {isLoading && (
                        <div className="spinner">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}

                    {error && <p className="error">{error}</p>}
                </form>
            </div>

            <div className="registro-container">
                <h2>Lista de Expedientes</h2>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
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
                        {expedientes && expedientes.length > 0 && expedientes.map((expediente) => (
                            <tr key={`exp-${expediente.id}`}>
                                <td>{expediente.user}</td>
                                <td>{expediente.rol}</td>
                                <td>{expediente.activo}</td>
                                <td>{expediente.genero}</td>
                                <td>{expediente.sede}</td>
                                <td>{expediente.fecha}</td>
                                <td>
                                    <button onClick={() => editarExpediente(expediente)}>
                                        Editar
                                    </button>
                                    <button onClick={() => eliminarExpediente(expediente.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaginaAgregar