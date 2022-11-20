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


type ListProps = {
  type: string
}

/*
  List Class:
    Houses the structure of the list pages (pantry list and grocery list)

    Pantry List page and Grocery List page inherit from the list page. 

    List class also interacts with AddItemForm class and ListItem class
*/
const List = ({type}:ListProps) => {
  type Ingredient = {
    name: string,
    unit: string | null,
    num: number
  }
  
  // Sample ingredients to be dispayed in demo
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {

      if (type === "pantry") {
          setIngredients(
            [{
              name: "Sugar",
              unit: "tablespoon",
              num: 3
            }, {
              name: "Cream",
              unit: "ounce",
              num: 4
            },
            {
              name: "Cream of Mushroom Soup",
              unit: "can",
              num: 5
            }, {
              name: "Olive Oil",
              unit: "liters",
              num: 2
            },
            {
              name: "Garlic",
              unit: "cloves",
              num: 16
            }])
      }else {
        setIngredients(
            [{
              name: "Eggs",
              unit: "count",
              num: 12
            }, {
              name: "Flour",
              unit: "cups",
              num: 6
            }, {
              name: "Beef Broth",
              unit: "cups",
              num: 4
            }])
      }
    }, [type]);


  const [showForm, setShowForm] = useState<boolean>(false)
  
  // Function for adding an item to list
  const handleAddItem = (itemName:string, itemNum:number, itemUnit:string | null) => {
    if (ingredients.findIndex((item) => item.name === itemName) !== -1) {
      alert("Item already exists in list")
      return
    }
    const newItem:Ingredient = {name:itemName, unit:itemUnit, num:itemNum}
    setIngredients(prev => [...prev, newItem])
  }

  // Function to handle deleting an item
  const handleDeleteItem = (name: string) => {
    const newIngredients = ingredients.filter(e => e.name !== name)
    setIngredients(newIngredients)
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
            ingredients.map( ingredient => (
              <ListGroup.Item><ListItem info={ingredient} handleDeleteItem={handleDeleteItem}/></ListGroup.Item>
            ))
          }
        </ListGroup>
      </Row>

    </Container>
  )
}

export default List;