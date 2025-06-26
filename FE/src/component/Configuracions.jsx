import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Configuraciones() {
  const navigate = useNavigate();
  const [config, setConfig] = useState([
    { opcion: 'Idioma', valor: 'Español' },
    { opcion: 'Tema', valor: 'Oscuro' },
    { opcion: 'Notificaciones', valor: 'Activadas' },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [newValue, setNewValue] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewValue(config[index].valor);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setNewValue('');
  };

  const handleSave = () => {
    if (newValue.trim() === '') return;
    const updated = [...config];
    updated[editIndex].valor = newValue;
    setConfig(updated);
    setEditIndex(null);
    setNewValue('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Panel de Configuraciones</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Opción</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Valor Actual</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {config.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.opcion}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.valor}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleEdit(index)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)}>Regresar</button>

      {editIndex !== null && (
        <div style={{ marginTop: '20px' }}>
          <h4>Editar configuración de: {config[editIndex].opcion}</h4>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleSave} style={{ marginRight: '5px' }}>Guardar</button>
          <button onClick={handleCancel} style={{ marginRight: '5px' }}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Configuraciones;