import React from 'react';
import '../style/configura.css'


import {
  Button,
  Switch,
  Typography,
  FormControlLabel,
  Box,
  Slider,
  Select,
  MenuItem,
  TextField,
  Divider
} from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

function Configuracions() {
  const { mode, setMode } = useColorScheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(14);
  const [language, setLanguage] = React.useState('es');
  const [username, setUsername] = React.useState('');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleFontSize = (_, newValue) => {
    setFontSize(newValue);
  };

  const handleSave = () => {
    alert('Preferencias guardadas');
    console.log({ mode, sidebarOpen, fontSize, language, username });
  };

  return (
    <div className='impet'>
    <Box sx={{ padding: 4, maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Configuraciones
      </Typography>

      <Divider sx={{ my: 2 }} />

      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={toggleMode} />}
        label="Modo Oscuro"
      />

      <FormControlLabel
        control={<Switch checked={sidebarOpen} onChange={toggleSidebar} />}
        label="Sidebar Activo"
      />

      <Divider sx={{ my: 2 }} />

      <Typography gutterBottom>Tamaño de Fuente: {fontSize}px</Typography>
      <Slider
        value={fontSize}
        onChange={handleFontSize}
        min={10}
        max={24}
        step={1}
        valueLabelDisplay="auto"
      />

      <Divider sx={{ my: 2 }} />

      <Typography gutterBottom>Idioma de la interfaz</Typography>
      <Select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        fullWidth
        variant="outlined"
      >
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="en">Inglés</MenuItem>
        <MenuItem value="pt">Portugués</MenuItem>
      </Select>

      <Divider sx={{ my: 2 }} />

      <TextField
        fullWidth
        label="Nombre de usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        variant="outlined"
      />
<button  onClick={handleSave}>Guardar cambios</button>
    </Box>
<button onClick={() => window.history.back()}>Regresar</button>
  </div>
  );
}

export default Configuracions; 