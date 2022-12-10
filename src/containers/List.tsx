import React, { useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Collapse from 'react-bootstrap/Collapse';
import { getList, addToList, deleteFromList } from '../firebase';


import ListItem from '../components/ListItem';
import AddItemForm from '../components/AddItemForm';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateGrocery, selectGrocery, updateGroceryPulled, selectGroceryPulled } from '../features/grocery/grocerySlice';
import { updatePantry, selectPantry, updatePantryPulled, selectPantryPulled } from '../features/pantry/pantrySlice';


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
  const [showForm, setShowForm] = useState<boolean>(false)

  // access the global state for both the grocery and pantry lists
  const groceryGlobal:Ingredient[] = useAppSelector(selectGrocery);
  const groceryHasPulled:boolean = useAppSelector(selectGroceryPulled);
  
  const pantryGlobal:Ingredient[] = useAppSelector(selectPantry);
  const pantryHasPulled:boolean = useAppSelector(selectPantryPulled);

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
      // if the global state has not been loaded, update the value and set ingredients
      if (!pantryHasPulled) {
        getList({ type:type })
          .then(res => {
            const listData:any = res.data
            const myList:any = Object.keys(listData).map( i => {
              return { ...listData[i] }
            })
            dispatch(updatePantry(myList));
            setDisplayIngredients(myList);
            setIngredients(myList);
            dispatch(updatePantryPulled(true));
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        setIngredients(pantryGlobal)
        setDisplayIngredients(pantryGlobal)
      }

    } else {
      // if the grocery global state has not loaded, update it
      if (!groceryHasPulled) {
        getList({ type:type })
          .then(res => {
            const listData:any = res.data
            const myList:any = Object.keys(listData).map( i => {
              return { ...listData[i] }
            })
            dispatch(updateGrocery(myList));
            setDisplayIngredients(myList);
            setIngredients(myList);
            dispatch(updateGroceryPulled(true));
          })
          .catch(err => {
            console.error(err);
          })
        // dispatch(updateGrocery(sample));
        // setDisplayIngredients(sample)
        // setIngredients(sample)
      } else {
        setIngredients(groceryGlobal)
        setDisplayIngredients(groceryGlobal)
      }

      
    }
    setShowForm(false)
  }, [type, dispatch, pantryGlobal, groceryGlobal, groceryHasPulled, pantryHasPulled]);

  
  // Function for adding an existing item to list
  const handleAddItem = (itemName:string, itemNum:number, itemUnit:string | null) => {
    if (ingredients.findIndex((item) => item.name === itemName) !== -1) {
      alert("Item already exists in list")
      return
    }

    const newItem:Ingredient = {name:itemName, unit:itemUnit, count:itemNum}

    addToList({type: type, item: newItem})
    handleUpdate([...ingredients, newItem])
    setDisplayIngredients(prev => [...prev, newItem])
  }

  // Function to handle deleting an item
  const handleDeleteItem = (name: string) => {

    deleteFromList({type: type, name: name})

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
          <h1 >{type.charAt(0).toUpperCase() + type.slice(1)} Contents</h1>
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
        <ListGroup style={{marginBottom: "3rem"}}>
          {
            displayIngredients.map( ingredient => (
              <ListGroup.Item key={ingredient.name}><ListItem info={ingredient} handleDeleteItem={handleDeleteItem}/></ListGroup.Item>
            ))
          }
        </ListGroup>
      </Row>

    </Container>
  )
}

export default List;
