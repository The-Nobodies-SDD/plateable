import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Pantry from './containers/Pantry';
import Login from './containers/Login';

import Nav from './components/Nav';

import './App.scss';

function App() {
  return (
    <div className="App">

      <Nav />
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/pantry" element={<Pantry />}/>
      </Routes>

    </div>
  );
}

export default App;
