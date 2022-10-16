import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Grocery:FC = () => {
  return (
    <div>
      Grocery page

      <ListGroup>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
        <ListGroup.Item>Item in the list</ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default Grocery;