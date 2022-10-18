import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



type ListProps = {
  type: string
}
const List = ({type}:ListProps) => {

  const handleAddItem = () => {

  }
  return (
    <div style={{maxWidth:750, margin:"auto"}}>
      <Container>
        <Row><div style={{textAlign: 'center', paddingTop:100, paddingBottom:100}}><h1 >{type} Contents</h1></div></Row>

        {/* Bug when shrunk down to mobile size:
          the search bar take up the entire space. 
          
          - Ask stefan for setting max width*/}
        <Row>
          <Col >
            <InputGroup className="mb-3">
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
          
          <Col md="auto">
            <Button variant="dark">Add New Ingredient</Button>
          </Col>
        </Row>
        <Row>
          
        </Row>
        <Row>
          <ListGroup>
            <ListGroup.Item>
              <div>Eggs</div> 
            </ListGroup.Item>
            <ListGroup.Item>Item in the list</ListGroup.Item>
            <ListGroup.Item>Item in the list</ListGroup.Item>
            <ListGroup.Item>Item in the list</ListGroup.Item>
          </ListGroup>
        </Row>

      </Container>
    </div>
  )
}

export default List;