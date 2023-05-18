import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import jwtDecode from 'jwt-decode';

function App() {
   const [setIsAuthenticated] = useState(false);

   function goHome() {
      const token = localStorage.getItem('token');

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
               <Route exact path="/" element={<Navigate to="login" />} />
               <Route path="/login" element={<Login goHome={goHome} />} />
               <Route path="/register" element={<Register />} />            
               <Route path="/dashboard" element={<Home/>} />
               <Route path="/twitternews" element={<Home active={2}/>} />
               <Route path="/googlenews" element={<Home active={3}/>} />
               <Route path="/incomes" element={<Home active={4}/>} />
               <Route path="/expenses" element={<Home active={5}/>} />
               <Route path="/marketpredictions" element={<Home active={6}/>} />
               <Route path="/settings" element={<Home active={7}/>} />
               <Route path="/realtimeprices" element={<Home active={8}/>} />
            </Routes>
         </Router>
      </div>
   );
}

export default App;