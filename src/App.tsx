import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './containers/Login';
import Recipes from './containers/Recipes';
import Saved from './containers/Saved';

import Nav from './components/Nav';

import './App.scss';
import List from './containers/List';

function App() {
  return (
    <div className="App">
      <Nav />
      
      <Routes>
        <Route path="/" element={<List type="pantry"/>}/>
        <Route path="/pantry" element={<List type="pantry"/>}/>
        <Route path="/grocery" element={<List type="grocery"/>}/>
        <Route path="/recipes" element={<Recipes />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
