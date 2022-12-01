import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Recipe from '../components/Recipe';
import { RecipeProps } from '../App';


type RecipesProps = {
  items: RecipeProps[]
}

// container that displays list of recipe items
const Recipes = (props:RecipesProps) => {

  return (
    // <ListGroup horizontal style={{margin: "auto", maxWidth: "60vw"}}>
      <div className="recipes">
        {/* // <Row style={{maxWidth: "100vw"}}> */}
        {
          props.items.map( el => (
            // <Col xs='9' sm='6' md='5' lg='4' xl='2' key={el.info.id}>
              // <ListGroup.Item style={{border:"none"}}>
                <Recipe info={{ id: el.info.id, title: el.info.title, image: el.info.image }} />
              // </ListGroup.Item>
            // </Col>
          ))
        }
        {/* </Row> */}
      </div>
      // </ListGroup>
  )
}

export default Recipes;

