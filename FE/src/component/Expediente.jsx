import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import '../style/Expediente.css';
import "../style/ExpeNav.css";
import Navbar from './navbar';

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

            <Navbar/>
            
            <header>ENDURANCE</header>

            <div className="registro-container">
                <h2>EXPEDIENTES</h2>
                <form >
                    <input className='input' type="text" name="nombre"  onChange={(e)=>setUserExpediente(e.target.value)} placeholder="Full name" required />

                    <select className='input' name="Estado"  onChange={(e)=>setRolExpediente(e.target.value)} required>
                        <option value="" >Seleccione Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>

                    <select className='input' value={activoExpediente} onChange={(e)=>setActivoExpediente(e.target.value)} >
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
                    <select className='input' name="Sede" onChange={(e)=>setSedeExpediente(e.target.value)} required>
                        <option value="">Seleccione Sede</option>
                        <option value="sede1">San Jose</option>
                        <option value="sede2">Limon</option>
                        <option value="sede3">Cartago</option>
                        <option value="sede4">Heredia</option>
                        <option value="sede5">Alajuela</option>
                        <option value="sede6">Guanacaste</option>
                        <option value="sede7">Puntarenas</option>
                    </select>

                    <input onChange={(e)=>setComentario1Expediente(e.target.value)} className='input' type="text" name="comentario1" placeholder="Comentario °1" required />
                    <input onChange={(e)=>setComentario2Expediente(e.target.value)} className='input' type="text" name="comentario2" placeholder="Comentario °2" required />
                    <input onChange={(e)=>setComentario3Expediente(e.target.value)} className='input' type="text" name="comentario3" placeholder="Comentario °3" required />
                    <input className='input' type="date" name="fecha" onChange={(e)=>setFechaExpediente(e.target.value)} required />
                    
                    <button className='input' type="submit" onClick={(e)=>handleSubmit(e.target.value)}>Create Expedient</button>
                    <button className='input'>Realizar view</button>
                    {isLoading && <p>Cargando...</p>}
                    {error && <p className="error">{error}</p>}
                    
                </form>
                
            </div>
        </div>
    );
}

export default Expediente;