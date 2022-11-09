import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Login from './containers/Login';
import Saved from './containers/Saved';
import Landing from './containers/Landing';

import Nav from './components/Nav';

import List from './containers/List';
import Search from './containers/Search';

import firebase from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';

function App() {

  const pantry_list = () => {}

  const grocery_list = () => {}


  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const navigate = useNavigate();
  const path = useLocation();
  
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/")
      })
  }

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
  }

  useEffect(() => {
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
      {isLoggedIn ? <Nav logout={logoutHandler}/> : ''}

      <Routes>

        <Route path="/" element={isLoggedIn ? <List type="pantry"/>: <Landing/>}/>
        <Route path="/pantry" element={<List type="pantry"/>}/>
        <Route path="/grocery" element={<List type="grocery"/>}/>
        <Route path="/recipes" element={<Search />}/>
        <Route path="/saved" element={<Saved />}/>
        <Route path="/login" element={<Login loginHandler={loginHandler}/>}/>
      </Routes>
    </div>
  );
}

export default App;
