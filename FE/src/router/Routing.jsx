import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';



// <Route path='/' element={</>}/>
function Routing() {

  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Register />} />
            {/* <Route path="/pagina" element={<Pagina />} /> */}
            {/* <Route path="/pagina2" element={<Pagina2 />} /> */}
            {/* <Route path="/pagina3" element={<Pagina3 />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default Routing;