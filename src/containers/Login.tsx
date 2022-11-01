import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase';

type LoginProps = {
  uiConfig: {
    signInFlow: string,
    signInOptions: string[],
    callbacks: {
      signInSuccessWithAuthResult: () => boolean
    }
  }
}

const Login = (props:LoginProps) => {

  return (
    <Container fluid className="align-items-center justify-content-center">
      <Row className="justify-content-center align-items-center">
        <Col className="justify-content-center align-items-center">
          <Card className="appCard" >
            <Card.Title className="pl-3">Please sign in</Card.Title>
            <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;