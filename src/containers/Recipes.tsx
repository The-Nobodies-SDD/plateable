import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Recipe from '../components/Recipe';
import ListGroup from 'react-bootstrap/ListGroup';



const Recipes = () => {

  const ingred_dummy = [{
    name: "Scalloped Potatoes",
    cook_time: "1 hour 15 min",
    desc: "Cheesy potatoes and ham ...",
    link:"https://www.spendwithpennies.com/scalloped-potatoes-recipe/",
    img: "https://www.spendwithpennies.com/wp-content/uploads/2018/11/SpendWithPennies-Scalloped-Potatoes-25.jpg"
  },{
    name: "Buffalo Chicken Wings",
    cook_time: "45 min",
    desc: "...",
    link:"https://cafedelites.com/crispy-buffalo-chicken-wings-baked/",
    img: "https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg"
  },{
    name: "Roasted Squash and Peppers",
    cook_time: "30 min",
    desc: "...",
    link:"https://www.melissassouthernstylekitchen.com/roasted-summer-squash-with-sweet-peppers-onion/", 
    img: "https://www.melissassouthernstylekitchen.com/wp-content/uploads/2012/07/editedRoastedSquashMedley-Iron-Skillet-Zucchini-Cornbread-064-768x1039.jpg"
  } 
]



  return (
    <Container>
      <ListGroup>
        <Row><h1>Recipe Search</h1></Row>
        
        <Row>
          <Col>
          {
            ingred_dummy.map( r => (
              <ListGroup.Item><Recipe info={r} /> </ListGroup.Item>
            ))
          }
          </Col>
        </Row>
          
        
      </ListGroup>
    </Container>
  )
}

export default Recipes;