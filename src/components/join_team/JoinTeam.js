import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal, Button, Form, Spinner, Alert } from "react-bootstrap";

import Edit from "../../assets/images/edit.png";
import Save from "../../assets/images/save.svg";
import Equipo from "../../assets/images/Equipo.svg";
import Nube from "../../assets/images/nube.svg";

import { store } from 'react-notifications-component';
import Success from "../../assets/images/success.svg";

import { API_HOST } from "../../utils/constant";
import { getToken } from "../../api/auth";

import useTeam from "../../hooks/useTeam";
import { getTeam, updateStatus } from "../../api/team";

import "./JoinTeam.scss";

export default function JoinTeam() {

  const [modalShow, setModalShow] = useState(false);

  const [bandera, setbandera] = useState(false);

  const { data: team, loading } = useTeam(bandera);

  const [show, setShow] = useState(false);

  const [teamData, setTeamData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBandera = () => {
    setbandera(!bandera);
  }

  const [send, setSend] = useState({
    status: '',
  });

  const handleTeam = (e, id) => {

    getTeam(id)
      .then(res => {
        setTeamData(res);
        setSend({
          ...send,
          id: res[0]?.id
        });
        setShow(true)
      })
      .catch();
  }

  const handleSelect = (e) => {
    setSend({
      ...send,
      [e.target.name]: e.target.value
    })
  }

  const downloadFile = async () => {
    // Api path
    const url = `${API_HOST}/api/download-file/${send.id}`;
    // Generate the params
    const params = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      responseType: "blob"
    }
    const response = await fetch(url, params);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const filename = 'archivo.pdf';
    const a = document.getElementById('a_id');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  }

  const envio = async (e,) => {
    // Prevent default
    e.preventDefault();
    // Valid data
    if (send.status == "") {
      // Show notification danger
      notification("Error al agregar artículo.", "Por favor complete todos los campos del formulario.", "danger");
    } else {

      const response = await updateStatus(send, send.id);

      if (response.code == 200 && response.status == "success") {
        handleBandera();
        handleClose();
        setModalShow(true);

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
    <Container fluid>
      <h3 className="tabler">Unete al equipo</h3>
      {
        loading
          ?
          <div className="text-center indi-clipor">
            <Spinner animation="border" role="status" variant="primary"></Spinner>
          </div>
          : !team.length > 0
            ?
              <Alert variant="primary mr-50 text-center">
                No se encontraron registros de usuarios en la base de datos.
              </Alert>
            :
            <Table striped bordered hover className="table-board">
              <thead>
                <tr className="tr-table">
                  <th></th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  team.map((t, i) => {
                    return (
                      <tr className="tr-table back" key={i}>
                        <td></td>
                        <td>{t.name} {t.last_name}</td>
                        <td>{t.status}</td>
                        <td className="text-center">
                          <div>
                            <Button onClick={(e) => { handleTeam(e, t.id) }} className="me-pencil">
                              <img src={Edit} alt="Edit" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
      }

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
            <Modal.Title className="title-modal">Aspirante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={envio}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="lab-board">Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      className="in-join"
                      defaultValue={teamData[0]?.name}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="lab-board">Aréa laboral</Form.Label>
                    <Form.Control
                      type="text"
                      className="in-join"
                      defaultValue={teamData[0]?.interest_area}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="lab-board">Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      className="in-join"
                      disabled
                      defaultValue={teamData[0]?.phone}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="lab-board">Correo</Form.Label>
                    <Form.Control
                      type="text"
                      className="in-join"
                      disabled
                      defaultValue={teamData[0]?.email}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="lab-board">Estado</Form.Label>
                    <Form.Control
                      as="select"
                      type="text"
                      className="in-join"
                      name="status"
                      onChange={handleSelect}
                    >
                      <option value="">Selecione status</option>
                      <option value="APPLIED">Aplicado</option>
                      <option value="VIEWED">Visto</option>
                      <option value="IN PROCESS">En proceso</option>
                      <option value="FINALIST">Finalista</option>
                      <option value="REJECTED">Rechazado</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6}>

                  <a id='a_id'></a>
                  <a className="download" onClick={downloadFile}>
                    <img src={Nube} alt="Archivo" />
                    <span>Archivo</span>
                  </a>
                </Col>
              </Row>
              <Button type="submit" className="create-btn-join">
                <img src={Save}></img>
                Guardar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
      <div className="wrap-indi">
        <img src={Equipo} alt="Equipo" />
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </Container>
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
