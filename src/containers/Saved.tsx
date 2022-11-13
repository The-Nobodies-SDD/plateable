import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Recipe from '../components/Recipe';
import ListGroup from 'react-bootstrap/ListGroup';
import {useGlobalSavedContext} from '../App';


/*
Saved Recipe class:
  presents saved recipe page to the user. 

  Interacts with Recipe class to get recipe cards
*/
const Saved = () => {

  // User's saved recipes (from App)
  const { items } = useGlobalSavedContext()

  return (
    <Container>
      <Row><h1>Saved Recipes</h1></Row>
      <ListGroup horizontal >
        <Row>
        {
          items.map( el => (
            <Col xs='9' sm='6' md='5' lg='4' xl='3'>
              <ListGroup.Item style={{border:"None"}}>
                <Recipe info={{ id: el.info.id, title: el.info.title, image: el.info.image, missingIng: el.info.missingIng }} />
              </ListGroup.Item>
            </Col>
          ))
        }
        </Row>
      </ListGroup>
    </Container>
  )
}

export default Saved;