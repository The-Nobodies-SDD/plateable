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

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);


  type RecipeProps = {
    info: {
      id: string,
      title: string,
      image: string,
      missingIng: string[]
    }
  }   

  // const recipes = [{
  //   id: "",
  //   title: "Scalloped Potatoes",
  //   image: "https://www.spendwithpennies.com/wp-content/uploads/2018/11/SpendWithPennies-Scalloped-Potatoes-25.jpg",
  //   missingIng: []
  // },{
  //   id: "",
  //   title: "Buffalo Chicken Wings",
  //   image: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg",
  //   missingIng: []
  // },{
  //   id: "",
  //   title: "Roasted Squash ",
  //   image: "https://www.melissassouthernstylekitchen.com/wp-content/uploads/2012/07/editedRoastedSquashMedley-Iron-Skillet-Zucchini-Cornbread-064-768x1039.jpg",
  //   missingIng: []
  // }, {
  //   id: "",
  //   title: "Scalloped Potatoes",
  //   image: "https://www.spendwithpennies.com/wp-content/uploads/2018/11/SpendWithPennies-Scalloped-Potatoes-25.jpg",
  //   missingIng: []
  // },{
  //   id: "",
  //   title: "Buffalo Chicken Wings",
  //   image: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg",
  //   missingIng: []
  // },{
  //   id: "",
  //   title: "Roasted Squash",
  //   image: "https://www.melissassouthernstylekitchen.com/wp-content/uploads/2012/07/editedRoastedSquashMedley-Iron-Skillet-Zucchini-Cornbread-064-768x1039.jpg",
  //   missingIng: []
  // } 
  // ]

  const recipes = [
    {
      info: {
      id: "23",
      title: "Buffalo Chicken Wings",
      image: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg",
      missingIng: []
    }
    }]
  const [saved, setSaved] = useState<RecipeProps[]>(recipes)


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
        <Route path="/recipes" element={<Search setSaved={setSaved}/>}/>
        <Route path="/saved" element={<Saved saved={saved} setSaved={setSaved}/>}/>
        <Route path="/login" element={<Login loginHandler={loginHandler}/>}/>
      </Routes>
    </div>
  );
}

export default App;
