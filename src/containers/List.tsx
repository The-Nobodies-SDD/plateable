import React, { useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Collapse from 'react-bootstrap/Collapse';

import ListItem from '../components/ListItem';
import AddItemForm from '../components/AddItemForm';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateGrocery, selectGrocery } from '../features/grocery/grocerySlice';
import { updatePantry, selectPantry } from '../features/pantry/pantrySlice';


type ListProps = {
  type: string
}

export type Ingredient = {
  name: string, count: number, unit: string | null
}

/*
  List Class:
    Houses the structure of the list pages (pantry list and grocery list)

    Pantry List page and Grocery List page inherit from the list page. 

    List class also interacts with AddItemForm class and ListItem class
*/
const List = ({type}:ListProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  // access the global state for both the grocery and pantry lists
  const groceryGlobal:Ingredient[] = useAppSelector(selectGrocery);
  const pantryGlobal:Ingredient[] = useAppSelector(selectPantry);

  // accesses to functions to update global state
  const dispatch = useAppDispatch();

  // Sample ingredients to be dispayed in demo
  const [displayIngredients, setDisplayIngredients] = useState<Ingredient[]>(ingredients);

  // calls the update function depending on which list is being viewed
  // currently used for both adding and deleting
  const handleUpdate = (list:Ingredient[]) => {
    if (type === "pantry") {
      dispatch(updatePantry(list))
    } else {
      dispatch(updateGrocery(list))
    }
  }



  useEffect(() => {
    // initializes the lists
    // first checks if the global state has already been loaded
    if (type === "pantry") {
      const sample:Ingredient[] = [{
        name: "Sugar",
        unit: "tbs",
        count: 3
      }, {
        name: "Cream",
        unit: "cup",
        count: 4
      },
      {
        name: "Cream of Mushroom Soup",
        unit: "count",
        count: 5
      }, {
        name: "Olive Oil",
        unit: "tsp",
        count: 2
      },
      {
        name: "Garlic",
        unit: "tsp",
        count: 16
      }];

      // if the global state has not been loaded, update the value and set ingredients
      if (pantryGlobal.length === 0 ) {
        dispatch(updatePantry(sample));
        setDisplayIngredients(sample)
        setIngredients(sample)
      } else {
        setIngredients(pantryGlobal)
        setDisplayIngredients(pantryGlobal)
      }

    } else {
      const sample = [{
        name: "Eggs",
        unit: "count",
        count: 12
      }, {
        name: "Flour",
        unit: "cups",
        count: 6
      }, {
        name: "Beef Broth",
        unit: "cups",
        count: 4
      }]

      // if the grocery global state has not loaded, update it
      if (groceryGlobal.length === 0 ) {
        dispatch(updateGrocery(sample));
        setDisplayIngredients(sample)
        setIngredients(sample)
      } else {
        setIngredients(groceryGlobal)
        setDisplayIngredients(groceryGlobal)
      }

    }
  }, [type, dispatch, pantryGlobal, groceryGlobal]);

  
  const [showForm, setShowForm] = useState<boolean>(false)
  
  // Function for adding an existing item to list
  const handleAddItem = (itemName:string, itemNum:number, itemUnit:string | null) => {
    if (ingredients.findIndex((item) => item.name === itemName) !== -1) {
      alert("Item already exists in list")
      return
    }

    const newItem:Ingredient = {name:itemName, unit:itemUnit, count:itemNum}
    handleUpdate([...ingredients, newItem])
    setDisplayIngredients(prev => [...prev, newItem])
  }

  // Function to handle deleting an item
  const handleDeleteItem = (name: string) => {
    const newIngredients = ingredients.filter(e => e.name !== name)
    handleUpdate(newIngredients)
    setDisplayIngredients(newIngredients)
  }

  const filter = (e : any) => {
    const keyword = e.target.value;

    if (keyword !== ''){
      const results = ingredients.filter((ingredient) => {
        return ingredient.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setDisplayIngredients(results);
    } else{
      setDisplayIngredients(ingredients);
    }
  }


  return (
    // Structure of the resulting webpage is in the return statement:
    <Container>
      {/* Title Row */}
      <Row>
        <div style={{textAlign: 'center', paddingTop:100, paddingBottom:100}}>
          <h1 >{type} Contents</h1>
        </div>
      </Row>

      {/* Row for the search and add item bar. */}
      <Row className="mb-3">
        <Col >
          <InputGroup>
            <Form.Control
              placeholder="Search"
              aria-label="Search List"
              aria-describedby="basic-addon2"
              onChange = {filter}
            />
            <Button variant="dark">
              Search
            </Button>
          </InputGroup>
        </Col>
        
        <Col xs="auto" sm="auto" md="auto" lg="auto">
          <Button
            variant="dark"
            onClick={() => {setShowForm(true)}}
            aria-controls="form-collapse"
            aria-expanded={showForm}>
            Add New Item
          </Button>
        </Col>
      </Row>
    
      <Collapse in={showForm}>
        <Row className="mb-3" id="form-collapse">
          <AddItemForm setShowForm={setShowForm} handleAddItem={handleAddItem}/>
        </Row>
      </Collapse>

      {/* Row where the items are displayed. */}
      <Row>
        <ListGroup>
          {
            displayIngredients.map( ingredient => (
              <ListGroup.Item><ListItem info={ingredient} handleDeleteItem={handleDeleteItem}/></ListGroup.Item>
            ))
          }
        </ListGroup>
      </Row>

    </Container>
  )
}

export default List;
