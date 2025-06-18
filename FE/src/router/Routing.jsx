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



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path='/agregar' element={<Agregar/>}/>
            <Route path='/Expediente' element={<Expediente/>}/>
            <Route path='/mantAdmin' element={<MantenimientoAdmin/>}/>
            <Route path='/mantStaff' element={<MantenimientoStaff/>}/>
            <Route path='/mantUser' element={<MantenimientoUser/>}/>
            <Route path='/mantProyects' element={<MantenimientoProyectos/>}/>
            <Route path='/proyectos' element={<PageProyectos />} />
            <Route path='/visita' element={<PageVisita />} />

            <Route path='/view' element={<View />} />

             {/*Pruebas*/}
             <Route path='/rfce' element={<Prueba/>}/>
            <Route path='/side' element={<Sidebar/>}/>

        </Routes>
      </Router>
    </div>
  );
}
export default Routing;