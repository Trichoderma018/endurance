import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';


function View() {

    // Estado de carga y manejo de errores
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);


    const [users, setUsers] = useState([]); // lista de usuarios

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);


    useEffect(() => {
        async function fetchUserInfo() {
            if (id) {
                setIsLoading(true);
                try {
                    const response = await Llamados.getData(`api/usuarios/${id}/`);
                    setUserInfo(response);
                } catch (error) {
                    setError('Error fetching user information');
                } finally {
                    setIsLoading(false);
                }
            }
        }

        fetchUserInfo();
    }, [id]);


    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);
            try {
                const usersResponse = await Llamados.getData(`api/users/${localStorage.getItem('id')}/`);
                setUsers(Array.isArray(usersResponse) ? usersResponse : []);
                console.log(usersResponse);

            } catch (error) {
                setError('Error fetching users');
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, []);


    const handleUserClick = (userId) => {
        setId(userId);
        setUserInfo(null); // Reset user info to show loading state
    };

    return (
        <div>
            <h2>User Information</h2>
            

            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}


            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
                        {user.username}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default View;