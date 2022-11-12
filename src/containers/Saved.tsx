import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Recipes from './Recipes';
import { useGlobalSavedContext } from '../App';

const Saved = () => {
  const { items } = useGlobalSavedContext()

  return (
    <Container>
      <Row><h1>Saved Recipes</h1></Row>
      <Recipes items={items}/>
    </Container>
  )
}

export default Saved;