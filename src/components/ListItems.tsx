import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const ListItem = () => {
	return (
		<div>
			<ListGroup>
				<p>Name of Item</p>
				
				<Dropdown>Units</Dropdown>

				<Button>-</Button>
          {/* Number goes here */}
				<Button>+</Button>
				
			</ListGroup>
		</div>
	)
};

export default ListItem;