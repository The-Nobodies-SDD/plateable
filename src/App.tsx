import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './containers/Login';
import Pantry from './containers/Pantry';
import Grocery from './containers/Grocery';
import Recipes from './containers/Recipes';
import Saved from './containers/Saved';

import Nav from './components/Nav';

import './App.scss';

function App() {
  return (
    <div className="App">

      <Nav />
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/pantry" element={<Pantry />}/>
        <Route path="/grocery" element={<Grocery />}/>
        <Route path="/recipes" element={<Recipes />}/>
        <Route path="/saved" element={<Saved />}/>
      </Routes>

    </div>
  );
}

export default App;
