import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from "react-bootstrap";

import Sigma from "../../assets/images/sigma.svg";
import Google from "../../assets/images/google.svg";
import { values, size } from "lodash";
import { store } from 'react-notifications-component';
import { isEmail } from "../../utils/validate";
import { loginApi, setToken, setUserData, loginGoogle } from "../../api/auth";
import { API_HOST } from "../../utils/constant";

import "./LoginForm.scss";

export default function LoginForm(props) {

  const {setRefreshCheckLogin} = props;

  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

  const [loginData, setloginData] = useState(initialLoginValue());

  const [loginLoading, setloginLoading] = useState(false);

  // useEfeect
  useEffect(() => {
    fetch(`${API_HOST}/api/auth/google`, { method: "GET" })
      .then(response => response.text())
      .then(result => setGoogleLoginUrl(result))
      .catch(error => console.log('error', error));
  }, [])
  // function to helper 
  const onChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
  }
  // Function send data
  const onSubmit = async (e) => {
    // Prevent default
    e.preventDefault();
    // Initial counter form zero
    let validCount = 0;
    // Foreach data login
    values(loginData).some(value => {
      value && validCount++
      return null;
    });
    // Valid is complete fields
    if (validCount !== size(loginData)) {
      // Show notification danger
      notification("Error al iniciar sesión.", "Por favor complete todos los campos del formulario.", "danger");
    } else {
      // Validate the email
      if (!isEmail(loginData.username)) {
        // Show notification danger
        notification("Error en el campo de correo.", "Por favor introduzca una dirección de correo electrónico válida.", "danger");
      } else {
        // Set new value loading
        setloginLoading(true);
        // Call to api login
        const response = await loginApi(loginData);
        // Validate the response
        if (response.status == "error" && response.code == 500) {
          // Show notification danger
          notification("Error al iniciar sesión.", "Correo electrónico o contraseña no válidos", "danger");
          // Set new value loading
          setloginLoading(false);
        } else {
          // Save the token
          setToken(response.token);
          // Save data
          setUserData(JSON.stringify(response.items.profile));
          // Set new value loading
          setloginLoading(false);
          // Set state refresh login
          setRefreshCheckLogin(true);
        }
      }
    }
  }

  return (
    <div>
      <img src={Sigma} alt={"Lean Six Sigma"} />
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="form_label">Correo </Form.Label>
          <Form.Control
            className="form_control"
            type="text"
            placeholder="Ingresa tu correo"
            name="username"
            defaultValue={loginData.username}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="form_label">Password</Form.Label>
          <Form.Control
            className="form_control"
            type="password"
            placeholder="*******"
            name="password"
            defaultValue={loginData.password}
          />
        </Form.Group>
        <Button className="button_login" variant="primary" type="submit">
          {!loginLoading ? "Login" : <Spinner animation="border" />}
        </Button>
      </Form>
      {
        googleLoginUrl &&
        (
          <a className="google-button" href={googleLoginUrl} >
            <img className="img-google" src={Google} />
            <span>Inicia sesión con Google</span>
          </a>
        )
      }
    </div>
  )
}

// Initial lofin form
const initialLoginValue = () => {
  return {
    username: "",
    password: ""
  }
}
// Generate notification
const notification = (title, message, type) => {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
}