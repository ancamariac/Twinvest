import {React, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import jwtDecode from 'jwt-decode';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  function goHome()  {
    const token = localStorage.getItem('token');
    console.log(token)
    
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      } else {
        setIsAuthenticated(true);
        
      }
    }
  }

  return (
      <div className="app">
        <Router>
            <Routes>
              <Route path="/" element={<Login goHome={goHome}/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/home" element={<Home/>}/>              
              
            </Routes>
        </Router>
      </div>
  );
}

export default App;