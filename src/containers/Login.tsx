import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';

type LoginProps = {
  loginHandler: () => void
}

const Login = (props:LoginProps) => {
  return (
    <Container fluid className='d-flex vh-100'>
      <Row className="m-auto align-self-center">
        <Col>
          <Card className="mx-auto">
            <Card.Body>          
              <Card.Title className='mb-5'>Please sign in</Card.Title>
              <Button onClick={props.loginHandler}>Sign in with Google</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;