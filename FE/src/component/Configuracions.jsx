import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Configuraciones() {
  const navigate = useNavigate();
  const [config, setConfig] = useState([
    { opcion: 'Idioma', valor: 'Español', tipo: 'texto' },
    { opcion: 'Tema', valor: 'Oscuro', tipo: 'select', opciones: ['Claro', 'Oscuro', 'Sistema'] },
    { opcion: 'Notificaciones', valor: true, tipo: 'switch' },
    { opcion: 'Volumen', valor: '50%', tipo: 'texto' },
    { opcion: 'Privacidad', valor: 'Alta', tipo: 'select', opciones: ['Baja', 'Media', 'Alta'] },
    { opcion: 'Ubicación', valor: false, tipo: 'switch' },
  ]);

  const handleChange = (index, value) => {
    const updated = [...config];
    updated[index].valor = updated[index].tipo === 'switch' ? Boolean(value) : value;
    setConfig(updated);
  };

  const renderInput = (item, index) => {
    switch (item.tipo) {
      case 'texto':
        return (
          <input
            type="text"
            value={item.valor}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        );
      case 'select':
        return (
          <select value={item.valor} onChange={(e) => handleChange(index, e.target.value)}>
            {item.opciones.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'switch':
        return (
          <label>
            <input
              type="checkbox"
              checked={item.valor === true}
              onChange={() => handleChange(index, !item.valor)}
            />
            {item.valor ? ' Activado' : ' Desactivado'}
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>⚙️ Panel de Configuraciones</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Opción</th>
            <th style={thStyle}>Configuración</th>
          </tr>
        </thead>
        <tbody>
          {config.map((item, index) => (
            <tr key={index}>
              <td style={tdStyle}>{item.opcion}</td>
              <td style={tdStyle}>{renderInput(item, index)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>🔙 Regresar</button>
    </div>
  );
}

const thStyle = { border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0' };
const tdStyle = { border: '1px solid #ccc', padding: '8px' };

export default Configuraciones;