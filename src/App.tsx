import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Login from './containers/Login';
import Recipes from './containers/Recipes';
import Saved from './containers/Saved';

import Nav from './components/Nav';

import List from './containers/List';
import Recipe from './components/Recipe';

import firebase from './firebase';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigate = useNavigate();
  const path = useLocation();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Will display Google as auth provider.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        navigate("/")
        return true
      }
    }
  };

  useEffect(() => {
    setIsLoggedIn(false)
    if (!isLoggedIn && path.pathname !== "/" && path.pathname !== "/login") {
      navigate("/")
    }

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unregisterAuthObserver()

  }, [isLoggedIn, navigate, path.pathname])


  return (
    <div className="App">
      {isLoggedIn ? <Nav /> : ''}

      <Routes>
        <Route path="/" element={isLoggedIn ? <List type="pantry"/>: <Recipe/>}/>
        <Route path="/pantry" element={<List type="pantry"/>}/>
        <Route path="/grocery" element={<List type="grocery"/>}/>
        <Route path="/recipes" element={<Recipes />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/login" element={<Login uiConfig={uiConfig}/>}/>
      </Routes>
    </div>
  );
}

export default App;
