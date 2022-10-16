import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


type ListProps = {
  type: string
}
const List = ({type}:ListProps) => {

  const handleAddItem = () => {

  }
  return (
    <div>
      {type} page


      <ListGroup>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default List;