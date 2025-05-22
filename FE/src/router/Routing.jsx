import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Principal from '../component/Principal';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/prin' element={<Principal/>}/>

        </Routes>
      </Router>
    </div>
  );
}
export default Routing;