import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useGlobalSavedContext} from '../App';

type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
    missingIng: string[]
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
  const [isSaved, setIsSaved] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {items, setItems} = useGlobalSavedContext()

  // Functionality for Saving a recipe
  useEffect(() => {
    const found = items.find(el => {
      return el.info.id === info.id
    })

    if (found) {
      setIsSaved(true)
    }
  }, [info.id, items])

  // Functionality for moving recipe to saved recipe
  const handleSaveItem = () => {
    if (isSaved) {
      const newItems = items.filter(el => el.info.id !== info.id);
      setItems(newItems);
      setIsSaved(true);
    } else {
      setItems([...items, {info:{...info}}]);
      setIsSaved(false);
    }
  }


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


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{info.title}</Modal.Title>
        </Modal.Header>
        <img src={info.image} alt="" height="500rem"/>
        <Modal.Body>
          <Button onClick={handleSaveItem}>{isSaved ? "Unsave" : "Save"}</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Ingredients to Grocery List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Recipe;