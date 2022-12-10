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

import { updatePantry, updatePantryPulled } from './features/pantry/pantrySlice';
import { updateGrocery, updateGroceryPulled } from './features/grocery/grocerySlice';
import { updateSaved, updateHasPulled } from './features/saved/savedSlice';

// general structure of each recipe item
export type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
  }
} 

function App() {

  // state to keep track if the user is logged in 
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  // used to determine current url and redirect users if not logged in
  const navigate = useNavigate();
  const path = useLocation();
  
  // accesses firebases authentication
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  // uses google's signInWithPopup to have a user log in
  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        updatePantry([]);
        updatePantryPulled(false);
        updateGrocery([]);
        updateGroceryPulled(false);
        updateSaved([]);;
        updateHasPulled(false)
        navigate("/")
      })
  }

  // uses google's signout component to log a user out
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        updatePantry([]);
        updatePantryPulled(false);
        updateGrocery([]);
        updateGroceryPulled(false);
        updateSaved([]);;
        updateHasPulled(false)
        navigate("/login")
        window.location.reload()
      })
  }

  useEffect(() => {
    // if a user is not logged in, make sure they are either on the landing or login page
    if (!isLoggedIn && path.pathname !== "/" && path.pathname !== "/login") {
      navigate("/")
    }

    // changes the loggedIn state whenever there is an auth change
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unregisterAuthObserver()

  }, [isLoggedIn, navigate, path.pathname])


  return (
    <div className="App">
      {isLoggedIn ? <Nav logout={logoutHandler}/> : ''}
        {/* all of the possible routes for the application and which component will be rendered */}
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
