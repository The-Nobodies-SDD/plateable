import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Stack from 'react-bootstrap/esm/Stack';

import { updateSaved, selectSaved } from '../features/saved/savedSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';


type RecipeModalProps = {
  id: string,
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipeModal = (props:RecipeModalProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [ingredients, setIngredients] = useState([])

  // access global saved state
  const savedGlobal = useAppSelector(selectSaved);
  // accesses to functions to update global state
  const dispatch = useAppDispatch();

  const [recipeInfo, setRecipeInfo] = useState({
    id: props.id,
    title: "",
    image: "",
    sourceUrl: "",
    ingredients: [],
    time: "",
    instructions: ""
  })

  // Functionality for Saving a recipe
  useEffect(() => {
    const found = savedGlobal.find(el => {
      return el.info.id === props.id
    })

    if (found) {
      setIsSaved(true)
    }
    // gets all of the necessary information for the recipe
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.id}/information`,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(res => {
      const data = res.data;

      setRecipeInfo({
        id: props.id,
        sourceUrl: data.sourceUrl,
        ingredients: data.extendedIngredients,
        title: data.title,
        image: data.image,
        time: data.readyInMinutes,
        instructions: data.instructions
      })

      setIngredients(data.extendedIngredients)

    }).catch(function (error) {
      console.error(error);
    });
  }, [savedGlobal, props.id])

  // Functionality for moving recipe to saved recipe
  const handleSaveItem = () => {
    if (isSaved) {
      const newItems = savedGlobal.filter(el => el.info.id !== props.id);
      dispatch(updateSaved(newItems));
      setIsSaved(false);
    } else {
      dispatch(updateSaved([...savedGlobal, {info:{...recipeInfo}}]));
      setIsSaved(true);
    }
  }

  return (

    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{recipeInfo.title}</Modal.Title>
      </Modal.Header>
      <img src={recipeInfo.image} alt="" height="500rem"/>
      <Modal.Body>
        <div className='recipeModal__body'>
          <p>Estimated cooking time: {recipeInfo.time} minutes</p>
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

          <p>{recipeInfo.instructions}</p>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSaveItem}>{isSaved ? "Unsave" : "Save"}</Button>
        <Button variant="secondary" onClick={() => props.setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.setShow(false)}>
          Add Ingredients to Grocery List
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecipeModal;