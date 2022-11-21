import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Recipes from './Recipes';

import { updateSaved, selectSaved, SavedItem } from '../features/saved/savedSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

/*
Saved Recipe class:
  presents saved recipe page to the user. 

  Interacts with Recipe class to get recipe cards
*/
const Saved = () => {


  // allows access to set and receive values from global context
  const savedGlobal = useAppSelector(selectSaved);
  // accesses to functions to update global state
  const dispatch = useAppDispatch();

  useEffect(() => {
    // placeholder data for saved recipes
    const recipes:SavedItem[] = [
      {
        info: {
          id: "23",
          title: "Buffalo Chicken Wings",
          image: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg",
          sourceUrl: "",
          ingredients: [],
          time: "",
          instructions: ""
        }
      },
      {
        info: {
          id: "213",
          title: "Roasted Squash ",
          image: "https://www.melissassouthernstylekitchen.com/wp-content/uploads/2012/07/editedRoastedSquashMedley-Iron-Skillet-Zucchini-Cornbread-064-768x1039.jpg",
          sourceUrl: "",
          ingredients: [],
          time: "",
          instructions: ""
        }
      },
      {
        info: {
          id: "1233",
          title: "Scalloped Potatoes",
          image: "https://www.spendwithpennies.com/wp-content/uploads/2018/11/SpendWithPennies-Scalloped-Potatoes-25.jpg",
          sourceUrl: "",
          ingredients: [],
          time: "",
          instructions: ""
        }
      }
    ]

    // sets the global saved state when this component is loaded if it is empty
    if (!savedGlobal.length) {
      dispatch(updateSaved(recipes))
    }
  }, [savedGlobal.length, dispatch])


  return (
    <Container>
      <Row><h1>Saved Recipes</h1></Row>
      <Recipes items={savedGlobal}/>
    </Container>
  )
}

export default Saved;