import React, { useEffect } from 'react'
import Llamados from '../services/Llamados'

function MantStaff() {
    const [nombreCompleto, setNombreCompleto] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [cargo, setCargo] = React.useState('')
    const [activo, setActivo] = React.useState(true)
    const [departamento, setDepartamento] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [staff, setStaff] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)
    const [currentStaffId, setCurrentStaffId] = React.useState(null)
    const [showPassword, setShowPassword] = React.useState(false)

    function handleNombreCompleto(e) {
        setNombreCompleto(e.target.value)
    }   
    function handleEmail(e) {
        setEmail(e.target.value)
    }
    function handleCargo(e) {
        setCargo(e.target.value)
    }
    function handleActivo(e) {
        setActivo(e.target.checked)
    }
    function handleDepartamento(e) {
        setDepartamento(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    useEffect(() => {
        obtenerStaff()
    }, [])

    async function obtenerStaff() {
        try {
            const response = await Llamados.getData('api/staff/')
            console.log("Staff obtenido:", response)
            setStaff(response.data || response) // Adaptar según la estructura de respuesta
        } catch (error) {
            console.error("Error obteniendo staff:", error)
        }
    }

    async function crearStaff() {
        try {
            const obj = {
                nombreCompleto: nombreCompleto,
                email: email,
                cargo: cargo,
                activo: activo,
                departamento: departamento,
                password: password
            }
            
            const response = await Llamados.postData(obj, 'api/staff/')
            console.log('Response Data', response)
            limpiarFormulario()
            obtenerStaff() // Refresh the list
        } catch (error) {
            console.error("Error al crear staff:", error)
        }
    }

    async function actualizarStaff() {
        try {
            const staffActualizado = {
                nombreCompleto: nombreCompleto,
                email: email,
                cargo: cargo,
                activo: activo,
                departamento: departamento,
                password: password
            }
            
            await Llamados.patchData(staffActualizado, `api/staff/${currentStaffId}/`)
            limpiarFormulario()
            setEditMode(false)
            setCurrentStaffId(null)
            obtenerStaff() // Refresh the list
        } catch (error) {
            console.error("Error al actualizar staff:", error)
        }
    }

    async function eliminarStaff(id) {
        if (window.confirm("¿Está seguro que desea eliminar este miembro del staff?")) {
            try {
                await Llamados.deleteData("api/staff/",id)
                obtenerStaff() // Refresh the list
            } catch (error) {
                console.error("Error al eliminar staff:", error)
            }
        }
    }

    function editarStaff(staff) {
        setNombreCompleto(staff.nombreCompleto)
        setEmail(staff.email)
        setCargo(staff.cargo)
        setActivo(staff.activo)
        setDepartamento(staff.departamento)
        setPassword(staff.password || '') // Mostrar la contraseña actual
        setCurrentStaffId(staff.id)
        setEditMode(true)
    }
    
    // Reset form fields
    function limpiarFormulario() {
        setNombreCompleto('')
        setEmail('')
        setCargo('')
        setActivo(true)
        setDepartamento('')
        setPassword('')
        setEditMode(false)
        setCurrentStaffId(null)
        setShowPassword(false)
    }
    
    // Handle form submission based on mode
    function handleSubmit() {
        if (editMode) {
            actualizarStaff()
        } else {
            crearStaff()
        }
    }

    return (
        <div>
            <h2>{editMode ? 'Editar Staff' : 'Crear Staff'}</h2>
            <div className="formulario">
                <div className="campo">
                    <label htmlFor="nombreCompleto">Nombre Completo</label>
                    <input
                        id="nombreCompleto"
                        type="text"
                        value={nombreCompleto}
                        onChange={handleNombreCompleto}
                        placeholder="Nombre Completo"
                        maxLength={150}
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
                    <label htmlFor="cargo">Cargo</label>
                    <input
                        id="cargo"
                        type="text"
                        value={cargo}
                        onChange={handleCargo}
                        placeholder="Cargo"
                        maxLength={30}
                    />
                </div>
                
                <div className="campo">
                    <label htmlFor="departamento">Departamento</label>
                    <input
                        id="departamento"
                        type="text"
                        value={departamento}
                        onChange={handleDepartamento}
                        placeholder="Departamento"
                        maxLength={30}
                    />
                </div>
                
                <div className="campo">
                    <label htmlFor="activo">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={activo}
                            onChange={handleActivo}
                        />
                        Staff Activo
                    </label>
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
                        {editMode ? 'Actualizar' : 'Crear'} Staff
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
            
            <h2>Lista de Staff</h2>
            <table className="tabla-staff">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Departamento</th>
                        <th>Estado</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map(miembro => (
                        <tr key={miembro.id}>
                            <td>{miembro.nombreCompleto}</td>
                            <td>{miembro.email}</td>
                            <td>{miembro.cargo}</td>
                            <td>{miembro.departamento}</td>
                            <td>
                                <span 
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: miembro.activo ? 'green' : 'red',
                                        backgroundColor: miembro.activo ? '#e8f5e8' : '#ffeaea'
                                    }}
                                >
                                    {miembro.activo ? 'ACTIVO' : 'INACTIVO'}
                                </span>
                            </td>
                            <td>
                                <span style={{ fontFamily: 'monospace' }}>
                                    {'•'.repeat(miembro.password?.length || 8)}
                                </span>
                            </td>
                            <td>
                                <button 
                                    onClick={() => editarStaff(miembro)}
                                    className="btn-edit"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => eliminarStaff(miembro.id)}
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

export default MantStaff