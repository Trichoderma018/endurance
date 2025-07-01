import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';


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
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        minHeight: '56px',
      }}
    >
      <FormControl>
        <FormLabel id="demo-theme-toggle">Theme</FormLabel>
        <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          // onChange={(event) =>
          //   setMode(event.target.value as 'system' || 'light' || 'dark')
          // }
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

  return (
    <ThemeProvider theme={theme}>
      <MyApp />
    </ThemeProvider>
  );

export default Configuraciones;