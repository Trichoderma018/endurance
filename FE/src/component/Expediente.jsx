import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import '../style/Expediente.css';
import "../style/ExpeNav.css";
import Navbar from './navbar';

function Expediente() {
    const [nombreExpediente,setNombreExpediente] = useState("")
    const [edadExpediente,setEdadExpediente] = useState("")
    const [generoExpediente, setGeneroExpediente] = useState("");
    const [activoExpediente, setActivoExpediente] = useState("");
    const [comentario1Expediente, setComentario1Expediente] = useState("");
    const [comentario2Expediente, setComentario2Expediente] = useState("");
    const [comentario3Expediente, setComentario3Expediente] = useState("");
    const [fechaExpediente, setFechaExpediente] = useState("");
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [expediente, setExpediente] = useState({
        nombre: '',
        edad: '',
        genero: '',
        activo: '',
        comentario1: '',
        comentario2: '',
        comentario3: '',
        fecha: '',
        imc: ''
    });

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);


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
        setError(null);
        if (!nombreExpediente || !edadExpediente || !generoExpediente || !activoExpediente || !comentario1Expediente || !comentario2Expediente || !comentario3Expediente || !fechaExpediente) {
            setError('Por favor, complete todos los campos.');
            setIsLoading(false);
            return;
        }

        // Aquí podrías calcular el IMC si tuvieras los campos de peso y altura
        // const imc = calculateIMC(pesoExpediente, alturaExpediente);

        try {
            const obj = {
                user: nombreExpediente,
                edad: edadExpediente,
                genero: generoExpediente,
                activo: activoExpediente,
                comentario1: comentario1Expediente,
                comentario2: comentario2Expediente,
                comentario3: comentario3Expediente,
                fecha: fechaExpediente,
            }
            const response = await Llamados.postData(obj, 'api/expedientes/');
            console.log('Response Data', response);
        } catch (error) {
            setError('Hubo un error al enviar el expediente.');
        }

        setIsLoading(false);

    };

    return (
        <div>
            <Navbar/>

            <header>ENDURANCE</header>

            <div className="registro-container">
                <h2>EXPEDIENTES</h2>
                <form >
                    <input className='input' type="text" name="nombre"  onChange={(e)=>setNombreExpediente(e.target.value)} placeholder="Full name" required />

                    <select className='input' name="Estado"  onChange={(e)=>setActivoExpediente(e.target.value)} required>
                        <option value="" >Seleccione Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>

                    <input className='input' type="number" placeholder='Edad' onChange={(e)=>setEdadExpediente(e.target.value)}/>

                    <select className='input' onChange={(e)=>setActivoExpediente(e.target.value)} >
                        <option value="Estado" >estado</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                    </select>

                    <select className='input' name="Genero" onChange={(e)=>setGeneroExpediente(e.target.value)} required>
                        <option value="" >Seleccione género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>

                    <input onChange={(e)=>setComentario1Expediente(e.target.value)} className='input' type="text" name="comentario1" placeholder="Comentario °1" required />
                    <input onChange={(e)=>setComentario2Expediente(e.target.value)} className='input' type="text" name="comentario2" placeholder="Comentario °2" required />
                    <input onChange={(e)=>setComentario3Expediente(e.target.value)} className='input' type="text" name="comentario3" placeholder="Comentario °3" required />

                    <input className='input' type="date" name="fecha" onChange={(e)=>setFechaExpediente(e.target.value)} required />
                    <button className='input' type="submit" onClick={handleSubmit}>Create Expedient</button>
                    <button className='input'>Realizar view</button>
                </form>
                {error && <p className="error">{error}</p>}
                {isLoading ? <p>Cargando...</p> : expediente.imc && <p>IMC calculado: {expediente.imc}</p>}
            </div>
        </div>
    );
}

export default Expediente;