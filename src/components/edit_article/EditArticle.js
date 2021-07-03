import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { values, size } from "lodash";
import { store } from 'react-notifications-component';

import { getWikiApiOnly, getWikiApi, updateArticleApi } from "../../api/wiki";

import Success from "../../assets/images/success.svg";
import Save from "../../assets/images/save.svg";

import "./EditArticle.scss";

//import useFetchGet from "../../hooks/useFetchGet";

function EditArticleComponent(props) {

  // Get the props
  const { match } = props;
  const { params } = match;

  // Set modal
  const [modalShow, setModalShow] = useState(false);

  // State main
  const [articles, setArticles] = useState(initialArticleValue());

  // State section
  const [section, setSection] = useState([]);

  // State editor
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Operator for article
  const [articleLoading, setArticleLoading] = useState(false);

  // handleChange
  const handleChange = (e) => { };

  const number = (e) => {
    let ch = String.fromCharCode(e.which);
    if (!(/[0-9.]/.test(ch))) {
      e.preventDefault();
    }
  }

  // Create useeffect
  useEffect(() => {

    getWikiApi()
      .then(({ items }) => {
        setSection(items.data);
      }).catch((e) => console.log(e))

    getWikiApiOnly(params.id_article)
      .then(response => {
        if (response.message == "Article id does not exist!") {
          console.log("No encontrado");
        } else {
          const articulo = response.items[0];
          setArticles(articleValues(articulo, params.id_sections));
          const html = articulo.content;
          const contentBlock = htmlToDraft(html);
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
          }
        }
      }).catch(() => { })

  }, [params])

  // hanlde editor
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setArticles({
      ...articles,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
  }
  // Handler input
  const onChange = (e) => {
    setArticles({
      ...articles,
      [e.target.name]: e.target.value,
    })
  }
  // Handle submit
  const onSubmit = async (e) => {
    console.log(articles);
    // Prevent default
    e.preventDefault();
    // Initial counter form zero
    let validCount = 0;
    // Foreach data login
    values(articles).some(value => {
      value && validCount++
      return null;
    });
    // Valid is complete fields
    if (validCount !== size(articles) || articles.content == '<p></p>') {
      // Show notification danger
      notification("Error al agregar artículo.", "Por favor complete todos los campos del formulario.", "danger");
    } else {
      // Set login
      setArticleLoading(true);
      // Send data to api
      const response = await updateArticleApi(articles, params.id_article);
      console.log(response);
      // Validate response
      if (response.code == 200 && response.status == "success") {
        setArticleLoading(false);
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
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <div className="wrapper-new-article">
              <h3>Editar artículo</h3>
              <Form onChange={onChange} onSubmit={onSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="labeli">Sección</Form.Label>
                      <Form.Control
                        as="select"
                        className="form-control-art"
                        name="section_id"
                        value={articles.section_id}
                        onChange={handleChange}
                      >
                        <option value="">Selecionar sección</option>
                        {
                          section.map(sec => (
                            <option key={sec.id} value={sec.id}>{sec.name}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="labeli">Index</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control-art"
                        name="index"
                        value={articles.index}
                        onChange={handleChange}
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
                        value={articles.title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <span className="labeli">Contenido</span>
                    <div className="content-article">
                      <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={handleEditorChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="labeli">Versión</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control-art"
                        name="version_code"
                        value={articles.version_code}
                        onChange={handleChange}
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
                        value={articles.folio}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label className="labeli">Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        className="form-control-art"
                        onChange={handleChange}
                        value={articles.description}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center opra">
                  <Button className="btn-save" type="submit">
                    {
                      !articleLoading
                        ?
                        <>
                          <img src={Save} alt="Guardar" />
                          <span>Guardar cambios</span>
                        </>
                        : <Spinner animation="border" />
                    }
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          backdrop="static"
          keyboard={false}
        />
      </Container>
    </div>
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
          <Link to="/wiki">
            <div className="btn-create-article">
              <span>¡OK!</span>
            </div>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default withRouter(EditArticleComponent);

// Initial lofin form
const initialArticleValue = (section) => {
  return {
    title: "",
    content: "",
    section_id: "okoko",
    index: "",
    folio: "",
    description: "",
    version_code: ""
  }
}

// Initial lofin form
const articleValues = (a, section) => {
  return {
    title: a.title,
    content: a.content,
    section_id: section,
    index: a.index,
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