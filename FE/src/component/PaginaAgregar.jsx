import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "../style/Expediente.css"
import Navbar from './navbar';
import Cards from './Cards';


function PaginaAgregar() {

    
    const [userExpediente,setUserExpediente] = useState("");
    const [rolExpediente, setRolExpediente] = useState("");
    const [imagenExpediente, setImagenExpediente] = useState("")
    const [activoExpediente, setActivoExpediente] = useState("");
    const [generoExpediente, setGeneroExpediente] = useState("");
    const [sedeExpediente, setSedeExpediente] = useState("");
    const [comentario1Expediente, setComentario1Expediente] = useState("");
    const [comentario2Expediente, setComentario2Expediente] = useState("");
    const [comentario3Expediente, setComentario3Expediente] = useState("");
    const [fechaExpediente, setFechaExpediente] = useState("");
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
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
        useEffect(() => {
         setIsLoading(true);
         const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer); // Evita posibles fugas de memoria
        }, []);
        // el usuario del audi user

        // Aquí podrías calcular el IMC si tuvieras los campos de peso y altura
        // const imc = calculateIMC(pesoExpediente, alturaExpediente);

        try {
            const obj = {
                user: userExpediente,
                rol: rolExpediente,
                activo: activoExpediente,
                imagen: imagenExpediente,
                genero: generoExpediente,
                sede: sedeExpediente,
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
        <div className='fondo'>
           
            <div className='barra'>
            
            <header className='Endurance'>ENDURANCE</header>
            </div>
            <div className="registro-container">
                <h2>EXPEDIENTES</h2>
                <form >
                    <input className='input' type="text" name="name"  onChange={(e)=>setUserExpediente(e.target.value)} placeholder="Full name" required />

                    <select className='input' name="Estado"  onChange={(e)=>setRolExpediente(e.target.value)} required>
                        <option value="">Rol</option>
                        <option value="atleta">Atleta</option>
                        <option value="entrenador">Entrenador</option>
                        <option value="staff">STAFF</option>
                    </select>

                    <input className='input' type="file" name='wall' accept="image/*" onChange={(e)=>setImagenExpediente(e.target.files[0])}/>
                    {/* Sección de carga de imagen */}
                    <div className="image-upload-section">
                        <label htmlFor="product-image" className="file-input-label">
                        Foto de perfil
                        </label>

                        
                        {/* Vista previa de la imagen */}
                        {/* {imagenPreview && (
                            <div className="image-preview">
                                <img 
                                    src={imagenPreview} 
                                    alt="Vista previa" 
                                    className="preview-img" 
                                />
                            </div>
                        )} */}
                        
                        {/* Mostrar estado de carga */}
                        {uploading && <p className="uploading-message">Subiendo imagen...</p>}
                    </div>

                    <select className='input' value={activoExpediente} onChange={(e)=>setActivoExpediente(e.target.value)} >
                        <option value="Estado" >estado</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="activo">Activo</option>
                    </select>

                    <select className='input' name="Genero" onChange={(e)=>setGeneroExpediente(e.target.value)} required>
                        <option value="">género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    <select className='input' name="Sede" onChange={(e)=>setSedeExpediente(e.target.value)} required>
                        <option value="">Sede</option>
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

                    <button className='input' type="submit" onClick={(e)=>handleSubmit(e)}>Create Expedient</button>                  
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
        </div>
    );
}
export default PaginaAgregar