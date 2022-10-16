import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './containers/Login';
import Recipes from './containers/Recipes';
import Saved from './containers/Saved';

import Nav from './components/Nav';

import List from './containers/List';

function App() {
  return (
    <div className="App">

      <Nav />
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/pantry" element={<List type="pantry"/>}/>
        <Route path="/grocery" element={<List type="grocery"/>}/>
        <Route path="/recipes" element={<Recipes />}/>
        <Route path="/saved" element={<Saved />}/>
      </Routes>

    </div>
  );
}

export default App;
