import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Expediente from '../component/Expediente';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            <Route path='/Expesiente' element={<Expediente/>}/>

        </Routes>
      </Router>
    </div>
  );
}
export default Routing;