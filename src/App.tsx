import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Login from './containers/Login';
import Recipes from './containers/Recipes';
import Saved from './containers/Saved';

import Nav from './components/Nav';

import List from './containers/List';
import Recipe from './components/Recipe';
import Search from './containers/Search';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(true);
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    setIsLoggedIn(true)
    if (!isLoggedIn && path.pathname !== "/" && path.pathname !== "/login") {
      navigate("/login")
    }
  }, [isLoggedIn, navigate, path.pathname])


  return (
    <div className="App">
      {isLoggedIn ? <Nav /> : ''}

      <Routes>
        <Route path="/" element={isLoggedIn ? <List type="pantry"/>: <Recipe/>}/>
        <Route path="/pantry" element={<List type="pantry"/>}/>
        <Route path="/grocery" element={<List type="grocery"/>}/>
        <Route path="/recipes" element={<Search />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
