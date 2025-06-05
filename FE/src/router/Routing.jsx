import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Expediente from '../component/Expediente';
import MantenimientoAdmin from '../pages/MantenimientoAdmin';
import MantenimientoStaff from '../pages/MantenimientoStaff';
import MantenimientoUser from '../pages/MantenimientoUser';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path='/Expediente' element={<Expediente/>}/>
            <Route path='/mantAdmin' element={<MantenimientoAdmin/>}/>
            <Route path='/mantStaff' element={<MantenimientoStaff/>}/>
            <Route path='/mantUser' element={<MantenimientoUser/>}/>
            
        </Routes>
      </Router>
    </div>
  );
}
export default Routing;