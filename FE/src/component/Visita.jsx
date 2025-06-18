import React, { useState, useEffect, useRef } from 'react'
import Llamados from '../services/Llamados'
import "../style/ExpeInput.css"
import uploadImageToS3 from './Credenciales'
import Navbar from './navbar'

function Visita() {
    // Estados para información básica
    const [expedientes, setExpedientes] = useState([])
    const [expedienteSeleccionado, setExpedienteSeleccionado] = useState("")
    const [nombreCompleto, setNombreCompleto] = useState("")
    const [rol, setRol] = useState("")
    
    // Estados para Notas
    const [institucion, setInstitucion] = useState("")
    const [anoAcademico, setAnoAcademico] = useState("")
    const [adecuacion, setAdecuacion] = useState("")
    const [tipoAdecuacion, setTipoAdecuacion] = useState("")
    const [beca, setBeca] = useState("")
    const [montoBeca, setMontoBeca] = useState(0)
    const [institucionBeca, setInstitucionBeca] = useState("")
    const [comentario, setComentario] = useState("")
    const [adjuntoNotas, setAdjuntoNotas] = useState("")
    
    // Estados para Datos Personales
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [edad, setEdad] = useState("")
    const [cedula, setCedula] = useState("")
    const [telefono1, setTelefono1] = useState("")
    const [telefono2, setTelefono2] = useState("")
    const [lugarResidencia, setLugarResidencia] = useState("")
    
    // Estados para Datos Técnicos
    const [lesiones, setLesiones] = useState("")
    const [enfermedades, setEnfermedades] = useState("")
    const [tratamientos, setTratamientos] = useState("")
    const [atencionMedica, setAtencionMedica] = useState("")
    const [drogas, setDrogas] = useState("")
    const [disponibilidad, setDisponibilidad] = useState("")
    
    // Estados para Vivienda
    const [casa, setCasa] = useState("")
    const [montoCasa, setMontoCasa] = useState(0)
    const [especificaciones, setEspecificaciones] = useState("")
    const [comentario4, setComentario4] = useState("")
    
    // Estados para Trabajo
    const [trabaja, setTrabaja] = useState("")
    const [empresa, setEmpresa] = useState("")
    const [salario, setSalario] = useState(0)
    const [comentario5, setComentario5] = useState("")
    
    // Estados para Familia
    const [nombreFamiliar, setNombreFamiliar] = useState("")
    const [edadFamiliar, setEdadFamiliar] = useState("")
    const [parentesco, setParentesco] = useState("")
    const [ocupacion, setOcupacion] = useState("")
    const [ingresoMensual, setIngresoMensual] = useState(0)
    const [lugarTrabajo, setLugarTrabajo] = useState("")
    
    // Estados para Ingresos y Gastos
    const [ingresos, setIngresos] = useState(0)
    const [salario2, setSalario2] = useState(0)
    const [pension, setPension] = useState(0)
    const [beca2, setBeca2] = useState(0)
    const [gastos, setGastos] = useState(0)
    const [comida, setComida] = useState(0)
    const [agua, setAgua] = useState(0)
    const [luz, setLuz] = useState(0)
    const [internetCable, setInternetCable] = useState(0)
    const [celular, setCelular] = useState(0)
    const [viaticos, setViaticos] = useState(0)
    const [salud, setSalud] = useState(0)
    const [deudas, setDeudas] = useState(0)
    
    // Estados de control
    const [visitas, setVisitas] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentVisitaId, setCurrentVisitaId] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const fileInputRef = useRef(null)

    useEffect(() => {
        obtenerExpedientes()
        obtenerVisitas()
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

    async function obtenerVisitas() {
        try {
            const response = await Llamados.getData('api/visitas/')
            console.log("Visitas obtenidas:", response)
            setVisitas(response.data || response)
        } catch (error) {
            console.error("Error obteniendo visitas:", error)
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (file) {
            try {
                const result = await uploadImageToS3(file)
                setAdjuntoNotas(result.Location)
            } catch (error) {
                console.error('Error al subir archivo:', error)
                setError('No se pudo subir el archivo')
            }
        }
    }

    async function crearVisita() {
        try {
            const objVisita = {
                expediente: expedienteSeleccionado,
                nombreCompleto: nombreCompleto,
                rol: rol,
                // Notas
                institucion: institucion,
                anoAcademico: anoAcademico,
                adecuacion: adecuacion,
                tipoAdecuacion: tipoAdecuacion,
                beca: beca,
                montoBeca: parseInt(montoBeca) || 0,
                institucionBeca: institucionBeca,
                comentario: comentario,
                adjuntoNotas: adjuntoNotas,
                // Datos Personales
                fechaNacimiento: fechaNacimiento,
                edad: edad,
                cedula: cedula,
                telefono1: telefono1,
                telefono2: telefono2,
                lugarResidencia: lugarResidencia,
                // Datos Técnicos
                lesiones: lesiones,
                enfermedades: enfermedades,
                tratamientos: tratamientos,
                atencionMedica: atencionMedica,
                drogas: drogas,
                disponibilidad: disponibilidad,
                // Vivienda
                casa: casa,
                montoCasa: parseInt(montoCasa) || 0,
                especificaciones: especificaciones,
                comentario4: comentario4,
                // Trabajo
                trabaja: trabaja,
                empresa: empresa,
                salario: parseInt(salario) || 0,
                comentario5: comentario5,
                // Familia
                nombreFamiliar: nombreFamiliar,
                edadFamiliar: edadFamiliar,
                parentesco: parentesco,
                ocupacion: ocupacion,
                ingresoMensual: parseInt(ingresoMensual) || 0,
                lugarTrabajo: lugarTrabajo,
                // Ingresos y Gastos
                ingresos: parseInt(ingresos) || 0,
                salario2: parseInt(salario2) || 0,
                pension: parseInt(pension) || 0,
                beca2: parseInt(beca2) || 0,
                gastos: parseInt(gastos) || 0,
                comida: parseInt(comida) || 0,
                agua: parseInt(agua) || 0,
                luz: parseInt(luz) || 0,
                internetCable: parseInt(internetCable) || 0,
                celular: parseInt(celular) || 0,
                viaticos: parseInt(viaticos) || 0,
                salud: parseInt(salud) || 0,
                deudas: parseInt(deudas) || 0
            }
            
            console.log('Objeto visita a enviar:', objVisita)
            await Llamados.postData(objVisita, 'api/visitas/')
            
            limpiarFormulario()
            obtenerVisitas()
            
        } catch (error) {
            console.error("Error al crear visita:", error)
            setError("Error al crear la visita")
        }
    }

    async function actualizarVisita() {
        try {
            const objVisita = {
                expediente: expedienteSeleccionado,
                nombreCompleto: nombreCompleto,
                rol: rol,
                // Notas
                institucion: institucion,
                anoAcademico: anoAcademico,
                adecuacion: adecuacion,
                tipoAdecuacion: tipoAdecuacion,
                beca: beca,
                montoBeca: parseInt(montoBeca) || 0,
                institucionBeca: institucionBeca,
                comentario: comentario,
                adjuntoNotas: adjuntoNotas,
                // Datos Personales
                fechaNacimiento: fechaNacimiento,
                edad: edad,
                cedula: cedula,
                telefono1: telefono1,
                telefono2: telefono2,
                lugarResidencia: lugarResidencia,
                // Datos Técnicos
                lesiones: lesiones,
                enfermedades: enfermedades,
                tratamientos: tratamientos,
                atencionMedica: atencionMedica,
                drogas: drogas,
                disponibilidad: disponibilidad,
                // Vivienda
                casa: casa,
                montoCasa: parseInt(montoCasa) || 0,
                especificaciones: especificaciones,
                comentario4: comentario4,
                // Trabajo
                trabaja: trabaja,
                empresa: empresa,
                salario: parseInt(salario) || 0,
                comentario5: comentario5,
                // Familia
                nombreFamiliar: nombreFamiliar,
                edadFamiliar: edadFamiliar,
                parentesco: parentesco,
                ocupacion: ocupacion,
                ingresoMensual: parseInt(ingresoMensual) || 0,
                lugarTrabajo: lugarTrabajo,
                // Ingresos y Gastos
                ingresos: parseInt(ingresos) || 0,
                salario2: parseInt(salario2) || 0,
                pension: parseInt(pension) || 0,
                beca2: parseInt(beca2) || 0,
                gastos: parseInt(gastos) || 0,
                comida: parseInt(comida) || 0,
                agua: parseInt(agua) || 0,
                luz: parseInt(luz) || 0,
                internetCable: parseInt(internetCable) || 0,
                celular: parseInt(celular) || 0,
                viaticos: parseInt(viaticos) || 0,
                salud: parseInt(salud) || 0,
                deudas: parseInt(deudas) || 0
            }
            
            await Llamados.patchData(objVisita, "api/visitas", currentVisitaId)
            
            limpiarFormulario()
            setEditMode(false)
            setCurrentVisitaId(null)
            obtenerVisitas()
            
        } catch (error) {
            console.error("Error al actualizar visita:", error)
            setError("Error al actualizar la visita")
        }
    }

    async function eliminarVisita(id) {
        if (window.confirm("¿Está seguro que desea eliminar esta visita?")) {
            try {
                await Llamados.deleteData("api/visitas", id)
                obtenerVisitas()
            } catch (error) {
                console.error("Error al eliminar visita:", error)
                setError("Error al eliminar visita")
            }
        }
    }

    function editarVisita(visita) {
        // Cargar datos básicos
        setExpedienteSeleccionado(visita.expediente || "")
        setNombreCompleto(visita.nombreCompleto || "")
        setRol(visita.rol || "")
        
        // Cargar Notas
        setInstitucion(visita.institucion || "")
        setAnoAcademico(visita.anoAcademico || "")
        setAdecuacion(visita.adecuacion || "")
        setTipoAdecuacion(visita.tipoAdecuacion || "")
        setBeca(visita.beca || "")
        setMontoBeca(visita.montoBeca || 0)
        setInstitucionBeca(visita.institucionBeca || "")
        setComentario(visita.comentario || "")
        setAdjuntoNotas(visita.adjuntoNotas || "")
        
        // Cargar Datos Personales
        setFechaNacimiento(visita.fechaNacimiento || "")
        setEdad(visita.edad || "")
        setCedula(visita.cedula || "")
        setTelefono1(visita.telefono1 || "")
        setTelefono2(visita.telefono2 || "")
        setLugarResidencia(visita.lugarResidencia || "")
        
        // Cargar Datos Técnicos
        setLesiones(visita.lesiones || "")
        setEnfermedades(visita.enfermedades || "")
        setTratamientos(visita.tratamientos || "")
        setAtencionMedica(visita.atencionMedica || "")
        setDrogas(visita.drogas || "")
        setDisponibilidad(visita.disponibilidad || "")
        
        // Cargar Vivienda
        setCasa(visita.casa || "")
        setMontoCasa(visita.montoCasa || 0)
        setEspecificaciones(visita.especificaciones || "")
        setComentario4(visita.comentario4 || "")
        
        // Cargar Trabajo
        setTrabaja(visita.trabaja || "")
        setEmpresa(visita.empresa || "")
        setSalario(visita.salario || 0)
        setComentario5(visita.comentario5 || "")
        
        // Cargar Familia
        setNombreFamiliar(visita.nombreFamiliar || "")
        setEdadFamiliar(visita.edadFamiliar || "")
        setParentesco(visita.parentesco || "")
        setOcupacion(visita.ocupacion || "")
        setIngresoMensual(visita.ingresoMensual || 0)
        setLugarTrabajo(visita.lugarTrabajo || "")
        
        // Cargar Ingresos y Gastos
        setIngresos(visita.ingresos || 0)
        setSalario2(visita.salario2 || 0)
        setPension(visita.pension || 0)
        setBeca2(visita.beca2 || 0)
        setGastos(visita.gastos || 0)
        setComida(visita.comida || 0)
        setAgua(visita.agua || 0)
        setLuz(visita.luz || 0)
        setInternetCable(visita.internetCable || 0)
        setCelular(visita.celular || 0)
        setViaticos(visita.viaticos || 0)
        setSalud(visita.salud || 0)
        setDeudas(visita.deudas || 0)
        
        setCurrentVisitaId(visita.id)
        setEditMode(true)
    }

    function limpiarFormulario() {
        // Limpiar datos básicos
        setExpedienteSeleccionado("")
        setNombreCompleto("")
        setRol("")
        
        // Limpiar Notas
        setInstitucion("")
        setAnoAcademico("")
        setAdecuacion("")
        setTipoAdecuacion("")
        setBeca("")
        setMontoBeca(0)
        setInstitucionBeca("")
        setComentario("")
        setAdjuntoNotas("")
        
        // Limpiar Datos Personales
        setFechaNacimiento("")
        setEdad("")
        setCedula("")
        setTelefono1("")
        setTelefono2("")
        setLugarResidencia("")
        
        // Limpiar Datos Técnicos
        setLesiones("")
        setEnfermedades("")
        setTratamientos("")
        setAtencionMedica("")
        setDrogas("")
        setDisponibilidad("")
        
        // Limpiar Vivienda
        setCasa("")
        setMontoCasa(0)
        setEspecificaciones("")
        setComentario4("")
        
        // Limpiar Trabajo
        setTrabaja("")
        setEmpresa("")
        setSalario(0)
        setComentario5("")
        
        // Limpiar Familia
        setNombreFamiliar("")
        setEdadFamiliar("")
        setParentesco("")
        setOcupacion("")
        setIngresoMensual(0)
        setLugarTrabajo("")
        
        // Limpiar Ingresos y Gastos
        setIngresos(0)
        setSalario2(0)
        setPension(0)
        setBeca2(0)
        setGastos(0)
        setComida(0)
        setAgua(0)
        setLuz(0)
        setInternetCable(0)
        setCelular(0)
        setViaticos(0)
        setSalud(0)
        setDeudas(0)
        
        setEditMode(false)
        setCurrentVisitaId(null)
        setError(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        
        // Validaciones básicas
        if (!expedienteSeleccionado || !nombreCompleto || !fechaNacimiento || !cedula || !telefono1) {
            setError('Por favor, complete todos los campos obligatorios.')
            setIsLoading(false)
            return
        }
        
        if (editMode) {
            actualizarVisita()
        } else {
            crearVisita()
        }
        setIsLoading(false)
    }

    function obtenerNombreExpediente(expedienteId) {
        const expediente = expedientes.find(exp => exp.id === expedienteId)
        return expediente ? expediente.user?.username || expediente.user?.name || 'Usuario no encontrado' : 'Expediente no encontrado'
    }

    return (
        <div className='fondo'>
            <Navbar/>
            <div className='barra'>
                <header className='Endurance'>ENDURANCE</header>
            </div>
            
            <div className="registro-container">
                <h2>{editMode ? 'EDITAR VISITA' : 'NUEVA VISITA'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Información Básica */}
                    <div className="seccion">
                        <h3>Información Básica</h3>
                        <select 
                            className='input' 
                            value={expedienteSeleccionado}
                            onChange={(e) => setExpedienteSeleccionado(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar Expediente</option>
                            {expedientes && expedientes.map((expediente) => (
                                <option key={expediente.id} value={expediente.id}>
                                    {expediente.user?.username || expediente.user?.name || `ID: ${expediente.id}`}
                                </option>
                            ))}
                        </select>

                        <input 
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Nombre Completo" 
                            required
                        />

                        <input 
                            value={rol}
                            onChange={(e) => setRol(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Rol" 
                        />
                    </div>

                    {/* Notas Académicas */}
                    <div className="seccion">
                        <h3>Información Académica</h3>
                        <input 
                            value={institucion}
                            onChange={(e) => setInstitucion(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Institución" 
                        />

                        <input 
                            value={anoAcademico}
                            onChange={(e) => setAnoAcademico(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Año Académico" 
                        />

                        <input 
                            value={adecuacion}
                            onChange={(e) => setAdecuacion(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Adecuación" 
                        />

                        <input 
                            value={tipoAdecuacion}
                            onChange={(e) => setTipoAdecuacion(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Tipo de Adecuación" 
                        />

                        <select 
                            className='input' 
                            value={beca}
                            onChange={(e) => setBeca(e.target.value)}
                        >
                            <option value="">¿Tiene beca?</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>

                        <input 
                            value={montoBeca}
                            onChange={(e) => setMontoBeca(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Monto de la Beca" 
                        />

                        <input 
                            value={institucionBeca}
                            onChange={(e) => setInstitucionBeca(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Institución que otorga la Beca" 
                        />

                        <textarea 
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)} 
                            className='input' 
                            placeholder="Comentarios Académicos" 
                            rows="3"
                        />

                        <div className="campo">
                            <label htmlFor="adjunto">Adjunto de Notas</label>
                            <input
                                id="adjunto"
                                type="file"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                            {adjuntoNotas && (
                                <div style={{marginTop: '10px'}}>
                                    <a href={adjuntoNotas} target="_blank" rel="noopener noreferrer">
                                        Ver archivo adjunto
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Datos Personales */}
                    <div className="seccion">
                        <h3>Datos Personales</h3>
                        <label>Fecha de Nacimiento:</label>
                        <input 
                            className='input' 
                            type="date" 
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)} 
                            required 
                        />

                        <input 
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Edad" 
                        />

                        <input 
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Cédula" 
                            required
                        />

                        <input 
                            value={telefono1}
                            onChange={(e) => setTelefono1(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Teléfono Principal" 
                            required
                        />

                        <input 
                            value={telefono2}
                            onChange={(e) => setTelefono2(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Teléfono Secundario" 
                        />

                        <textarea 
                            value={lugarResidencia}
                            onChange={(e) => setLugarResidencia(e.target.value)} 
                            className='input' 
                            placeholder="Lugar de Residencia" 
                            rows="2"
                        />
                    </div>

                    {/* Datos Técnicos/Médicos */}
                    <div className="seccion">
                        <h3>Información Médica</h3>
                        <textarea 
                            value={lesiones}
                            onChange={(e) => setLesiones(e.target.value)} 
                            className='input' 
                            placeholder="Lesiones" 
                            rows="2"
                        />

                        <textarea 
                            value={enfermedades}
                            onChange={(e) => setEnfermedades(e.target.value)} 
                            className='input' 
                            placeholder="Enfermedades" 
                            rows="2"
                        />

                        <textarea 
                            value={tratamientos}
                            onChange={(e) => setTratamientos(e.target.value)} 
                            className='input' 
                            placeholder="Tratamientos" 
                            rows="2"
                        />

                        <textarea 
                            value={atencionMedica}
                            onChange={(e) => setAtencionMedica(e.target.value)} 
                            className='input' 
                            placeholder="Atención Médica" 
                            rows="2"
                        />

                        <textarea 
                            value={drogas}
                            onChange={(e) => setDrogas(e.target.value)} 
                            className='input' 
                            placeholder="Uso de Drogas/Medicamentos" 
                            rows="2"
                        />

                        <textarea 
                            value={disponibilidad}
                            onChange={(e) => setDisponibilidad(e.target.value)} 
                            className='input' 
                            placeholder="Disponibilidad" 
                            rows="2"
                        />
                    </div>

                    {/* Vivienda */}
                    <div className="seccion">
                        <h3>Información de Vivienda</h3>
                        <input 
                            value={casa}
                            onChange={(e) => setCasa(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Tipo de Casa" 
                        />

                        <input 
                            value={montoCasa}
                            onChange={(e) => setMontoCasa(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Monto de Casa/Alquiler" 
                        />

                        <textarea 
                            value={especificaciones}
                            onChange={(e) => setEspecificaciones(e.target.value)} 
                            className='input' 
                            placeholder="Especificaciones de la Vivienda" 
                            rows="3"
                        />

                        <textarea 
                            value={comentario4}
                            onChange={(e) => setComentario4(e.target.value)} 
                            className='input' 
                            placeholder="Comentarios sobre Vivienda" 
                            rows="2"
                        />
                    </div>

                    {/* Trabajo */}
                    <div className="seccion">
                        <h3>Información Laboral</h3>
                        <select 
                            className='input' 
                            value={trabaja}
                            onChange={(e) => setTrabaja(e.target.value)}
                        >
                            <option value="">¿Trabaja actualmente?</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>

                        <input 
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Empresa/Lugar de Trabajo" 
                        />

                        <input 
                            value={salario}
                            onChange={(e) => setSalario(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Salario" 
                        />

                        <textarea 
                            value={comentario5}
                            onChange={(e) => setComentario5(e.target.value)} 
                            className='input' 
                            placeholder="Comentarios sobre Trabajo" 
                            rows="2"
                        />
                    </div>

                    {/* Información Familiar */}
                    <div className="seccion">
                        <h3>Información Familiar</h3>
                        <input 
                            value={nombreFamiliar}
                            onChange={(e) => setNombreFamiliar(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Nombre del Familiar" 
                        />

                        <input 
                            value={edadFamiliar}
                            onChange={(e) => setEdadFamiliar(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Edad del Familiar" 
                        />

                        <input 
                            value={parentesco}
                            onChange={(e) => setParentesco(e.target.value)} 
                            className='input' 
                            type="text" 
                            placeholder="Parentesco" 
                        />

                        <textarea 
                            value={ocupacion}
                            onChange={(e) => setOcupacion(e.target.value)} 
                            className='input' 
                            placeholder="Ocupación del Familiar" 
                            rows="2"
                        />

                        <input 
                            value={ingresoMensual}
                            onChange={(e) => setIngresoMensual(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Ingreso Mensual del Familiar" 
                        />

                        <textarea 
                            value={lugarTrabajo}
                            onChange={(e) => setLugarTrabajo(e.target.value)} 
                            className='input' 
                            placeholder="Lugar de Trabajo del Familiar" 
                            rows="2"
                        />
                    </div>

                    {/* Ingresos y Gastos */}
                    <div className="seccion">
                        <h3>Ingresos Familiares</h3>
                        <input 
                            value={ingresos}
                            onChange={(e) => setIngresos(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Ingresos Totales" 
                        />

                        <input 
                            value={salario2}
                            onChange={(e) => setSalario2(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Salario Adicional" 
                        />

                        <input 
                            value={pension}
                            onChange={(e) => setPension(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Pensión" 
                        />

                        <input 
                            value={beca2}
                            onChange={(e) => setBeca2(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Beca (Ingreso)" 
                        />
                    </div>

                    <div className="seccion">
                        <h3>Gastos Familiares</h3>
                        <input 
                            value={gastos}
                            onChange={(e) => setGastos(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos Totales" 
                        />

                        <input 
                            value={comida}
                            onChange={(e) => setComida(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos en Comida" 
                        />

                        <input 
                            value={agua}
                            onChange={(e) => setAgua(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos en Agua" 
                        />

                        <input 
                            value={luz}
                            onChange={(e) => setLuz(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos en Electricidad" 
                        />

                        <input 
                            value={internetCable}
                            onChange={(e) => setInternetCable(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Internet y Cable" 
                        />

                        <input 
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos en Celular" 
                        />

                        <input 
                            value={viaticos}
                            onChange={(e) => setViaticos(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Viáticos" 
                        />

                        <input 
                            value={salud}
                            onChange={(e) => setSalud(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Gastos en Salud" 
                        />

                        <input 
                            value={deudas}
                            onChange={(e) => setDeudas(e.target.value)} 
                            className='input' 
                            type="number" 
                            placeholder="Deudas" 
                        />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {editMode ? 'Actualizar Visita' : 'Crear Visita'}
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

            {/* Lista de Visitas */}
            <div className="registro-container">
                <h3>Lista de Visitas</h3>
                <div style={{overflowX: 'auto'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse', minWidth: '1200px'}}>
                        <thead>
                            <tr>
                                <th>Expediente</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Institución</th>
                                <th>Fecha Nacimiento</th>
                                <th>Cédula</th>
                                <th>Teléfono</th>
                                <th>Fecha Visita</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitas && visitas.length > 0 && visitas.map((visita) => (
                                <tr key={`visita-${visita.id}`}>
                                    <td>{obtenerNombreExpediente(visita.expediente)}</td>
                                    <td>{visita.nombreCompleto}</td>
                                    <td>{visita.rol}</td>
                                    <td>{visita.institucion}</td>
                                    <td>{visita.fechaNacimiento}</td>
                                    <td>{visita.cedula}</td>
                                    <td>{visita.telefono1}</td>
                                    <td>{visita.fechaVisita ? new Date(visita.fechaVisita).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button onClick={() => editarVisita(visita)}>
                                            Editar
                                        </button>
                                        <button onClick={() => eliminarVisita(visita.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {visitas && visitas.length === 0 && (
                    <p>No hay visitas registradas.</p>
                )}
            </div>

            <style jsx>{`
                .seccion {
                    margin-bottom: 30px;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }
                
                .seccion h3 {
                    margin-top: 0;
                    margin-bottom: 15px;
                    color: #333;
                    border-bottom: 2px solid #4CAF50;
                    padding-bottom: 5px;
                }
                
                .campo {
                    margin-bottom: 15px;
                }
                
                .campo label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }
                
                table {
                    border: 1px solid #ddd;
                }
                
                th, td {
                    padding: 8px 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                }
                
                th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                
                tr:hover {
                    background-color: #f5f5f5;
                }
                
                .error {
                    color: red;
                    margin-top: 10px;
                    padding: 10px;
                    background-color: #ffebee;
                    border: 1px solid #f44336;
                    border-radius: 4px;
                }
                
                .spinner {
                    display: inline-block;
                    position: relative;
                    width: 64px;
                    height: 64px;
                    margin: 20px;
                }
                
                .spinner span {
                    position: absolute;
                    top: 27px;
                    left: 27px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #4CAF50;
                    animation: spinner 1.2s linear infinite;
                }
                
                .spinner span:nth-child(1) { animation-delay: 0s; }
                .spinner span:nth-child(2) { animation-delay: -0.1s; }
                .spinner span:nth-child(3) { animation-delay: -0.2s; }
                .spinner span:nth-child(4) { animation-delay: -0.3s; }
                .spinner span:nth-child(5) { animation-delay: -0.4s; }
                .spinner span:nth-child(6) { animation-delay: -0.5s; }
                
                @keyframes spinner {
                    0%, 20%, 80%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.5);
                    }
                }
                
                button {
                    margin: 5px;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                
                button[type="submit"] {
                    background-color: #4CAF50;
                    color: white;
                }
                
                button[type="button"] {
                    background-color: #f44336;
                    color: white;
                }
                
                button:hover {
                    opacity: 0.8;
                }
                
                button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    )
}

export default Visita