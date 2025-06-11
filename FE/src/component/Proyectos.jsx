import React, { useState, useEffect, useRef } from 'react'
import Llamados from '../services/Llamados'
import "../style/ExpeInput.css"
import uploadImageToS3 from './credenciales';

function Proyectos() {
    // Estados del formulario
    const [nombreProyecto, setNombreProyecto] = useState("")
    const [usuariosProyecto, setUsuariosProyecto] = useState([])
    const [objetivoProyecto, setObjetivoProyecto] = useState("")
    const [imagenProyecto, setImagenProyecto] = useState("")
    const [descripcionProyecto, setDescripcionProyecto] = useState("")
    const [fechaInicioProyecto, setFechaInicioProyecto] = useState("")
    const [fechaFinProyecto, setFechaFinProyecto] = useState("")
    const [activoProyecto, setActivoProyecto] = useState("")
    
    const fileInputRef = useRef(null);
    const [proyectos, setProyectos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentProyectoId, setCurrentProyectoId] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        obtenerProyectos()
        obtenerUsuarios()
    }, [])

    async function obtenerProyectos() {
        try {
            const response = await Llamados.getData('api/proyecto/')
            console.log("Proyectos obtenidos:", response)
            setProyectos(response.data || response)
        } catch (error) {
            console.error("Error obteniendo proyectos:", error)
        }
    }

    async function obtenerUsuarios() {
        try {
            const response = await Llamados.getData('api/users/')
            console.log("Usuarios obtenidos:", response)
            setUsuarios(response.data || response)
        } catch (error) {
            console.error("Error obteniendo usuarios:", error)
        }
    }

    function obtenerNombresUsuarios(usuariosIds) {
        if (!usuariosIds || usuariosIds.length === 0) return 'Sin usuarios asignados'
        const nombres = usuariosIds.map(userId => {
            const usuario = usuarios.find(user => user.id === userId)
            return usuario ? usuario.name || usuario.username || usuario.nombre : 'Usuario no encontrado'
        })
        return nombres.join(', ')
    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await uploadImageToS3(file);
                const imagenUrl = result.Location;
                setImagenProyecto(imagenUrl)
            } catch (error) {
                console.error('Error al subir la imagen a S3:', error);
                setError('No se pudo subir la imagen a S3');
            }
        }
    };

    const handleUsuarioChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => parseInt(option.value))
        setUsuariosProyecto(selectedOptions)
    }

    async function cargarDatos() {
        try {
            const obj = {
                nombreProyecto: nombreProyecto,
                usuarios: usuariosProyecto,
                objetivo: objetivoProyecto,
                imagen: imagenProyecto,
                descripcion: descripcionProyecto,
                fechaInicio: fechaInicioProyecto,
                fechaFin: fechaFinProyecto,
                activo: activoProyecto === "activo"
            }
            
            console.log('Objeto a enviar:', obj)
            const response = await Llamados.postData(obj, 'api/proyecto/')
            console.log('Response Data', response)
            limpiarFormulario()
            obtenerProyectos()
        } catch (error) {
            console.error("Error al crear proyecto:", error)
            setError("Error al crear proyecto")
        }
    }

    async function actualizarProyecto() {
        try {
            const proyectoActualizado = {
                nombreProyecto: nombreProyecto,
                usuarios: usuariosProyecto,
                objetivo: objetivoProyecto,
                imagen: imagenProyecto,
                descripcion: descripcionProyecto,
                fechaInicio: fechaInicioProyecto,
                fechaFin: fechaFinProyecto,
                activo: activoProyecto === "activo"
            }
            
            console.log('Objeto a actualizar:', proyectoActualizado)
            await Llamados.patchData(proyectoActualizado, "api/proyecto", currentProyectoId)
            limpiarFormulario()
            setEditMode(false)
            setCurrentProyectoId(null)
            obtenerProyectos()
        } catch (error) {
            console.error("Error al actualizar proyecto:", error)
            setError("Error al actualizar proyecto")
        }
    }

    async function eliminarProyecto(id) {
        if (window.confirm("¿Está seguro que desea eliminar este proyecto?")) {
            try {
                await Llamados.deleteData("api/proyecto", id)
                obtenerProyectos()
            } catch (error) {
                console.error("Error al eliminar proyecto:", error)
                setError("Error al eliminar proyecto")
            }
        }
    }

    function editarProyecto(proyecto) {
        setNombreProyecto(proyecto.nombreProyecto || "")
        setUsuariosProyecto(proyecto.usuarios || [])
        setObjetivoProyecto(proyecto.objetivo || "")
        setImagenProyecto(proyecto.imagen || "")
        setDescripcionProyecto(proyecto.descripcion || "")
        setFechaInicioProyecto(proyecto.fechaInicio || "")
        setFechaFinProyecto(proyecto.fechaFin || "")
        setActivoProyecto(proyecto.activo ? "activo" : "inactivo")
        setCurrentProyectoId(proyecto.id)
        setEditMode(true)
    }

    function limpiarFormulario() {
        setNombreProyecto("")
        setUsuariosProyecto([])
        setObjetivoProyecto("")
        setImagenProyecto("")
        setDescripcionProyecto("")
        setFechaInicioProyecto("")
        setFechaFinProyecto("")
        setActivoProyecto("")
        setEditMode(false)
        setCurrentProyectoId(null)
        setError(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        
        if (!nombreProyecto || !objetivoProyecto || !fechaInicioProyecto || !fechaFinProyecto || !activoProyecto) {
            setError('Por favor, complete todos los campos obligatorios.')
            setIsLoading(false)
            return
        }

        if (new Date(fechaFinProyecto) < new Date(fechaInicioProyecto)) {
            setError('La fecha de fin no puede ser anterior a la fecha de inicio.')
            setIsLoading(false)
            return
        }
        
        if (editMode) {
            actualizarProyecto()
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
                <h2>{editMode ? 'EDITAR PROYECTO' : 'PROYECTOS'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        value={nombreProyecto}
                        onChange={(e) => setNombreProyecto(e.target.value)} 
                        className='input' 
                        type="text" 
                        name="nombreProyecto" 
                        placeholder="Nombre del Proyecto" 
                        required
                    />
                    <br />

                    <select 
                        className='input' 
                        name="usuarios" 
                        value={usuariosProyecto}
                        onChange={handleUsuarioChange}
                        multiple
                        size="5"
                        style={{height: '120px'}}
                    >
                        <option value="" disabled>Seleccionar Usuarios (Ctrl+Click para múltiples)</option>
                        {usuarios && usuarios.length > 0 && usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.name || usuario.username || usuario.nombre}
                            </option>
                        ))}
                    </select>
                    <br />

                    <textarea 
                        value={objetivoProyecto}
                        onChange={(e) => setObjetivoProyecto(e.target.value)} 
                        className='input' 
                        name="objetivo" 
                        placeholder="Objetivo del Proyecto" 
                        rows="4"
                        required
                    />
                    <br />

                    <input 
                        type="file" 
                        accept="image/*" 
                        className='user-image' 
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                    <br />

                    <textarea 
                        value={descripcionProyecto}
                        onChange={(e) => setDescripcionProyecto(e.target.value)} 
                        className='input' 
                        name="descripcion" 
                        placeholder="Descripción del Proyecto" 
                        rows="4"
                    />
                    <br />

                    <label>Fecha de Inicio:</label>
                    <input 
                        className='input' 
                        type="date" 
                        name="fechaInicio" 
                        value={fechaInicioProyecto}
                        onChange={(e) => setFechaInicioProyecto(e.target.value)} 
                        required 
                    />
                    <br />

                    <label>Fecha de Fin:</label>
                    <input 
                        className='input' 
                        type="date" 
                        name="fechaFin" 
                        value={fechaFinProyecto}
                        onChange={(e) => setFechaFinProyecto(e.target.value)} 
                        required 
                    />
                    <br />

                    <select 
                        className='input' 
                        value={activoProyecto} 
                        onChange={(e) => setActivoProyecto(e.target.value)}
                        required
                    >
                        <option value="">Estado del Proyecto</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                    </select>
                    <br />

                    <button type="submit" disabled={isLoading}>
                        {editMode ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                    </button>

                    {editMode && (
                        <button
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
                <h3>Lista de Proyectos</h3>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuarios</th>
                            <th>Objetivo</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos && proyectos.length > 0 && proyectos.map((proyecto) => (
                            <tr key={`proyecto-${proyecto.id}`}>
                                <td>{proyecto.nombreProyecto}</td>
                                <td>{obtenerNombresUsuarios(proyecto.usuarios)}</td>
                                <td>{proyecto.objetivo?.substring(0, 50)}...</td>
                                <td>{proyecto.fechaInicio}</td>
                                <td>{proyecto.fechaFin}</td>
                                <td>{proyecto.activo ? "Activo" : "Inactivo"}</td>
                                <td>
                                    <button onClick={() => editarProyecto(proyecto)}>
                                        Editar
                                    </button>
                                    <button onClick={() => eliminarProyecto(proyecto.id)}>
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

export default Proyectos