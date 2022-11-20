import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Recipe from '../components/Recipe';
import { RecipeProps } from '../App';


type RecipesProps = {
  items: RecipeProps[]
}

// container that displays list of recipe items
const Recipes = (props:RecipesProps) => {

  return (
    <ListGroup horizontal >
        <Row>
        {
          props.items.map( el => (
            <Col xs='9' sm='6' md='5' lg='4' xl='3' key={el.info.id}>
              <ListGroup.Item style={{border:"None"}}>
                <Recipe info={{ id: el.info.id, title: el.info.title, image: el.info.image }} />
              </ListGroup.Item>
            </Col>
          ))
        }
        </Row>
      </ListGroup>
  )
}

export default Recipes;

