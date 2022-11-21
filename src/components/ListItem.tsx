import React, { useState } from 'react';
import { Trash } from 'react-bootstrap-icons'
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

type ListItemProps = {
  info: {
		name: string,
		unit: string | null,
		count: number
	}, 
	handleDeleteItem: (name: string) => void
}


/*
  ListItem Class:
    Structures ingredient information for the user (title, quantity, units)
		Holds the structure for updating ingredient informaiton (quantity, units)

		Called by List class
*/
const ListItem = (props:ListItemProps) => {

	// keeps track of the type of unit for this item
	const [itemUnit, setItemUnit] = useState<string | null>(props.info.unit);
	
	// keeps track of the nums of units for this item
	const [itemNum, setItemNum] = useState(props.info.count);

	// current options for units
	const units = ["count", "lbs", "oz", "fl. oz", "tbs", "tsp", "cups"];

	// takes in the event key from the select dropdown and sets the unit state
	const handleUnitChange = (eventKey: string | null) => {
		setItemUnit(eventKey)
	}

	// takes in +1 or -1 to change the count state when a button is pressed
	const handleCountChange = (amount:number) => {
		setItemNum(prev => prev + amount)
	}

	const handleNumChange = (amount:string) => {
		setItemNum(Number(amount))
	}

	return (
		<div>{/* Content will be drawn from db server*/}
			<Container>
				<Row>
					<Col> <p> {props.info.name} </p> </Col> 
					
					<Col xs="auto" sm="auto" md="auto" lg="auto"> 
						<Dropdown onSelect={handleUnitChange}>
							{/* HOW DO WE ADD ACTIONS SO IT SHOWS WHICH IS SELECTED???*/}
							<Dropdown.Toggle variant="outline-dark"> {itemUnit} </Dropdown.Toggle>
							<Dropdown.Menu>
								{
									// loops through each item in the units array and displays it as a dropdown item
									units.map( u => <Dropdown.Item eventKey={u}> {u} </Dropdown.Item>)
								}
							</Dropdown.Menu>
						</Dropdown>
					</Col>

					{/* <Container fluid> */}
						<Col xs="auto" sm="auto" md="auto" lg="auto"> 
							<Button variant="outline-dark" onClick={() => handleCountChange(-1)}>-</Button> 
						</Col>
						
						<Col xs={2} sm={2} md={2} lg={2}> 
							<InputGroup > {/* fix length, also check the xs, sm, md, lg*/}
								<Form.Control value={itemNum} aria-label="num" type="number" onChange={e => handleNumChange(e.target.value)} />
							</InputGroup>
						</Col>

						<Col xs="auto" sm="auto" md="auto" lg="auto">
							<Button variant="outline-dark" onClick={() => handleCountChange(1)}>+</Button>
						</Col>

						<Col xs="auto" sm="auto" md="auto" lg="auto">
							<Button variant="outline-dark" onClick={() => props.handleDeleteItem(props.info.name)}> <Trash /> </Button>
						</Col>
						
					{/* </Container> */}
				</Row>
			</Container>
		</div>
	)
};

export default ListItem;