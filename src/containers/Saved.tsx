import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Recipes from './Recipes';
import { getSavedRecipes } from '../firebase';

import { updateSaved, selectSaved, updateHasPulled, selectHasPulled } from '../features/saved/savedSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

/*
Saved Recipe class:
  presents saved recipe page to the user. 

  Interacts with Recipe class to get recipe cards
*/
const Saved = () => {

  // allows access to set and receive values from global context
  const savedGlobal = useAppSelector(selectSaved);

  const hasPulledGlobal = useAppSelector(selectHasPulled)

  // accesses to functions to update global state
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    // sets the global saved state when this component is loaded if it is empty
    if (!hasPulledGlobal) {
      getSavedRecipes()
        .then(res => {
          const data:any = res.data;
          
          const recipes = Object.keys(data).map(el => {
            return {
              info: {
                ...data[el]
              }
            }
          })
          
          dispatch(updateSaved(recipes));
          dispatch(updateHasPulled(true));
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [savedGlobal, hasPulledGlobal, dispatch])


  return (
    <Container>
      <Row><h1>Saved Recipes</h1></Row>
      <Recipes items={savedGlobal}/>
    </Container>
  )
}

export default Saved;