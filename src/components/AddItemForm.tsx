import React, { useRef, useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

type AddItemProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>, 
  handleAddItem: (itemName:string, count:number, unit:string | null) => void
}

/*
  AddItemForm Class:
    Update ingredient quantities from user interaction with buttons or typing in a text box.
    Sync with Firebase (database) 

    Interacts with List class.
*/
const AddItemForm = (props:AddItemProps) => {
  const [itemNum, setItemNum] = useState<number>(1)
  const [itemUnit, setItemUnit] = useState<string | null>('count')
  const itemRef = useRef<HTMLInputElement>(null);

  // current options for units
	const units = ["count", "lbs", "oz", "fl. oz", "tbs", "tsp", "cups"]

  // Function for changing number
  const handleNumChange = (amount:string) => {
    setItemNum(Number(amount));
  }

  // Function for changing units
  const handleUnitChange = (eventKey: string | null) => {
    setItemUnit(eventKey);
	}

  // Funtion for submitting new ingredient
  const handleSubmit = () => {
    if (!(itemRef.current &&  itemRef.current?.value.length)) {
      alert("nothing input");
      return;
    }
    props.handleAddItem(itemRef.current.value, itemNum, itemUnit);
    itemRef.current.value = "";
    setItemNum(1);
    setItemUnit('count');
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
            ref={ itemRef }
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
          <InputGroup>
            <Form.Control placeholder="number" aria-label="num" type="number" 
              onChange={e => handleNumChange(e.target.value)} value={itemNum}/>
          </InputGroup>
        </div>

        <div>
          <Button variant="dark" onClick={handleSubmit}>Add</Button>
          <Button variant="outline-dark" onClick={() => props.setShowForm(false)}>Cancel</Button>
        </div>
      </Col>
      </Row>
    </Form>
  )
};

export default AddItemForm;