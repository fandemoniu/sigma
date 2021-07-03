import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { values, size } from "lodash";
import { store } from 'react-notifications-component';

import "./CreateArticle.scss";
import Add from "../../assets/images/add.svg";
import Success from "../../assets/images/success.svg";

import { getToken } from "../../api/auth";
import useFetch from "../../hooks/useFetch";
import { createArticleApi, createSections } from "../../api/wiki";
import { Link } from 'react-router-dom';

export default function CreateArticle() {
  // Set modal
  const [modalShow, setModalShow] = useState(false);

  const [smShow, setSmShow] = useState(false);

  const [bandera, setbandera] = useState(false);

  const [section, setSection] = useState({
    name: "",
    description: "Wiki Sections"
  });

  // State form data login
  const [articleData, setArticleData] = useState(initialArticleValue());
  // Operator for article
  const [articleLoading, setArticleLoading] = useState(false);
  // State editor
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // Get token
  const token = getToken();
  // Get sections
  const { data } = useFetch(token, bandera);
  // Validate data
  const sections = !!data && data;
  // hanlde editor
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setArticleData({
      ...articleData,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
  }
  const handleChange = () => { }

  const muni = (e) => {
    setSection({
      ...section,
      [e.target.name]: e.target.value,
    })
  }

  const number = (e) => {
    let ch = String.fromCharCode(e.which);
    if (!(/[0-9.]/.test(ch))) {
      e.preventDefault();
    }
  }

  const handleBandera = () => {
    setbandera(!bandera);
  }

  const resetInput = () => {
    setArticleData(initialArticleValue());
    setEditorState(EditorState.createEmpty());
  }
  // Handler input
  const onChange = (e) => {
    setArticleData({
      ...articleData,
      [e.target.name]: e.target.value,
    })
  }

  const sendSection = async (e) => {
    // Prevent default
    e.preventDefault();
    // Initial counter form zero
    let validSection = 0;
    // Foreach data login
    values(section).some(value => {
      value && validSection++
      return null;
    });
    if (validSection !== size(section)) {
      // Show notification danger
      notification("Error al agregar sección.", "Por favor ingrese una sección.", "danger");
    } else{
      // Send data to api
      const response = await createSections(section);
      // Validate response
      if (response.code == 201 && response.status == "success") {
        handleBandera();
        setSmShow(false);
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
  // Handle submit
  const onSubmit = async (e) => {
    // Prevent default
    e.preventDefault();
    // Initial counter form zero
    let validCount = 0;
    // Foreach data login
    values(articleData).some(value => {
      value && validCount++
      return null;
    });
    // Valid is complete fields
    if (validCount !== size(articleData) || articleData.content == '<p></p>') {
      // Show notification danger
      notification("Error al agregar artículo.", "Por favor complete todos los campos del formulario.", "danger");
    } else {
      // Set login
      setArticleLoading(true);
      // Send data to api
      const response = await createArticleApi(token, articleData);
      // Validate response
      if (response.code == 201 && response.status == "success") {
        setArticleLoading(false);
        resetInput();
        setModalShow(true);
      } else {
        setArticleLoading(false);
        if (Array.isArray(response.message)) {
          notification("Error al agregar artículo.", response.message[0], "danger");
        } else {
          notification("Error al agregar artículo.", response.message, "danger");
        }
      }
    }
  }
  console.log(section);
  return (
    <Container>
      <Link to="/wiki">
        <Button className="atras">Regresar</Button>
      </Link>
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <div className="wrapper-new-article">
            <h3>Crear artículo</h3>
            <Form onChange={onChange} onSubmit={onSubmit}>
              <Row>
                <Col lg={6}>
                  <Form.Label className="labeli">
                    Sección
                    <Button className="add-sec" onClick={() => setSmShow(true)}>Agregar sección</Button>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="form-control-art"
                    name="section_id"
                    onChange={handleChange}
                    value={articleData.section_id}
                  >
                    <option value="">Selecionar sección</option>
                    {
                      sections.map(sec => (
                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                      ))
                    }
                  </Form.Control>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="labeli">Index</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-art"
                      name="index"
                      onChange={handleChange}
                      value={articleData.index}
                      onKeyPress={number}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <Form.Group>
                    <Form.Label className="labeli">Título</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-art"
                      name="title"
                      onChange={handleChange}
                      value={articleData.title}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <span className="labeli">Contenido</span>
              <div className="content-article">
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={handleEditorChange}
                />
              </div>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="labeli">Versión</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-art"
                      name="version_code"
                      onChange={handleChange}
                      value={articleData.version_code}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label className="labeli">Folio</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control-art"
                      name="folio"
                      onChange={handleChange}
                      value={articleData.folio}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="labeli">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  className="form-control-art"
                  onChange={handleChange}
                  value={articleData.description}
                />
              </Form.Group>
              <div className="text-center opra">
                <Button className="btn-save" type="submit">
                  {
                    !articleLoading
                      ?
                      <>
                        <img src={Add} alt="Agregar artículo" />
                        <span>Agregar artículo</span>
                      </>
                      : <Spinner animation="border" />
                  }
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <ModalSeccion
        show={smShow}
        onHide={() => setSmShow(false)}
        section={section}
        sendsection={sendSection}
        muni={muni}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
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

function ModalSeccion(props) {
  const { sendsection, muni } = props;
  console.log(props);
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Secciones
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={sendsection}>
          <Form.Group>
            <Form.Label className="labeli">Agregar sección</Form.Label>
            <Form.Control
              type="text"
              className="form-control-sec"
              name="name"
              onChange={muni}
            />
            <Button type="submit" className="btn-sec">Agregar sección</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

// Initial lofin form
const initialArticleValue = () => {
  return {
    title: "",
    content: "",
    section_id: "",
    index: "",
    folio: "",
    description: "",
    version_code: ""
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

