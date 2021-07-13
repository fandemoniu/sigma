import React, { useState } from 'react';
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import { withRouter, Link } from 'react-router-dom';

import Up from "../../assets/images/up.svg";
import Bien from "../../assets/images/bien.svg";
import "./attributeComp.scss";

import { API_HOST } from "../../utils/constant";
import { getToken } from "../../api/auth";

import { store } from 'react-notifications-component';
import Success from "../../assets/images/success.svg";

function AttributeComp(props) {

  // Get the props
  const { match } = props;
  const { params } = match;

  const [modalShow, setModalShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async (e) => {

    e.preventDefault();

    let formData = new FormData();
    formData.append('template', selectedFile);
    formData.append('indicator_id', params.id_indicator);

    const url = `${API_HOST}/api/indicator-response`;
    const parametros = {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      body: formData
    }
    const result = await fetch(url, parametros);
    const response = await result.json();

    if (response.code == 201 && response.status == "success") {
      setModalShow(true);
    } else {
      if (Array.isArray(response.message)) {
        notification("Error al agregar datos.", response.message[0], "danger");
      } else {
        notification("Error al agregar datos.", response.message, "danger");
      }
    }
  };
  return (
    <Container>
      <Link to="/indicators">
        <Button className="atras mb-10">Regresar</Button>
      </Link>
      <Row>
        <Col lg={5}>
          <span className="title-template">
            Descargar plantilla
          </span>
          <a className="btn-template" href={`${API_HOST}/api/download-template?indicator_id=${params.id_indicator}`} download="plantilla_indicador.xlsx">Plantilla</a>
          <span className="title-template">
            Actualizar datos
          </span>
          <Form onSubmit={handleSubmission}>
            <div className="form-indi">
              <input
                type="file"
                name="file"
                onChange={changeHandler}
              />
              <label
                className={isFilePicked ? 'closed' : 'open'}
              >
                <div className="wrap-load">
                  {
                    isFilePicked
                      ?
                      (
                        <>
                          <img src={Bien} width="50px" />
                          <span>Archivo agregado</span>
                        </>
                      ) : (
                        <>
                          <img src={Up} />
                          <span>Cargar Datos</span>
                        </>
                      )
                  }

                </div>
              </label>
              <button type="submit" className="btn-carga">Cargar plantilla</button>
            </div>
          </Form>
          {
            isFilePicked
              ?
              (
                <div className="info-file">
                  <h6>Información del archivo</h6>
                  <p>- Nombre del archivo: {selectedFile.name}</p>
                  <p>- Peso del archivo: {selectedFile.size}</p>
                  <p>- Fecha de modificación:{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</p>
                </div>
              ) : null
          }
        </Col>
        <Col lg={7}></Col>
      </Row>
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
        <div className="wrapper-button-article">
          <Link to="/indicators">
            <div className="btn-create-article">
              <span>¡OK!</span>
            </div>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(AttributeComp);

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
