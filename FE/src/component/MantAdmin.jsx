import React, { useEffect } from 'react'
import Llamados from '../services/Llamados'
import Navbar from './navbar'

function MantAdmin() {
  const [nombreCompleto, setNombreCompleto] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [user, setUser] = React.useState('') // Cambiado de password a user

  const [administradores, setAdministradores] = React.useState([])
  const [usuarios, setUsuarios] = React.useState([]) // Para cargar los usuarios disponibles
  const [editMode, setEditMode] = React.useState(false)
  const [currentAdminId, setCurrentAdminId] = React.useState(null)

  function handleNombreCompleto(e) {
    setNombreCompleto(e.target.value)
  }   
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handleUser(e) {
    setUser(e.target.value)
  }

  useEffect(() => {
    obtenerAdministradores()
    obtenerUsuarios() // Cargar usuarios para el select
  }, [])

  async function obtenerAdministradores() {
    try {
        const response = await Llamados.getData('api/admin/')
        console.log("Administradores obtenidos:", response)
        setAdministradores(response.data || response)
    } catch (error) {
        console.error("Error obteniendo administradores:", error)
    }
  }

  async function obtenerUsuarios() {
    try {
        const response = await Llamados.getData('api/users/') // Ajusta la URL según tu API
        console.log("Usuarios obtenidos:", response)
        setUsuarios(response.data || response)
    } catch (error) {
        console.error("Error obteniendo usuarios:", error)
    }
  }

  async function cargarDatos() {
    try {
      const obj = {
        nombreCompleto: nombreCompleto,
        email: email,
        user: user
      }
        
      const response = await Llamados.postData(obj, 'api/admin/')
      console.log('Response Data', response)
      limpiarFormulario()
      obtenerAdministradores()
    } catch (error) {
      console.error("Error al crear administrador:", error)
    }
  }

  async function actualizarAdministrador() {
    try {
      const administradorActualizado = {
        nombreCompleto: nombreCompleto,
        email: email,
        user: user
      }
        
      await Llamados.patchData(administradorActualizado, "api/admin/", currentAdminId)
      limpiarFormulario()
      setEditMode(false)
      setCurrentAdminId(null)
      obtenerAdministradores()
    } catch (error) {
      console.error("Error al actualizar administrador:", error)
    }
  }

  async function eliminarAdministrador(id) {
    if (window.confirm("¿Está seguro que desea eliminar este administrador?")) {
      try {
        await Llamados.deleteData("api/admin", id)
        obtenerAdministradores()
      } catch (error) {
        console.error("Error al eliminar administrador:", error)
      }
    }
  }

  function editarAdministrador(administrador) {
    setNombreCompleto(administrador.nombreCompleto)
    setEmail(administrador.email)
    setUser(administrador.user) // Usar el ID del usuario
    setCurrentAdminId(administrador.id)
    setEditMode(true)
  }
    
  function limpiarFormulario() {
    setNombreCompleto('')
    setEmail('')
    setUser('')
    setEditMode(false)
    setCurrentAdminId(null)
  }
    
  function handleSubmit() {
    if (editMode) {
        actualizarAdministrador()
    } else {
        cargarDatos()
    }
  }

  // Función para obtener el username del usuario
  function getUsernameById(userId) {
    const usuario = usuarios.find(u => u.id === userId)
    return usuario ? usuario.username : 'Usuario no encontrado'
  }

  return (
    <div>
      <Navbar/>
      <h2>{editMode ? 'Editar Administrador' : 'Crear Administrador'}</h2>
      <div className="formulario">
          <div className="campo">
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <input
                  id="nombreCompleto"
                  type="text"
                  value={nombreCompleto}
                  onChange={handleNombreCompleto}
                  placeholder="Nombre Completo"
              />
          </div>
          
          <div className="campo">
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                  placeholder="Email"
              />
          </div>
          
          <div className="campo">
              <label htmlFor="user">Usuario</label>
              <select
                  id="user"
                  value={user}
                  onChange={handleUser}
              >
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map(usuario => (
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
                  {editMode ? 'Actualizar' : 'Crear'} Administrador
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
      
      <h2>Lista de Administradores</h2>
      <table className="tabla-administradores">
          <thead>
              <tr>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Usuario</th>
                  <th>Acciones</th>
              </tr>
          </thead>
        <tbody>
          {administradores.map(administrador => (
            <tr key={administrador.id}>
                <td>{administrador.nombreCompleto}</td>
                <td>{administrador.email}</td>
                <td>{getUsernameById(administrador.user)}</td>
              <td>
                <button 
                  onClick={() => editarAdministrador(administrador)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarAdministrador(administrador.id)}
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

export default MantAdmin