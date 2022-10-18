import React, { useState } from 'react';
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
		unit: string,
		num: number
	}
}

const ListItem = ({info}:ListItemProps) => {


	const [itemUnit, setItemUnit] = useState<string | null>(info.unit)
	const [itemNum, setItemNum] = useState(info.num)

	const units = ["lbs", "oz", "fl. oz", "count", "tbs", "tsp", "cups"]

	const handleUnitChange = (eventKey: string | null) => {
		setItemUnit(eventKey)
	}

	const handleCountChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setItemNum(itemNum + parseInt(event.currentTarget.value))
	}

	return (
		<div>{/* Content will be drawn from db server*/}
			<Container>
				<Row>
					<Col> <p> {info.name} </p> </Col> 
					
					<Col xs="auto" sm="auto" md="auto" lg="auto"> 
						<Dropdown onSelect={handleUnitChange}>
							{/* HOW DO WE ADD ACTIONS SO IT SHOWS WHICH IS SELECTED???*/}
							<Dropdown.Toggle variant="outline-dark"> {itemUnit} </Dropdown.Toggle>
							<Dropdown.Menu>
								{
									units.map( u => <Dropdown.Item eventKey={u}> {u} </Dropdown.Item>)
								}
							</Dropdown.Menu>
						</Dropdown>
					</Col>

					{/* <Container fluid> */}
						<Col xs="auto" sm="auto" md="auto" lg="auto"> 
							<Button variant="outline-dark" onClick={handleCountChange} value={-1}>-</Button> 
						</Col>
						
						<Col xs={2} sm={2} md={2} lg={2}> 
							<InputGroup > {/* fix length, also check the xs, sm, md, lg*/}
								<Form.Control value={itemNum} aria-label="num" />
							</InputGroup>
						</Col>

						<Col xs="auto" sm="auto" md="auto" lg="auto">
							<Button variant="outline-dark" onClick={handleCountChange} value={1}>+</Button>
						</Col>
						
					{/* </Container> */}
				</Row>
			</Container>
		</div>
	)
};

export default ListItem;