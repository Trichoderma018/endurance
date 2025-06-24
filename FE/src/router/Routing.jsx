import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Expediente from '../component/Expediente';
import MantenimientoAdmin from '../pages/MantenimientoAdmin';
import MantenimientoStaff from '../pages/MantenimientoStaff';
import MantenimientoUser from '../pages/MantenimientoUser';
import MantenimientoProyectos from '../pages/MantenimientoProyectos';
import Agregar from '../pages/Agregar';
import Prueba from '../component/Prueba';
import PageProyectos from '../pages/PageProyectos';
import View from '../component/View';
import Sidebar from '../component/Sidebar';
import PageVisita from '../pages/PageVisita';
import PageViewVisita from '../pages/PageViewVisita';
import Confits from '../pages/Confits';
import Cerrar from '../pages/Cerrar';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>

            {/* pagina de logueo */}
            <Route path='/' element={<Login/>}/>

            {/* registra nuevos usuarios */}
            <Route path="/register" element={<Register />} />

            {/* agregar nuevos usuarios */}
            <Route path='/agregar' element={<Agregar/>}/>

            {/* expediente personale */}
            <Route path='/Expediente' element={<Expediente/>}/>

            {/* Los mantenimientos */}
            <Route path='/mantAdmin' element={<MantenimientoAdmin/>}/>
            <Route path='/mantStaff' element={<MantenimientoStaff/>}/>
            <Route path='/mantUser' element={<MantenimientoUser/>}/>
            <Route path='/mantProyects' element={<MantenimientoProyectos/>}/> 

            {/* proyecos personales */}
            <Route path='/proyectos' element={<PageProyectos />} />

            {/* visita del usuario */}
            <Route path='/visita' element={<PageVisita />} />
            <Route path='/view-visita' element={<PageViewVisita />} />

            {/* Rutas de mantenimiento */}
            <Route path='/views' element={<View />} />

             {/*Pruebas*/}
             <Route path='/rfce' element={<Prueba/>}/>
            <Route path='/side' element={<Sidebar/>}/>

            {/* configuraciones */}
            <Route path='/configurations' element={<Confits/>}/>

            {/* cerrar sesions */}
            <Route path='/' element={<Cerrar/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing;