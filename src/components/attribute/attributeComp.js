import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { withRouter, Link } from 'react-router-dom';

import Up from "../../assets/images/up.svg";
import Bien from "../../assets/images/bien.svg";
import "./attributeComp.scss";

import { API_HOST } from "../../utils/constant";

function AttributeComp(props) {

  // Get the props
  const { match } = props;
  const { params } = match;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (e) => {
    // Prevent default
    e.preventDefault();
    console.log('Enviando');
  };

  console.log('Archivo', selectedFile);
  console.log('Estado', isFilePicked);
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
               className={ isFilePicked ?  'closed' : 'open'}
              >
                <div className="wrap-load">
                  {
                    isFilePicked
                      ?
                      (
                        <>
                          <img src={Bien} width="50px"/>
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
    </Container>
  )
}

export default withRouter(AttributeComp);
