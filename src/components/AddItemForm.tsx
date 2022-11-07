import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

type AddItemProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddItemForm = ({setShowForm}:AddItemProps) => {

  const [itemUnit, setItemUnit] = useState<string | null>('count')

  // current options for units
	const units = ["count", "lbs", "oz", "fl. oz", "tbs", "tsp", "cups"]

  const handleUnitChange = (eventKey: string | null) => {
    setItemUnit(eventKey);
	}

  return (
    <Form>
      <Row className="align-items-end">

      <Col>
        <Form.Label htmlFor="newItemName">
          Enter the Item
        </Form.Label>
        <InputGroup>
          <Form.Control 
            id="newItemName"
            placeholder="Item Name"
            type="text"
          />
        </InputGroup>
      </Col>

      <Col className="d-flex justify-content-between">
        <Dropdown onSelect={handleUnitChange}>
          <Dropdown.Toggle variant="outline-dark"> {itemUnit} </Dropdown.Toggle>
          <Dropdown.Menu>
            {
              // loops through each item in the units array and displays it as a dropdown item
              units.map( u => <Dropdown.Item eventKey={u}> {u} </Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      
        <div>
          <Button variant="dark">Add</Button>
          <Button variant="outline-dark" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
      </Col>
      </Row>
    </Form>
  )
};

export default AddItemForm;