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
    <div className="recipe">
      <Button style={{color:"black", border:"None", background:"None", padding:"0"}} onClick={handleShow}>
      <Card className="recipe__card">
        <Card.Img className="recipe__img img-fluid" variant="top" src={info.image}/>
        <Card.Body>
          <Card.Title className="recipe__title text-truncate">
            {info.title} 
          </Card.Title>
        </Card.Body>
      </Card>
      </Button>


      {show ? <RecipeModal id={info.id} show={show} setShow={setShow}/> : ''}
    </div>
  );
}

export default Recipe;