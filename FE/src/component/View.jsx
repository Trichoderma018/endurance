import React from 'react'
import { useState, useEffect } from 'react';
import Llamados from '../services/Llamados';


function View() {
    // aqui se va a mostrar la informacion del usuario del cards
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null); // id del usuario que se va a mostrar

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
            try {
                const users = await Llamados.getData('api/usuarios/');
                setUsers(users);
            } catch (error) {
                setError('Error fetching users');
            }
        }
        fetchUsers();
    }, []);

    const handleUserClick = (userId) => {
        setId(userId);
        setUserInfo(null); // Reset user info to show loading state
    }
    }
    if (!userInfo) {
        return (
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user.id} onClick={() => handleUserClick(user.id)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>

            <h2>User Information</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>First Name:</strong> {userInfo.first_name}</p>
                    <p><strong>Last Name:</strong> {userInfo.last_name}</p>
                    {/* Add more fields as needed */}
                </div>
            )}
            <div>
                <h3>Users List</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id} onClick={() => handleUserClick(user.id)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
                <button onClick={() => setId(null)}>Back to Users List</button>
            </div>
        </div>
    )


export default View