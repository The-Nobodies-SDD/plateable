import React from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const ListItem = () => {
	return (
		<div>{/* Content will be drawn from db server*/}
			<Container>
				<Row>
					<Col> <p>Item</p> </Col> 
					
					<Col xs="auto" sm="auto" md="auto" lg="auto"> 
						<Dropdown>
							{/* HOW DO WE ADD ACTIONS SO IT SHOWS WHICH IS SELECTED???*/}
							<Dropdown.Toggle variant="outline-dark">Units</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">Lbs</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Cups</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
					{/* should we use buttons or smth else? */}
					<Col xs="auto" sm="auto" md="auto" lg="auto"> <Button variant="outline-dark">-</Button> </Col>
					
					<Col xs={2} sm={2} md={2} lg={2}> 
						<InputGroup > {/* fix length, also check the xs, sm, md, lg*/}
							<Form.Control placeholder="10" aria-label="num" />
						</InputGroup>
					</Col>

					<Col xs="auto" sm="auto" md="auto" lg="auto"> <Button variant="outline-dark">+</Button> </Col>
				</Row>
			</Container>
		</div>
	)
};

export default ListItem;