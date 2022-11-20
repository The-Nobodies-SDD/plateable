import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Recipes from './Recipes';
import { useGlobalSavedContext } from '../App';


/*
Saved Recipe class:
  presents saved recipe page to the user. 

  Interacts with Recipe class to get recipe cards
*/
const Saved = () => {


  // allows access to set and receive values from global context
  const { items, setItems } = useGlobalSavedContext()

  useEffect(() => {
    // placeholder data for saved recipes
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

    // sets the global saved state when this component is loaded if it is empty
    if (!items.length) {
      setItems(recipes)
    }
  }, [items.length, setItems])


  return (
    <Container>
      <Row><h1>Saved Recipes</h1></Row>
      <Recipes items={items}/>
    </Container>
  )
}

export default Saved;