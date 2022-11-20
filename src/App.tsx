import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Login from './containers/Login';
import Saved from './containers/Saved';
import Landing from './containers/Landing';

import Nav from './components/Nav';

import List from './containers/List';
import Search from './containers/Search';

import firebase from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';

// general structure of each recipe item
export type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
  }
} 

// global context that keeps track of all of a user's saved recipes
type GlobalSaved = {
  items: RecipeProps[],
  setItems: (newItems: RecipeProps[]) => void
}

export const GlobalSavedContext = createContext<GlobalSaved>({
  items: [],
  setItems: () => {}
})

export const useGlobalSavedContext = () => useContext(GlobalSavedContext)

function App() {

  // state to keep track if the user is logged in 
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  // state that keeps track of a user's saved recipes
  const [items, setItems] = useState<RecipeProps[]>([])

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
        navigate("/")
      })
  }

  // uses google's signout component to log a user out
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
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
      <GlobalSavedContext.Provider value={{items, setItems}}>

        {/* all of the possible routes for the application and which component will be rendered */}
        <Routes>
          <Route path="/" element={isLoggedIn ? <List type="pantry"/>: <Landing/>}/>
          <Route path="/pantry" element={<List type="pantry"/>}/>
          <Route path="/grocery" element={<List type="grocery"/>}/>
          <Route path="/recipes" element={<Search />}/>
          <Route path="/saved" element={<Saved />}/>
          <Route path="/login" element={<Login loginHandler={loginHandler}/>}/>
        </Routes>
      </GlobalSavedContext.Provider>
    </div>
  );
}

export default App;
