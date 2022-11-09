import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


// type RecipeProps = {
//   info: {
// 		name: string,
// 		cook_time: string,
//     desc: string,
// 		link: string, 
//     img : string
// 	}
// }

type RecipeProps = {
  info: {
    id: string,
    title: string,
    image: string,
    missingIng: string[]
  }
}

const Recipe = ({info}:RecipeProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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

        {/* <Card.Subtitle className="mb-2 text-muted">
          {info.cook_time} 
        </Card.Subtitle> */}

        {/* <Card.Text>
          {info.desc}
        </Card.Text> */}

        {/* <Card.Link href = {info.link}>
          Link
        </Card.Link> */}
      </Card.Body>
    </Card>
    </Button>


    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{info.title}</Modal.Title>
        </Modal.Header>
        <img src={info.image} alt="" height="500rem"/>
        {/* <Modal.Body>
          <div><p>Cook Time: {info.cook_time}</p></div>
          {info.desc}
        </Modal.Body> */}
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