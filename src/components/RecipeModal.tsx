import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/esm/Stack';

import { updateSaved, selectSaved, SavedItem, SavedIngredient } from '../features/saved/savedSlice';
import { updatePantry, selectPantry, PantryIngredient } from '../features/pantry/pantrySlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateGrocery, selectGrocery } from '../features/grocery/grocerySlice';
import {Ingredient} from "../containers/List";

import { getRecipeDetails } from '../firebase';

// import recipesList from './recipes'

type RecipeModalProps = {
  id: string,
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeModal = (props:RecipeModalProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [ingredients, setIngredients] = useState<SavedIngredient[]>([])


  // access global saved state
  const savedGlobal = useAppSelector(selectSaved);
  const pantryGlobal = useAppSelector(selectPantry);

  // accesses to functions to update global state
  const dispatch = useAppDispatch();


  // access global saved ingredients
  const groceryGlobal:Ingredient[] = useAppSelector(selectGrocery);

  const [recipeInfo, setRecipeInfo] = useState<SavedItem>({
    info: {
      id: "",
      sourceUrl: "",
      ingredients: [],
      title: "",
      image: "",
      time: "",
      instructions: ""
    }
  })

  // Functionality for Saving a recipe
  useEffect(() => {
    const found = savedGlobal.find(el => {
      return el.info.id === props.id
    })

    if (found) {
      setIsSaved(true)
    }
    
    getRecipeDetails({id: props.id})
      .then(res => {
        if (!typeof res.data) {
          return
        }

        const data:any = res.data

        setRecipeInfo({info:{
          id: props.id,
          sourceUrl: data.sourceUrl,
          ingredients: data.extendedIngredients,
          title: data.title,
          image: data.image,
          time: data.readyInMinutes,
          instructions: data.instructions}
        })
  
        setIngredients(data.extendedIngredients)
      })
      .catch(err => {
        console.error(err)
      })
  }, [savedGlobal, props.id])

  // Functionality for moving recipe to saved recipe
  const handleSaveItem = () => {
    if (isSaved) {
      const newItems = savedGlobal.filter(el => el.info.id !== props.id);
      dispatch(updateSaved(newItems));
      setIsSaved(false);
    } else {
      dispatch(updateSaved([...savedGlobal, {info:{...recipeInfo.info}}]));
      setIsSaved(true);
    }
  }
  

  // Function to add ingredients to grocery list
  const handleAddToGrocery = () => {

      const newItems:Ingredient[] = [];
      for (let i = 0; i < (ingredients.length-1); i++){
 
        const newGrocItem:Ingredient = {name:ingredients[i]['name'], count:ingredients[i]['amount'], unit:ingredients[i]['unit']};
        newItems.push(newGrocItem);

      }
      dispatch(updateGrocery([...groceryGlobal, ...newItems]));
      setIsAdded(true);
  }

  const handleMakeRecipe = () => {

    const newPantryList:PantryIngredient[] = []
    let isEdited: { [name: string]: boolean } = {}

    ingredients.forEach(item => {
      const pantryIng = pantryGlobal.find(obj => obj.name.toLowerCase() === item.name.toLowerCase())

      if (pantryIng) {
        const newCount = Math.max(0, pantryIng.count - item.amount)
        const newIngredient:PantryIngredient = {
          ...pantryIng,
          count: newCount
        }

       pantryGlobal.forEach(el => {
          if (el.name === newIngredient.name) {
            newPantryList.push(newIngredient)
            isEdited[el.name] = true
          }
        })
      }
    })

    pantryGlobal.forEach(el => {
      if (!isEdited[el.name]) {
        newPantryList.push(el)
      }
    })

    dispatch(updatePantry(newPantryList))
    props.setShow(false)

  }

  return (

    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{recipeInfo.info.title}</Modal.Title>
      </Modal.Header>
        <img className='recipeModal__img' src={recipeInfo.info.image} alt="" height="500rem"/>
      <Modal.Body>
        <div className='recipeModal__body'>
          <p>Estimated cooking time: {recipeInfo.info.time} minutes</p>
          { ingredients.length > 0 ? 
            ingredients.map((el) => (
              <Stack direction="horizontal" gap={3} key={el['name']}>
                <p>{el['name']}</p>

                <Stack direction="horizontal" gap={3}>
                  <p>{el['amount']}</p>
                  <p>{el['unit']}</p>
                </Stack>
              </Stack>
          )): ''}

          <p>{recipeInfo.info.instructions}</p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSaveItem}>{isSaved ? "Unsave" : "Save"}</Button>
        <Button variant="primary" onClick={handleMakeRecipe}>
          Make recipe
        </Button>
        <Button variant="primary" onClick={handleAddToGrocery}>
          {isAdded ? "Ingredients Added!" : "Add Ingredients to Grocery List"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecipeModal;