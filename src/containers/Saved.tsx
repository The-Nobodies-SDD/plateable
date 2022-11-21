import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Recipes from './Recipes';

import { updateSaved, selectSaved, SavedItem } from '../features/saved/savedSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import recipeList from '../components/recipes'

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
      ...recipeList
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