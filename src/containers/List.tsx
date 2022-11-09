import React, { useState } from 'react';
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

const List = ({type}:ListProps) => {
  type Ingredient = {
    name: string,
    unit: string | null,
    num: number
  }
  const [ingredients, setIngredients] = useState<Ingredient[]>(
  [{
    name: "Eggs",
    unit: "count",
    num: 12
  }, {
    name: "Flour",
    unit: "cups",
    num: 6
  }])


  const [showForm, setShowForm] = useState<boolean>(false)

  const handleAddItem = (itemName:string, itemNum:number, itemUnit:string | null) => {
    //objectArray.findIndex((item) => item.name === 'Israel'); returns -1 if not present
    if (ingredients.findIndex((item) => item.name === itemName) !== -1) {
      alert("Item already exists in list")
      return
    }
    const newItem:Ingredient = {name:itemName, unit:itemUnit, num:itemNum}
    setIngredients(prev => [...prev, newItem])
    console.log(ingredients)
  }

  const handleDeleteItem = (name: string) => {
    var newIngredients = ingredients.filter(e => e.name !== name)
    setIngredients(newIngredients)
  }

  return (
    <Container>
      <Row>
        <div style={{textAlign: 'center', paddingTop:100, paddingBottom:100}}>
          <h1 >{type} Contents</h1>
        </div>
      </Row>

      {/* Bug when shrunk down to mobile size:
        the search bar take up the entire space. 
        
        - Ask stefan for setting max width*/}
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