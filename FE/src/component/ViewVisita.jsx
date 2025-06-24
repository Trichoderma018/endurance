import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Llamados from '../services/Llamados';
import uploadImageToS3 from './credenciales';
import '../style/ViewVisita.css';

function ViewVisita() {
    const [visita, setVisita] = useState(null);
    const [expediente, setExpediente] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Estados para edición
    const [formData, setFormData] = useState({});

    useEffect(() => {
        cargarVisita();
    }, []);

    const cargarVisita = async () => {
        const visitaId = localStorage.getItem('visitaId');
        
        if (!visitaId) {
            setError('No se encontró el ID de la visita');
            setIsLoading(false);
            return;
        }

        try {
            // Obtener datos de la visita
            const visitaData = await Llamados.getData(`api/visitas/${visitaId}/`);
            setVisita(visitaData);
            setFormData(visitaData);

            // Obtener datos del expediente asociado
            if (visitaData.expediente) {
                const expedienteData = await Llamados.getData(`api/expedientes/${visitaData.expediente}/`);
                setExpediente(expedienteData);
            }

        } catch (error) {
            console.error('Error cargando visita:', error);
            setError('Error al cargar la información de la visita');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVolver = () => {
        localStorage.removeItem('visitaId');
        navigate('/views');
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError(null);
        setSuccessMessage('');
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData(visita); // Restaurar datos originales
        setError(null);
        setSuccessMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await uploadImageToS3(file);
                setFormData(prev => ({
                    ...prev,
                    adjuntoNotas: result.Location
                }));
            } catch (error) {
                console.error('Error al subir archivo:', error);
                setError('No se pudo subir el archivo');
            }
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Preparar datos para envío
            const dataToSend = {
                ...formData,
                montoBeca: parseInt(formData.montoBeca) || 0,
                montoCasa: parseInt(formData.montoCasa) || 0,
                salario: parseInt(formData.salario) || 0,
                ingresoMensual: parseInt(formData.ingresoMensual) || 0,
                ingresos: parseInt(formData.ingresos) || 0,
                salario2: parseInt(formData.salario2) || 0,
                pension: parseInt(formData.pension) || 0,
                beca2: parseInt(formData.beca2) || 0,
                gastos: parseInt(formData.gastos) || 0,
                comida: parseInt(formData.comida) || 0,
                agua: parseInt(formData.agua) || 0,
                luz: parseInt(formData.luz) || 0,
                internetCable: parseInt(formData.internetCable) || 0,
                celular: parseInt(formData.celular) || 0,
                viaticos: parseInt(formData.viaticos) || 0,
                salud: parseInt(formData.salud) || 0,
                deudas: parseInt(formData.deudas) || 0
            };

            await Llamados.patchData(dataToSend, "api/visitas", visita.id);
            
            // Actualizar el estado local
            setVisita(formData);
            setIsEditing(false);
            setSuccessMessage('Visita actualizada correctamente');
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(''), 3000);

        } catch (error) {
            console.error("Error al actualizar visita:", error);
            setError("Error al actualizar la visita");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Está seguro que desea eliminar esta visita? Esta acción no se puede deshacer.")) {
            try {
                await Llamados.deleteData("api/visitas", visita.id);
                localStorage.removeItem('visitaId');
                navigate('/views');
            } catch (error) {
                console.error("Error al eliminar visita:", error);
                setError("Error al eliminar visita");
            }
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return 'No disponible';
        try {
            return new Date(fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Fecha no válida';
        }
    };

    if (isLoading) {
        return (
            <div className="view-visita-container">
                <div className="loading">Cargando información de la visita...</div>
            </div>
        );
    }

    if (error && !visita) {
        return (
            <div className="view-visita-container">
                <div className="error">{error}</div>
                <button onClick={handleVolver} className="btn-volver">Volver</button>
            </div>
        );
    }

    if (!visita) {
        return (
            <div className="view-visita-container">
                <div className="error">No se encontró la visita</div>
                <button onClick={handleVolver} className="btn-volver">Volver</button>
            </div>
        );
    }

    return (
        <div className="view-visita-master">
            <div className="view-visita-container">
                <div className="view-header">
                    <button onClick={handleVolver} className="btn-volver">← Volver</button>
                    <h1>Detalle de Visita #{visita.id}</h1>
                    <div className="header-actions">
                        {!isEditing ? (
                            <>
                                <button onClick={handleEdit} className="btn-editar">Editar</button>
                                <button onClick={handleDelete} className="btn-eliminar">Eliminar</button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={handleSave} 
                                    className="btn-guardar"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button onClick={handleCancelEdit} className="btn-cancelar">Cancelar</button>
                            </>
                        )}
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="visita-details">
                    {/* Información Básica */}
                    <div className="detail-section">
                        <h2>Información Básica</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Expediente:</label>
                                <span>{expediente?.user?.username || expediente?.user?.name || `ID: ${visita.expediente}`}</span>
                            </div>
                            <div className="detail-item">
                                <label>Nombre Completo:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.nombreCompleto || ''}
                                        onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.nombreCompleto || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Rol:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.rol || ''}
                                        onChange={(e) => handleInputChange('rol', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.rol || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Fecha de Visita:</label>
                                <span>{formatearFecha(visita.fechaVisita || visita.created_at)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Información Académica */}
                    <div className="detail-section">
                        <h2>Información Académica</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Institución:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.institucion || ''}
                                        onChange={(e) => handleInputChange('institucion', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.institucion || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Año Académico:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.anoAcademico || ''}
                                        onChange={(e) => handleInputChange('anoAcademico', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.anoAcademico || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Adecuación:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.adecuacion || ''}
                                        onChange={(e) => handleInputChange('adecuacion', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.adecuacion || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Tipo de Adecuación:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.tipoAdecuacion || ''}
                                        onChange={(e) => handleInputChange('tipoAdecuacion', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.tipoAdecuacion || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>¿Tiene beca?:</label>
                                {isEditing ? (
                                    <select
                                        value={formData.beca || ''}
                                        onChange={(e) => handleInputChange('beca', e.target.value)}
                                        className="edit-input"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                ) : (
                                    <span>{visita.beca === 'si' ? 'Sí' : visita.beca === 'no' ? 'No' : 'No especificado'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Monto de Beca:</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={formData.montoBeca || ''}
                                        onChange={(e) => handleInputChange('montoBeca', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.montoBeca ? `₡${visita.montoBeca.toLocaleString()}` : 'No disponible'}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="detail-item full-width">
                            <label>Institución que otorga la Beca:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.institucionBeca || ''}
                                    onChange={(e) => handleInputChange('institucionBeca', e.target.value)}
                                    className="edit-input"
                                />
                            ) : (
                                <span>{visita.institucionBeca || 'No disponible'}</span>
                            )}
                        </div>
                        
                        <div className="detail-item full-width">
                            <label>Comentarios Académicos:</label>
                            {isEditing ? (
                                <textarea
                                    value={formData.comentario || ''}
                                    onChange={(e) => handleInputChange('comentario', e.target.value)}
                                    className="edit-textarea"
                                    rows="3"
                                />
                            ) : (
                                <span>{visita.comentario || 'No disponible'}</span>
                            )}
                        </div>

                        {(visita.adjuntoNotas || isEditing) && (
                            <div className="detail-item full-width">
                                <label>Adjunto de Notas:</label>
                                {isEditing ? (
                                    <div>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                            className="file-input"
                                        />
                                        {formData.adjuntoNotas && (
                                            <div className="file-preview">
                                                <a href={formData.adjuntoNotas} target="_blank" rel="noopener noreferrer">
                                                    Ver archivo actual
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    visita.adjuntoNotas ? (
                                        <a href={visita.adjuntoNotas} target="_blank" rel="noopener noreferrer" className="file-link">
                                            Ver archivo adjunto
                                        </a>
                                    ) : (
                                        <span>No hay archivo adjunto</span>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Datos Personales */}
                    <div className="detail-section">
                        <h2>Datos Personales</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Fecha de Nacimiento:</label>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        value={formData.fechaNacimiento || ''}
                                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.fechaNacimiento ? formatearFecha(visita.fechaNacimiento) : 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Edad:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.edad || ''}
                                        onChange={(e) => handleInputChange('edad', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.edad || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Cédula:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.cedula || ''}
                                        onChange={(e) => handleInputChange('cedula', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.cedula || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Teléfono Principal:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.telefono1 || ''}
                                        onChange={(e) => handleInputChange('telefono1', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.telefono1 || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Teléfono Secundario:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.telefono2 || ''}
                                        onChange={(e) => handleInputChange('telefono2', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.telefono2 || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item full-width">
                                <label>Lugar de Residencia:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.lugarResidencia || ''}
                                        onChange={(e) => handleInputChange('lugarResidencia', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.lugarResidencia || 'No disponible'}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Información Médica */}
                    <div className="detail-section">
                        <h2>Información Médica</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Lesiones:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.lesiones || ''}
                                        onChange={(e) => handleInputChange('lesiones', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.lesiones || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Enfermedades:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.enfermedades || ''}
                                        onChange={(e) => handleInputChange('enfermedades', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.enfermedades || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Tratamientos:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.tratamientos || ''}
                                        onChange={(e) => handleInputChange('tratamientos', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.tratamientos || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Atención Médica:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.atencionMedica || ''}
                                        onChange={(e) => handleInputChange('atencionMedica', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.atencionMedica || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Drogas/Medicamentos:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.drogas || ''}
                                        onChange={(e) => handleInputChange('drogas', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.drogas || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Disponibilidad:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.disponibilidad || ''}
                                        onChange={(e) => handleInputChange('disponibilidad', e.target.value)}
                                        className="edit-textarea"
                                        rows="2"
                                    />
                                ) : (
                                    <span>{visita.disponibilidad || 'No disponible'}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resumen Económico */}
                    <div className="detail-section">
                        <h2>Resumen Económico</h2>
                        <div className="economic-summary">
                            <div className="economic-block">
                                <h3>Ingresos</h3>
                                <div className="economic-grid">
                                    <div className="economic-item">
                                        <label>Ingresos Totales:</label>
                                        <span className="amount">{visita.ingresos ? `₡${visita.ingresos.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Salario:</label>
                                        <span className="amount">{visita.salario ? `₡${visita.salario.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Pensión:</label>
                                        <span className="amount">{visita.pension ? `₡${visita.pension.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Beca:</label>
                                        <span className="amount">{visita.beca2 ? `₡${visita.beca2.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="economic-block">
                                <h3>Gastos</h3>
                                <div className="economic-grid">
                                    <div className="economic-item">
                                        <label>Gastos Totales:</label>
                                        <span className="amount expense">{visita.gastos ? `₡${visita.gastos.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Comida:</label>
                                        <span className="amount expense">{visita.comida ? `₡${visita.comida.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Servicios (Agua, Luz):</label>
                                        <span className="amount expense">{((visita.agua || 0) + (visita.luz || 0)) ? `₡${((visita.agua || 0) + (visita.luz || 0)).toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Comunicaciones:</label>
                                        <span className="amount expense">{((visita.internetCable || 0) + (visita.celular || 0)) ? `₡${((visita.internetCable || 0) + (visita.celular || 0)).toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Transporte:</label>
                                        <span className="amount expense">{visita.viaticos ? `₡${visita.viaticos.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Salud:</label>
                                        <span className="amount expense">{visita.salud ? `₡${visita.salud.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                    <div className="economic-item">
                                        <label>Deudas:</label>
                                        <span className="amount expense">{visita.deudas ? `₡${visita.deudas.toLocaleString()}` : '₡0'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="economic-balance">
                                <div className="balance-item">
                                    <label>Balance:</label>
                                    <span className={`balance-amount ${(visita.ingresos || 0) - (visita.gastos || 0) >= 0 ? 'positive' : 'negative'}`}>
                                        ₡{((visita.ingresos || 0) - (visita.gastos || 0)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información de Vivienda y Trabajo */}
                    <div className="detail-section">
                        <h2>Vivienda y Trabajo</h2>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Tipo de Casa:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.casa || ''}
                                        onChange={(e) => handleInputChange('casa', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.casa || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Monto Casa/Alquiler:</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={formData.montoCasa || ''}
                                        onChange={(e) => handleInputChange('montoCasa', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.montoCasa ? `₡${visita.montoCasa.toLocaleString()}` : 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>¿Trabaja actualmente?:</label>
                                {isEditing ? (
                                    <select
                                        value={formData.trabaja || ''}
                                        onChange={(e) => handleInputChange('trabaja', e.target.value)}
                                        className="edit-input"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                ) : (
                                    <span>{visita.trabaja === 'si' ? 'Sí' : visita.trabaja === 'no' ? 'No' : 'No especificado'}</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Empresa:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.empresa || ''}
                                        onChange={(e) => handleInputChange('empresa', e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <span>{visita.empresa || 'No disponible'}</span>
                                )}
                            </div>
                            <div className="detail-item full-width">
                                <label>Especificaciones de Vivienda:</label>
                                {isEditing ? (
                                    <textarea
                                        value={formData.especificaciones || ''}
                                        onChange={(e) => handleInputChange('especificaciones', e.target.value)}
                                        className="edit-textarea"
                                        rows="3"
                                    />
                                ) : (
                                    <span>{visita.especificaciones || 'No disponible'}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Información Familiar */}
                    {(visita.nombreFamiliar || visita.parentesco || isEditing) && (
                        <div className="detail-section">
                            <h2>Información Familiar</h2>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Nombre del Familiar:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.nombreFamiliar || ''}
                                            onChange={(e) => handleInputChange('nombreFamiliar', e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{visita.nombreFamiliar || 'No disponible'}</span>
                                    )}
                                </div>
                                <div className="detail-item">
                                    <label>Edad del Familiar:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.edadFamiliar || ''}
                                            onChange={(e) => handleInputChange('edadFamiliar', e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{visita.edadFamiliar || 'No disponible'}</span>
                                    )}
                                </div>
                                <div className="detail-item">
                                    <label>Parentesco:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.parentesco || ''}
                                            onChange={(e) => handleInputChange('parentesco', e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{visita.parentesco || 'No disponible'}</span>
                                    )}
                                </div>
                                <div className="detail-item">
                                    <label>Ingreso Mensual del Familiar:</label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={formData.ingresoMensual || ''}
                                            onChange={(e) => handleInputChange('ingresoMensual', e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{visita.ingresoMensual ? `₡${visita.ingresoMensual.toLocaleString()}` : 'No disponible'}</span>
                                    )}
                                </div>
                                <div className="detail-item full-width">
                                    <label>Ocupación del Familiar:</label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.ocupacion || ''}
                                            onChange={(e) => handleInputChange('ocupacion', e.target.value)}
                                            className="edit-textarea"
                                            rows="2"
                                        />
                                    ) : (
                                        <span>{visita.ocupacion || 'No disponible'}</span>
                                    )}
                                </div>
                                <div className="detail-item full-width">
                                    <label>Lugar de Trabajo del Familiar:</label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.lugarTrabajo || ''}
                                            onChange={(e) => handleInputChange('lugarTrabajo', e.target.value)}
                                            className="edit-textarea"
                                            rows="2"
                                        />
                                    ) : (
                                        <span>{visita.lugarTrabajo || 'No disponible'}</span>
                                    )}
                                </div>
                                {isEditing && (
                                <div className="save-button-container">
                                    <button 
                                        onClick={handleSave} 
                                        className="btn-guardar-cambios"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Guardando...' : 'Guardar Todos los Cambios'}
                                    </button>
                                </div>)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewVisita;