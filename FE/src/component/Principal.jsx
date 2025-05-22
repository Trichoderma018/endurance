import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Principal() {
    const [expediente, setExpediente] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        sexo: '',
        fecha: '',
        peso: '',
        altura: '',
        imc: ''
    });
    
    const [expedientes, setExpedientes] = useState([]);
    const [expedientesOriginales, setExpedientesOriginales] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpediente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateFields = () => {
        const { nombre, apellido, edad, sexo, fecha, peso, altura } = expediente;
        if (!nombre || !apellido || !edad || !sexo || !fecha || !peso || !altura) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        if (isNaN(edad) || isNaN(peso) || isNaN(altura)) {
            setError('Edad, peso y altura deben ser números.');
            return false;
        }
        if (edad <= 0 || peso <= 0 || altura <= 0) {
            setError('Edad, peso y altura deben ser mayores a cero.');
            return false;
        }
        setError(null);
        return true;
    };

    const calculateIMC = (peso, altura) => {
        if (peso && altura) {
            return (peso / ((altura / 100) ** 2)).toFixed(2);
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!validateFields()) {
            setIsLoading(false);
            return;
        }

        const newExpediente = {
            ...expediente,
            imc: calculateIMC(expediente.peso, expediente.altura)
        };

        setExpedientes(prev => [...prev, newExpediente]);
        setExpedientesOriginales(prev => [...prev, newExpediente]);

        setExpediente({
            nombre: '',
            apellido: '',
            edad: '',
            sexo: '',
            fecha: '',
            peso: '',
            altura: '',
            imc: ''
        });

        setIsLoading(false);
    };

    const handleDelete = (index) => {
        const newExpedientes = expedientes.filter((_, i) => i !== index);
        setExpedientes(newExpedientes);
        setExpedientesOriginales(newExpedientes);
    };

    const handleEdit = (index) => {
        setExpediente(expedientes[index]);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (searchTerm === '') {
            setExpedientes(expedientesOriginales);
        } else {
            const filteredExpedientes = expedientesOriginales.filter(expediente =>
                expediente.nombre.toLowerCase().includes(searchTerm) ||
                expediente.apellido.toLowerCase().includes(searchTerm)
            );
            setExpedientes(filteredExpedientes);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            <div className="form-container">
                <div className="container">
                    <div className="heading">Registro de Pacientes</div>
                    <input type="text" placeholder="Buscar paciente..." onChange={handleSearch} />
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" id="nombre" name="nombre" value={expediente.nombre} onChange={handleChange} required />
                            <label htmlFor="nombre">Nombre</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="apellido" name="apellido" value={expediente.apellido} onChange={handleChange} required />
                            <label htmlFor="apellido">Apellido</label>
                        </div>
                        <div className="input-field">
                            <input type="number" id="edad" name="edad" value={expediente.edad} onChange={handleChange} required />
                            <label htmlFor="edad">Edad</label>
                        </div>
                        <div className="input-field">
                            <select id="sexo" name="sexo" value={expediente.sexo} onChange={handleChange} required>
                                <option value="">Seleccione Sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                            <label htmlFor="sexo">Sexo</label>
                        </div>
                        <div className="input-field">
                            <input type="date" id="fecha" name="fecha" value={expediente.fecha} onChange={handleChange} />
                            <label htmlFor="fecha">Fecha de Registro</label>
                        </div>
                        <div className="input-field">
                            <input type="number" id="peso" name="peso" value={expediente.peso} onChange={handleChange} />
                            <label htmlFor="peso">Peso (kg)</label>
                        </div>
                        <div className="input-field">
                            <input type="number" id="altura" name="altura" value={expediente.altura} onChange={handleChange} />
                            <label htmlFor="altura">Altura (cm)</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="imc" name="imc" value={calculateIMC(expediente.peso, expediente.altura)} readOnly />
                            <label htmlFor="imc">IMC</label>
                        </div>
                        <button type="submit">Registrar Paciente</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    {isLoading && <p>Cargando...</p>}
                    <div className="expedientes-list">
                        {isLoading ? <p>Cargando...</p> : expedientes.map((exp, index) => (
                            <div key={index} className="expediente-card">
                                <p><strong>Nombre:</strong> {exp.nombre} {exp.apellido}</p>
                                <p><strong>Edad:</strong> {exp.edad} años</p>
                                <p><strong>Sexo:</strong> {exp.sexo}</p>
                                <p><strong>IMC:</strong> {exp.imc}</p>
                                <p><strong>Fecha de Registro:</strong> {exp.fecha}</p>
                                <p><strong>Peso:</strong> {exp.peso} kg</p>
                                <p><strong>Altura:</strong> {exp.altura} cm</p>

                                <button onClick={() => handleChange({ target: { name: 'nombre', value: exp.nombre } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'apellido', value: exp.apellido } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'edad', value: exp.edad } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'sexo', value: exp.sexo } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'fecha', value: exp.fecha } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'peso', value: exp.peso } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'altura', value: exp.altura } })}>Modificar</button>
                                <button onClick={() => handleChange({ target: { name: 'imc', value: exp.imc } })}>Modificar</button>
                                <button onClick={() => handleEdit(index)}>Editar</button>
                                <button onClick={() => handleDelete(index)}>Eliminar</button>
                                <button onClick={() => handleNavigate('/detalles')}>Detalles</button>
                                <button onClick={() => handleNavigate('/historial')}>Historial</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Principal;