import React from 'react'
import { useGlobalContext } from './context/globalContext';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';

function App() {

  const global = useGlobalContext;

  return (
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;