import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


type RecipeProps = {
  info: {
		name: string,
		cook_time: string,
    desc: string,
		link: string, 
    img : string
	}
}

const Recipe = ({info}:RecipeProps) => {
  return (
    <Container>
    <Card style={{ width: '18rem' }}>
      <Card.Img className="img-fluid" variant="top" src={info.img} />
      <Card.Body>
        <Card.Title>
          {info.name} 
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {info.cook_time} 
        </Card.Subtitle>

        <Card.Text>
          {info.desc}
        </Card.Text>

        <Card.Link href = {info.link}>
          Link
        </Card.Link>
      </Card.Body>
    </Card>
    </Container>

  )
};

export default Recipe;