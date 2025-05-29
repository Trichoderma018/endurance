import React from 'react'
import Llamados from '../services/Llamados';

function MantAdmin() {
    const [nombreCompleto, setNombreCompleto] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function cargarDatos () {
        const obj = {
            nombreCompleto: nombreCompleto,
            email: email,
            password: password
        };

        const response = await Llamados.postData(obj, 'api/admin/');
        console.log('Response Data', response);
    }
  return (
    <div>
      <input
        type="text"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        placeholder="Nombre Completo"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={cargarDatos}>Crear Administrador</button>
    </div>
  )
}

export default MantAdmin