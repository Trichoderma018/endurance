import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Expediente.css';
import Llamados from '../services/Llamados';

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
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
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
        if (edad < 1 || edad > 120 || peso < 30 || peso > 200 || altura < 100 || altura > 250) {
            setError('Valores fuera de los rangos permitidos.');
            return false;
        }
        setError(null);
        return true;
    };

    const calculateIMC = (peso, altura) => {
        if (peso && altura) {
            const imc = (peso / ((altura / 100) ** 2)).toFixed(2);
            if (imc < 18.5) return `${imc} - Bajo peso`;
            if (imc < 24.9) return `${imc} - Normal`;
            if (imc < 29.9) return `${imc} - Sobrepeso`;
            return `${imc} - Obesidad`;
        }
        return '';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!validateFields()) {
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await Llamados.postData({
                user: expediente.nombre,
                rol: expediente.apellido,
                imagen: expediente.sexo,
                sede: expediente.fecha,
                comentario1: expediente.peso,
                comentario2: expediente.altura,
                comentario3: expediente.altura,
                fechaExpediente: expediente.fecha,
                activo: expediente.edad,
            }, 'api/expedientes/');
        } catch (error) {
            
        }

        
        

        setIsLoading(false);
        navigate('/');
    };

    return (
        <div> 
            <header>ENDURANCE</header>
            <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/expediente">Expediente</a></li>
                    <li><a href="/atletas">Atletas</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                </ul>
            </nav>

            <div className="registro-container">
                <h2>Registro de atletas</h2>
                <form onSubmit={handleSubmit}>
                    <input className='input' type="text" name="nombre" value={expediente.nombre} onChange={handleChange} placeholder="full name" required />

                    <img src="" alt="" />

                    <select className='input' type="text" name="rol" value={expediente.apellido} onChange={handleChange} placeholder="ROL" required >
                        <option className='input' value="">Seleccione Rol</option>
                        <option className='input' value="atleta">Atleta</option>
                        <option className='input' value="entrenador">Entrenador</option>
                        <option className='input' value="staff">STAFF</option>
                    </select>

                    <select className='input' value={expediente.sexo} onChange={handleChange} required>
                        <option className='input' value="">Seleccione genero</option>
                        <option className='input' value="masculino">Masculino</option>
                        <option className='input' value="femenino">Femenino</option>
                        <option className='input' value="otro">Otro</option>
                    </select>

                    <input className='input' type="text" value={expediente.nombre} onChange={handleChange} placeholder="Comentario °1" required />
                    <input className='input' type="text" value={expediente.nombre} onChange={handleChange} placeholder="Comentario °2" required />
                    <input className='input' type="text" value={expediente.nombre} onChange={handleChange} placeholder="Comentario °3" required />
                    
                    <input className='input' type="date" value={expediente.fecha} onChange={handleChange} required />

                    <button className='input' type="submit">Realizar visita</button>
                </form>
                {error && <p className="error">{error}</p>}
                {isLoading ? <p>Cargando...</p> : expediente.imc && <p>IMC calculado: {expediente.imc}</p>}
            </div>
        </div>
    );
}

export default Expediente;