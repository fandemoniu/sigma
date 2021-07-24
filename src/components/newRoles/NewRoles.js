import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Media, Spinner, Button, Form, Modal } from "react-bootstrap";

import usePermissions from "../../hooks/usePermissions";
import useRoles from "../../hooks/useRoles";

import Add from "../../assets/images/add.svg";
import Avatar from "../../assets/images/avatar.svg";
import Personal from "../../assets/images/Personal.svg";
import Success from "../../assets/images/success.svg";

import { store } from 'react-notifications-component';

import { createRol } from "../../api/rol";

import "./NewRoles.scss";

export default function NewRoles() {

  const [edit, setEdit] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [checked, setChecked] = useState(false);

  const { data: roles, load } = useRoles();

  const { data: permissions, loading } = usePermissions();

  const [showMe, setShowMe] = useState(true);

  const handleShow = () => setShowMe(true);

  const [rol, setRol] = useState({
    name: "",
    permissions: []
  })

  const handleCheckboxChange = (e) => {
    let newArray = [
      ...rol.permissions,
      { name: e.target.id }
    ];
    if (rol.permissions.includes(e.target.id)) {
      newArray = newArray.filter(permit => permit !== e.target.id);
    }
    setRol({
      ...rol,
      permissions: newArray
    });
  }

  const handleInputChange = (e) => {
    setRol({
      ...rol,
      name: e.target.value
    });
    setChecked(false);
  }

  const resetInput = () => {

    setRol({
      name: "",
      permissions: []
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rol.name.length > 0 || !rol.permissions.length > 0) {
      notification("Error al agregar el rol.", "Por favor ingresa permisos o añade un rol", "danger");
    } else {
      // Send data to api
      const response = await createRol(rol);
      // Validate response
      if (response.code == 201 && response.status == "success") {
        resetInput();
        setModalShow(true);
        setShowMe(true);
      } else {
        if (Array.isArray(response.message)) {
          notification("Error al agregar artículo.", response.message[0], "danger");
        } else {
          notification("Error al agregar artículo.", response.message, "danger");
        }
      }
    }
  }

  return (
    <>
      <Link to="/users">
        <Button className="atras">Regresar</Button>
      </Link>
      <div className="wrap-personal">
        <img src={Personal} alt="Personal" />
      </div>
      <Container>
        <Row>
          <Col>
            <div className="card-user">
              {
                load
                  ?
                  <div className="text-center clipor-user">
                    <Spinner animation="border" role="status" variant="primary"></Spinner>
                  </div>
                  :
                  <>
                    <>
                      {
                        showMe
                          ?
                          <div className="cardi-info">
                            <Form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                className="roller"
                                placeholder="Nombre del Rol"
                                value={rol.name}
                                onChange={handleInputChange}
                              />
                            </Form>
                          </div>

                          : null
                      }
                    </>
                    {
                      roles.map(rol => {
                        return (
                          <div className="card-info-user" key={rol.id}>
                            <Media>
                              <Media.Body>
                                <span className="name-user">{rol.name}</span>
                                {/* <Button className="edit-rol" onClick={() => setEdit(true)}>Editar</Button> */}
                              </Media.Body>
                            </Media>
                          </div>
                        )
                      })
                    }
                  </>
              }
              <Button className="wrap-button-col" onClick={handleSubmit}>
                <img src={Add} alt="Agregar Rol" />
                <span>Añadir Rol</span>
              </Button>
            </div>
          </Col>
          <Col>
            <div className="card-user">
              <h4>Permisos</h4>
              {
                loading
                  ?
                  <div className="text-center clipor-user">
                    <Spinner animation="border" role="status" variant="primary"></Spinner>
                  </div>
                  :
                  <>
                    {
                      permissions.map(permi => {
                        return (
                          <div key={permi.id}>
                            <input
                              id={permi.name}
                              type="checkbox"
                              name="permissions"
                              className="perm"
                              onChange={handleCheckboxChange}
                              value={permi.name}
                              defaultChecked={checked}
                            />
                            <label for={permi.name} className="label-custome">
                              {permi.name}
                            </label>
                          </div>
                        )
                      })
                    }
                  </>
              }
            </div>
          </Col>
        </Row>
        <EditModal
          show={edit}
          onHide={() => setEdit(false)}
        />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          backdrop="static"
          keyboard={false}
        />
      </Container>
    </>
  )
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="text-center suc-modal">
          <img src={Success} alt="Success" />
          <h1>¡Guardado con exito!</h1>
        </div>
        <div className="wrapper-button-article">
          <Link to="/users">
            <div className="btn-create-article">
              <span>¡OK!</span>
            </div>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
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

function EditModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
