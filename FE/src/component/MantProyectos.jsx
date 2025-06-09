import React, { useEffect } from 'react'
import Llamados from '../services/Llamados'
import Navbar from './navbar'

function MantProyectos() {
  const [nombreProyecto, setNombreProyecto] = React.useState('')
  const [objetivo, setObjetivo] = React.useState('')
  const [fechaInicio, setFechaInicio] = React.useState('')
  const [fechaFin, setFechaFin] = React.useState('')
  const [usuarios, setUsuarios] = React.useState('')

  const [proyectos, setProyectos] = React.useState([])
  const [usuariosDisponibles, setUsuariosDisponibles] = React.useState([]) // Para cargar los usuarios disponibles
  const [editMode, setEditMode] = React.useState(false)
  const [currentProyectoId, setCurrentProyectoId] = React.useState(null)

  function handleNombreProyecto(e) {
    setNombreProyecto(e.target.value)
  }   
  function handleObjetivo(e) {
    setObjetivo(e.target.value)
  }
  function handleFechaInicio(e) {
    setFechaInicio(e.target.value)
  }
  function handleFechaFin(e) {
    setFechaFin(e.target.value)
  }

  useEffect(() => {
    obtenerProyectos()
    obtenerUsuarios() // Cargar usuarios para el select
  }, [])

  async function obtenerProyectos() {
    try {
        const response = await Llamados.getData('api/proyectos/')
        console.log("Proyectos obtenidos:", response)
        setProyectos(response.data || response)
    } catch (error) {
        console.error("Error obteniendo proyectos:", error)
    }
  }

  async function obtenerUsuarios() {
    try {
        const response = await Llamados.getData('api/users/') // Ajusta la URL según tu API
        console.log("Usuarios obtenidos:", response)
        setUsuariosDisponibles(response.data || response)
        console.log(response);
        
    } catch (error) {
        console.error("Error obteniendo usuarios:", error)
    }
  }

  async function cargarDatos() {
    try {
      const obj = {
        nombreProyecto: nombreProyecto,
        objetivo: objetivo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        usuarios: usuarios
      }
        
      console.log('Objeto a enviar:', obj) // Para debug
      const response = await Llamados.postData(obj, 'api/proyectos/')
      console.log('Response Data', response)
      limpiarFormulario()
      obtenerProyectos()
    } catch (error) {
      console.error("Error al crear proyecto:", error)
    }
  }

  async function actualizarProyecto() {
    try {
      const proyectoActualizado = {
        nombreProyecto: nombreProyecto,
        objetivo: objetivo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        usuarios: usuarios
      }
        
      console.log('Objeto a actualizar:', proyectoActualizado) // Para debug
      await Llamados.patchData(proyectoActualizado, "api/proyectos", currentProyectoId)
      limpiarFormulario()
      setEditMode(false)
      setCurrentProyectoId(null)
      obtenerProyectos()
    } catch (error) {
      console.error("Error al actualizar proyecto:", error)
    }
  }

  async function eliminarProyecto(currentProyectoId) {
    if (window.confirm("¿Está seguro que desea eliminar este proyecto?")) {
      try {
        await Llamados.deleteData("api/proyectos", currentProyectoId)
        obtenerProyectos()
      } catch (error) {
        console.error("Error al eliminar proyecto:", error)
      }
    }
  }

  function editarProyecto(proyecto) {
    setNombreProyecto(proyecto.nombreProyecto)
    setObjetivo(proyecto.objetivo)
    setFechaInicio(proyecto.fechaInicio)
    setFechaFin(proyecto.fechaFin)
    setUsuarios(proyecto.usuarios)
    setCurrentProyectoId(proyecto.id)
    setEditMode(true)
  }
    
  function limpiarFormulario() {
    setNombreProyecto('')
    setObjetivo('')
    setFechaInicio('')
    setFechaFin('')
    setUsuarios('')
    setEditMode(false)
    setCurrentProyectoId(null)
  }
    
  function handleSubmit() {
    if (editMode) {
        actualizarProyecto()
    } else {
        cargarDatos()
    }
  }

  // Función para obtener el username del usuario
  function getUsernameById(userId) {
    const usuario = usuariosDisponibles.find(u => u.id === userId)
    return usuario ? usuario.username : 'Usuario no encontrado'
  }

  return (
    <div>
      <Navbar/>
      <h2>{editMode ? 'Editar Proyecto' : 'Crear Proyecto'}</h2>
      <div className="formulario">
          <div className="campo">
              <label htmlFor="nombreProyecto">Nombre del Proyecto</label>
              <input
                  id="nombreProyecto"
                  type="text"
                  value={nombreProyecto}
                  onChange={handleNombreProyecto}
                  placeholder="Nombre del Proyecto"
              />
          </div>
          
          <div className="campo">
              <label htmlFor="objetivo">Objetivo</label>
              <textarea
                  id="objetivo"
                  value={objetivo}
                  onChange={handleObjetivo}
                  placeholder="Objetivo del proyecto"
                  rows="4"
              />
          </div>
          
          <div className="campo">
              <label htmlFor="fechaInicio">Fecha de Inicio</label>
              <input
                  id="fechaInicio"
                  type="date"
                  value={fechaInicio}
                  onChange={handleFechaInicio}
              />
          </div>
          
          <div className="campo">
              <label htmlFor="fechaFin">Fecha de Fin</label>
              <input
                  id="fechaFin"
                  type="date"
                  value={fechaFin}
                  onChange={handleFechaFin}
              />
          </div>
          
          <div className="campo">
              <label htmlFor="usuarios">Usuario Asignado</label>
              <select
                  id="usuarios"
                  value={usuarios}
                  onChange={(e)=>setUsuarios(e.target.value)}
              >
                  <option key="empty-option" value="">Seleccione un usuario</option>
                  {usuariosDisponibles && usuariosDisponibles.length > 0 && usuariosDisponibles.map((usuario, index) => (
                      <option key={usuario.id} value={usuario.id}>
                          {usuario.username}
                      </option>
                  ))}
              </select>
          </div>
          
          <div className="botones">
              <button 
                  onClick={handleSubmit}
                  className="btn-primary"
              >
                  {editMode ? 'Actualizar' : 'Crear'} Proyecto
              </button>
              
              {editMode && (
                  <button 
                      onClick={limpiarFormulario}
                      className="btn-secondary"
                  >
                      Cancelar
                  </button>
              )}
          </div>
      </div>
      
      <h2>Lista de Proyectos</h2>
      <table className="tabla-proyectos">
          <thead>
              <tr>
                  <th>Nombre del Proyecto</th>
                  <th>Objetivo</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Usuario Asignado</th>
                  <th>Acciones</th>
              </tr>
          </thead>
        <tbody>
          {proyectos && proyectos.length > 0 && proyectos.map((proyecto, index) => (
            <tr key={`proyecto-${proyecto.id}-${index}`}>
                <td>{proyecto.nombreProyecto}</td>
                <td>{proyecto.objetivo}</td>
                <td>{proyecto.fechaInicio}</td>
                <td>{proyecto.fechaFin}</td>
                <td>{getUsernameById(proyecto.usuarios)}</td>
              <td>
                <button 
                  onClick={() => editarProyecto(proyecto)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarProyecto(proyecto.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MantProyectos