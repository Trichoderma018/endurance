import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import '../style/Expediente.css';
import "../style/ExpeNav.css";
import "../style/pared.css"
import Navbar from './navbar'
import Cards from './Cards';
import Search from './Search';

function Expediente() {
    
    const [userExpediente,setUserExpediente] = useState("")
    const [rolExpediente, setRolExpediente] = useState("");
    const [generoExpediente, setGeneroExpediente] = useState("");
    const [activoExpediente, setActivoExpediente] = useState("");
    const [sedeExpediente, setSedeExpediente] = useState("");
    const [comentario1Expediente, setComentario1Expediente] = useState("");
    const [comentario2Expediente, setComentario2Expediente] = useState("");
    const [comentario3Expediente, setComentario3Expediente] = useState("");
    const [fechaExpediente, setFechaExpediente] = useState("");
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Estado para almacenar el expediente
    // const [pesoExpediente, setPesoExpediente] = useState("");
    // const [alturaExpediente, setAlturaExpediente] = useState("");
    // const [imcExpediente, setImcExpediente] = useState("");
   
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!userExpediente || !sedeExpediente || !generoExpediente || !activoExpediente || !comentario1Expediente || !comentario2Expediente || !comentario3Expediente || !fechaExpediente) {
            setError('Por favor, complete todos los campos.');
            setIsLoading(false);
            return;
        }
        
        // el usuario del audi user

        // Aquí podrías calcular el IMC si tuvieras los campos de peso y altura
        // const imc = calculateIMC(pesoExpediente, alturaExpediente);

        try {
            const obj = {
                rol: rolExpediente,
                genero: generoExpediente,
                activo: activoExpediente,
                sede: sedeExpediente,
                comentario1: comentario1Expediente,
                comentario2: comentario2Expediente,
                comentario3: comentario3Expediente,
                fecha: fechaExpediente,
                user_id: userExpediente,
            }
            const response = await Llamados.postData(obj, 'api/expedientes/');
            console.log('Response Data', response);
        } catch (error) {
            setError('Hubo un error al enviar el expediente.');
        }

        setIsLoading(false);

    };

    return (
        <div className='fondo'>
            <header className='Endurance'>ENDURANCE</header>
            <Navbar/>
            <Search/>
            <button onClick={() => navigate('/agregar')}>Agregar +</button>
            <div className='barra'>

            
            </div>
            <div className="registro-container">
                <h2>EXPEDIENTES</h2>

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

                    <Cards/>
            </div>
        </div>
    );
}

export default Expediente;