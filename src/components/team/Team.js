import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Team.scss";

import Add from "../../assets/images/add.svg";
import Flex from "../../assets/images/flex.png";
import Edit from "../../assets/images/edit.png";
import Visibility from "../../assets/images/visibility.png";


export default function Team() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container fluid>
      <Button className="wrap-btn-board" onClick={handleShow}>
        <img src={Add} />
        <span>Crear tablero</span>
      </Button>
      <h3 className="tabler">Mis tableros</h3>
      <Table striped bordered hover className="table-board">
        <thead>
          <tr className="tr-table">
            <th></th>
            <th>Nombre</th>
            <th>Responsable</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr-table back">
            <td>
              <img src={Flex} />
            </td>
            <td>Capacitación</td>
            <td>Santiago Mayagoitia</td>
            <td className="text-center">
              <div className="powerfull">
                <img src={Edit} className="pencil" alt="Edit" />
              </div>
              <Link to="/board">
                <div className="powerfull">
                  <img src={Visibility} className="pencil" alt="Visibility" />
                </div>
              </Link>
            </td>
          </tr>
          <tr className="tr-table back">
            <td>
              <img src={Flex} />
            </td>
            <td>Capacitación</td>
            <td>Santiago Mayagoitia</td>
            <td className="text-center">
              <div className="powerfull">
                <img src={Edit} className="pencil" alt="Edit" />
              </div>
              <Link to="/board">
                <div className="powerfull">
                  <img src={Visibility} className="pencil" alt="Visibility" />
                </div>
              </Link>
            </td>
          </tr>
          <tr className="tr-table back">
            <td>
              <img src={Flex} />
            </td>
            <td>Capacitación</td>
            <td>Santiago Mayagoitia</td>
            <td className="text-center">
              <div className="powerfull">
                <img src={Edit} className="pencil" alt="Edit" />
              </div>
              <Link to="/board">
                <div className="powerfull">
                  <img src={Visibility} className="pencil" alt="Visibility" />
                </div>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
      <>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="title-modal">Crear tablero</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="lab-board">Nombre del tablero</Form.Label>
                <Form.Control type="text" className="in-board"/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="labeli-rol">Permisos</Form.Label>
                <Form.Control as="select" className="in-board">
                  <option>Permiso 1</option>
                  <option>Permiso 2</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  Seleccionar uno o más proyectos para incluir en este tablero
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label className="labeli-rol">Ubicación</Form.Label>
                <Form.Control as="select" className="in-board">
                  <option>Ubucación 1</option>
                  <option>Ubucación 2</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  Selecciona un proyecto de software que contenga este tablero
                </Form.Text>
              </Form.Group>
              <Button type="submit" className="create-btn-board">
                Crear
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </Container>
  )
}