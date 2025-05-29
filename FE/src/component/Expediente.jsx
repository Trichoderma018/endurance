import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Llamados from '../services/Llamados';
import '../style/Expediente.css';

function Expediente() {
    const [expediente, setExpediente] = useState({
        nombre: '',
        edad: '',
        genero: '',
        fecha: '',
        activo: '',
        comentario1: '',
        comentario2: '',
        comentario3: ''
    } );

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    useEffect(() => {
        setExpediente(prev => ({
            ...prev,
            imc: calculateIMC(prev.peso, prev.altura)
        }));
    }, [expediente.peso, expediente.altura]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpediente(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateFields = () => {
        const { nombre, edad, genero, fecha, peso, altura } = expediente;
        if (!nombre || !edad || !genero || !fecha || !peso || !altura) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        if (isNaN(edad) || isNaN(genero) || isNaN(altura)) {
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
                activo: expediente.activo,
                genero: expediente.genero,
                comentario1: expediente.comentario1,
                comentario2: expediente.comentario2,
                comentario3: expediente.comentario3,
            }, 'api/expedientes/');
        } catch (error) {
            setError('Hubo un error al enviar el expediente.');
        }

        setIsLoading(false);
       
    };

    return (
        <div>
            <header>ENDURANCE</header>
            <nav>
                <ul>
    
                {/* lista de expedientes */}

                </ul>
            </nav>

            <div className="registro-container">
                <h2>Registro de atletas</h2>
                <form onSubmit={handleSubmit}>
                    <input className='input' type="text" name="nombre" value={expediente.nombre} onChange={handleChange} placeholder="Full name" required />
                    <select className='input' name="apellido" value={expediente.apellido} onChange={handleChange} required>
                        <option value="">Seleccione Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>
                    <select className='input' name="" id="">
                        <option className='input' value="Activo">Activo</option>
                        <option className='input' value="si">Si</option>
                        <option className='input' value="no">No</option>
                    </select>
                    <select className='input' name="sexo" value={expediente.sexo} onChange={handleChange} required>
                        <option value="">Seleccione género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <input className='input' type="text" name="comentario1" value={expediente.comentario1} onChange={handleChange} placeholder="Comentario °1" required />
                    <input className='input' type="text" name="comentario2" value={expediente.comentario2} onChange={handleChange} placeholder="Comentario °2" required />
                    <input className='input' type="text" name="comentario3" value={expediente.comentario3} onChange={handleChange} placeholder="Comentario °3" required />
                    
                    <input className='input' type="date" name="fecha" value={expediente.fecha} onChange={handleChange} required />
                    <button className='input' type="submit">Realizar visita</button>
                </form>

                {error && <p className="error">{error}</p>}
                {isLoading ? <p>Cargando...</p> : expediente.imc && <p>IMC calculado: {expediente.imc}</p>}
            </div>
        </div>
    );
}

export default Expediente;