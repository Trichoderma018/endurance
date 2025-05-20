import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/register" element={<Register />} />
            {/* <Route path="/pagina" element={<Pagina />} /> */}
            {/* <Route path="/pagina2" element={<Pagina2 />} /> */}
            {/* <Route path="/pagina3" element={<Pagina3 />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default Routing;