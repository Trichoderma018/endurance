import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Expediente.css';

function Expediente() {
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

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

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

    return (
        <div className="">
            <div className="container">
                <div className="heading">Registro de atletas</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="nombre" value={expediente.nombre} onChange={handleChange} placeholder="Nombre" required />
                    <input type="text" name="apellido" value={expediente.apellido} onChange={handleChange} placeholder="Apellido" required />
                    <input type="number" name="edad" value={expediente.edad} onChange={handleChange} placeholder="Edad" required />
                    <select name="sexo" value={expediente.sexo} onChange={handleChange} required>
                        <option value="">Seleccione Sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <input type="date" name="fecha" value={expediente.fecha} onChange={handleChange} placeholder="Fecha de visita" required />
                    <input type="number" name="peso" value={expediente.peso} onChange={handleChange} placeholder="Peso (kg)" required />
                    <input type="number" name="altura" value={expediente.altura} onChange={handleChange} placeholder="Altura (cm)" required />
                    <button type="submit">Realizar visita</button>
                </form>
                {error && <p className="error">{error}</p>}
                {isLoading ? <p>Cargando...</p> : expediente.imc && <p>IMC calculado: {expediente.imc}</p>}

                
            </div>
        </div>
    );
}

export default Expediente;