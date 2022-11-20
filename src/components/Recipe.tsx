import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RecipeModal from './RecipeModal';

type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
  }
}

/*
  Recipe Class:
    Displays and structures Recipe information.
    Links recipe cards to modal with information.


    Interacts with Recipes class
*/
const Recipe = ({info}:RecipeProps) => {
  const [show, setShow] = useState(false);
 
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{color:"black", border:"None", background:"None", padding:"0"}} onClick={handleShow}>
      <Card >
        <Card.Img className="img-fluid" variant="top" src={info.image} style={{ width: '18rem', height:'18rem'}}/>
        <Card.Body>
          <Card.Title>
            {info.title} 
          </Card.Title>
        </Card.Body>
      </Card>
      </Button>


      {show ? <RecipeModal id={info.id} show={show} setShow={setShow}/> : ''}
    </>
  );
}

export default Recipe;