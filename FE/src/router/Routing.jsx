import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Expediente from '../component/Expediente';
import MantenimientoAdmin from '../pages/MantenimientoAdmin';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path='/Expesiente' element={<Expediente/>}/>
            <Route path='/mantAdmin' element={<MantenimientoAdmin/>}/>

        </Routes>
      </Router>
    </div>
  );
}
export default Routing;