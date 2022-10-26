import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import ListItem from '../components/ListItem';
import AddItemForm from '../components/AddItemForm';

type ListProps = {
  type: string
}

const List = ({type}:ListProps) => {

  const ingredients = [{
    name: "Eggs",
    unit: "count",
    num: 12
  }, {
    name: "Flour",
    unit: "cups",
    num: 6
  }]

  const [showForm, setShowForm] = useState<boolean>(false)

  // const handleAddItem = () => {

  // }

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
          <Button variant="dark" onClick={() => {setShowForm(true)}}>Add New Item</Button>
        </Col>
      </Row>
      {
        !showForm ? "" : 
          <Row className="mb-3">
            <AddItemForm setShowForm={setShowForm}/>
          </Row>
      }

      <Row>
        <ListGroup>
          {
            ingredients.map( ingredient => (
              <ListGroup.Item><ListItem info={ingredient} /></ListGroup.Item>
            ))
          }
        </ListGroup>
      </Row>

    </Container>
  )
}

export default List;