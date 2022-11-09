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

type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
    missingIng: string[]
  }
} 

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


  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  
  const recipes = [
    {
      info: {
        id: "23",
        title: "Buffalo Chicken Wings",
        image: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg",
        missingIng: []
      }
    },
    {
      info: {
        id: "213",
        title: "Roasted Squash ",
        image: "https://www.melissassouthernstylekitchen.com/wp-content/uploads/2012/07/editedRoastedSquashMedley-Iron-Skillet-Zucchini-Cornbread-064-768x1039.jpg",
        missingIng: []
      }
    },
    {
      info: {
        id: "1233",
        title: "Scalloped Potatoes",
        image: "https://www.spendwithpennies.com/wp-content/uploads/2018/11/SpendWithPennies-Scalloped-Potatoes-25.jpg",
        missingIng: []
      }
    }
  ]

  
  const [items, setItems] = useState<RecipeProps[]>(recipes)


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
      <GlobalSavedContext.Provider value={{items, setItems}}>
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
