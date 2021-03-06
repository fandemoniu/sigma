import React, { useState, useEffect, useMemo } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { values, size } from "lodash";
import { store } from 'react-notifications-component';
import { useDropzone } from 'react-dropzone';

import { getWikiApiOnly, getWikiApi, updateArticleApi } from "../../api/wiki";

import Success from "../../assets/images/success.svg";
import Save from "../../assets/images/save.svg";
import FileImage from "../../assets/images/file.svg";

import "./EditArticle.scss";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 15,
  height: 150,
  justifyContent: 'center',
  borderColor: '#225DA9',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

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

  const [files, setFiles] = useState([]);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: file.type == 'image/png' || file.type == 'image/jpeg' ? URL.createObjectURL(file) : FileImage,
      })));
      setArticles({
        ...articles,
        documents: acceptedFiles,
      })
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

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
        setSection(items);
      }).catch((e) => console.log(e))

    getWikiApiOnly(params.id_article)
      .then(response => {
        if (response.message == "Article id does not exist!") {
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
      notification("Error al agregar art??culo.", "Por favor complete todos los campos del formulario.", "danger");
    } else {
      // Set login
      setArticleLoading(true);
      // Send data to api
      const response = await updateArticleApi(articles, params.id_article);
      // Validate response
      if (response.code == 200 && response.status == "success") {
        setArticleLoading(false);
        setModalShow(true);
      } else {
        setArticleLoading(false);
        if (Array.isArray(response.message)) {
          notification("Error al agregar art??culo.", response.message[0], "danger");
        } else {
          notification("Error al agregar art??culo.", response.message, "danger");
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
              <h3>Editar art??culo</h3>
              <Form onChange={onChange} onSubmit={onSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="labeli">Secci??n</Form.Label>
                      <Form.Control
                        as="select"
                        className="form-control-art"
                        name="section_id"
                        value={articles.section_id}
                        onChange={handleChange}
                      >
                        <option value="">Selecionar secci??n</option>
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
                      <Form.Label className="labeli">T??tulo</Form.Label>
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
                <span className="labeli mb-15">Archivos</span>

              <div>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <span>Arrastre y suelte sus archivos aqu??, o haga clic para seleccionar archivos</span>
                </div>
                <aside style={thumbsContainer}>
                  {thumbs}
                </aside>
              </div>
                <Row>
                  <Col lg={6}>
                    <Form.Group>
                      <Form.Label className="labeli">Versi??n</Form.Label>
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
                      <Form.Label className="labeli">Descripci??n</Form.Label>
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
          <h1>??Guardado con exito!</h1>
        </div>
        <div className="wrapper-button-article">
          <Link to="/wiki">
            <div className="btn-create-article">
              <span>??OK!</span>
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