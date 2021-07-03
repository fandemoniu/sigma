import React from 'react';
import { Container, Row, Col} from "react-bootstrap";
import  LoginForm from "../../components/login"
import Draw from "../../assets/images/draw.svg";

import "./login.scss";

// Component login
export default function Login(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <Container className="login animate__animated animate__fadeIn animate__faster" fluid>
      <Row>
        <LeftComponent setRefreshCheckLogin={ setRefreshCheckLogin } />
        <RightComponent />
      </Row>
    </Container>
  );
}

// Component form login
function LeftComponent(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <Col className="login__left">
      <LoginForm setRefreshCheckLogin={setRefreshCheckLogin} />
    </Col>
  );
}

function RightComponent() {
  return (
    <Col className="login__right">
      <img src={Draw} alt={"Draw"} />
    </Col>
  );
}




