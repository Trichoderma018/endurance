import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';
import { useNavigate } from 'react-router-dom';
import '../style/Expediente.css';

import Navbar from './navbar'
import Cards from './Cards';
import Search from './Search';

function Expediente() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[users, setUsers] = useState([]);
    const navigate = useNavigate()
    // Estado para almacenar el expediente
    // const [pesoExpediente, setPesoExpediente] = useState("");
    // const [alturaExpediente, setAlturaExpediente] = useState("");
    // const [imcExpediente, setImcExpediente] = useState("");
   
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    useEffect(() => {
        async function info() {
            const users = await Llamados.getData('api/expedientes/');
            console.log('Response Data', users);
            setUsers(users);
        }
        info();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
       
        
        // el usuario del audi user

        // Aquí podrías calcular el IMC si tuvieras los campos de peso y altura
        // const imc = calculateIMC(pesoExpediente, alturaExpediente);

        try {
    
            const response = await Llamados.postData(obj, 'api/expedientes/');
            console.log('Response Data', response);
        } catch (error) {
            setError('Hubo un error al enviar el expediente.');
        }

        setIsLoading(false);

    };

    return (
        <div style={{height:'auto'}} className='fondo'>
            <header className='Endurance'>ENDURANCE</header>
            <Navbar/>
            <Search/>

            <button className='buttong' onClick={() => navigate('/agregar')}>Agregar +</button>
            <div className='barra'>

            
            </div>
            <div className="registro-container">
                <h2>Lista de Expediente</h2>
                {users.map((user) => (
                    <Cards
                        key={user.id} 
                        id={user.id}
                        imagen={user.imagen}
                        descripcion={user.descripcion}
                        nombre={user.nombreCompleto}
                        rol={user.rol}
                    />
                ))}
            </div>
        </div>
    );
}

export default Expediente;