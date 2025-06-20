import React, { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';


function View() {

    // Estado de carga y manejo de errores
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);

    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);

    const [users, setUsers] = useState([]); // lista de usuarios

    useEffect(() => {
        setIsLoadingUsers(true);
        setTimeout(() => setIsLoadingUsers(false), 2000);
    }, []);


    useEffect(() => {
        async function fetchUserInfo() {
            if (id) {
                setIsLoadingUserInfo(true);
                try {
                    const response = await Llamados.getData(`api/usuarios/${id}/`);
                    setUserInfo(response);
                } catch (error) {
                    setError('Error fetching user information');
                } finally {
                    setIsLoadingUserInfo(false);
                }
            }
        }
        // Fetch user info only if id is set
        fetchUserInfo();
    }, [id]);

    // Fetch users when the component mounts
    // This will populate the users list
    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);
            try {
                const users = await Llamados.getData('api/usuarios/');
                setUsers(users);
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
            {(isLoadingUsers || isLoadingUserInfo) && <p>Loading...</p>}

            {userInfo ? (
                <div>
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>First Name:</strong> {userInfo.first_name}</p>
                    <p><strong>Last Name:</strong> {userInfo.last_name}</p>
                    <button onClick={() => setId (null)}>Back to Users List</button>
                </div>

            ) : (
                <div>
                    <h3>Users List</h3>
                    <ul>
                        
                        {isLoadingUsers ? (
                            <p>Loading users...</p>
                        ) : (
                            users.map(user => (
                                <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                    {user.username}
                                </li>

                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default View;