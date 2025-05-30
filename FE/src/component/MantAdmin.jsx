import React, { useEffect } from 'react'
import Llamados from '../services/Llamados'

function MantAdmin() {
  const [nombreCompleto, setNombreCompleto] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [administradores, setAdministradores] = React.useState([])
  const [editMode, setEditMode] = React.useState(false)
  const [currentAdminId, setCurrentAdminId] = React.useState(null)
  const [showPassword, setShowPassword] = React.useState(false)

  function handleNombreCompleto(e) {
    setNombreCompleto(e.target.value)
  }   
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }

  useEffect(() => {
    obtenerAdministradores()
  }, [])

  async function obtenerAdministradores() {
    try {
        const response = await Llamados.getData('api/admin/')
        console.log("Administradores obtenidos:", response)
        setAdministradores(response.data || response) // Adaptar según la estructura de respuesta
    } catch (error) {
        console.error("Error obteniendo administradores:", error)
    }
  }

  async function cargarDatos() {
    try {
      const obj = {
        nombreCompleto: nombreCompleto,
        email: email,
        password: password
      }
        
      const response = await Llamados.postData(obj, 'api/admin/')
      console.log('Response Data', response)
      limpiarFormulario()
      obtenerAdministradores() // Refresh the list
    } catch (error) {
      console.error("Error al crear administrador:", error)
    }
  }

  async function actualizarAdministrador() {
    try {
      const administradorActualizado = {
        nombreCompleto: nombreCompleto,
        email: email,
        password: password
      }
        
      await Llamados.putData(administradorActualizado, `api/admin/${currentAdminId}/`)
      limpiarFormulario()
      setEditMode(false)
      setCurrentAdminId(null)
      obtenerAdministradores() // Refresh the list
    } catch (error) {
      console.error("Error al actualizar administrador:", error)
    }
  }

  async function eliminarAdministrador(id) {
    if (window.confirm("¿Está seguro que desea eliminar este administrador?")) {
      try {
        await Llamados.deleteData("api/admin",id)
        obtenerAdministradores() // Refresh the list
      } catch (error) {
        console.error("Error al eliminar administrador:", error)
      }
    }
  }

  function editarAdministrador(administrador) {
    setNombreCompleto(administrador.nombreCompleto)
    setEmail(administrador.email)
    setPassword(administrador.password || '') // Mostrar la contraseña actual
    setCurrentAdminId(administrador.id)
    setEditMode(true)
  }
    
    // Reset form fields
  function limpiarFormulario() {
    setNombreCompleto('')
    setEmail('')
    setPassword('')
    setEditMode(false)
    setCurrentAdminId(null)
    setShowPassword(false)
  }
    
    // Handle form submission based on mode
  function handleSubmit() {
    if (editMode) {
        actualizarAdministrador()
    } else {
        cargarDatos()
    }
  }

  return (
    <div>
      
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
              <label htmlFor="password">Contraseña</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePassword}
                      placeholder="Contraseña"
                      style={{ paddingRight: '40px', flex: 1 }}
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                          position: 'absolute',
                          right: '10px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '14px'
                      }}
                  >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
              </div>
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
                  <th>Contraseña</th>
                  <th>Acciones</th>
              </tr>
          </thead>
        <tbody>
          {administradores.map(administrador => (
            <tr key={administrador.id}>
                <td>{administrador.nombreCompleto}</td>
                <td>{administrador.email}</td>
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