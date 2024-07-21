import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './componants/Signup';
import Login from './componants/Login';   
import Home from './componants/Home';      
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
