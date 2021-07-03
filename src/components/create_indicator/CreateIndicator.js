import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";
import { values, size } from "lodash";
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';

import {createIndicator } from "../../api/indicator";

import "./CreateIndicator.scss";

import BarChart from "../../assets/images/bar-chart.svg";
import Point from "../../assets/images/point.svg";
import PieChart from "../../assets/images/pie-chart.svg";
import OnlyData from "../../assets/images/only-data.svg";
import Percentage from "../../assets/images/percentage.svg";
import Cuadrado from "../../assets/images/cuadrado.svg";
import Success from "../../assets/images/success.svg";
import Save from "../../assets/images/save.svg";

export default function CreateIndicator() {


  const [modalShow, setModalShow] = useState(false);

  const [inputList, setInputList] = useState([{ action: "", name: "" }]);

  const [data, setData] = useState(initialData());

  const [dataLoading, setdataLoading] = useState(false);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setData({
      ...data,
      attributes: list
    })
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { action: "", name: "" }]);
  };

  const handleData = (e) => {
    let value = e.target.name !== "chart_type" ? e.target.value : e.target.id;
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    // Prevent default
    e.preventDefault();
    // Initial counter form zero
    let validCount = 0;
    // Initial counter form zero
    let validAtt = 0;
    // Foreach data login
    values(data).some(value => {
      value && validCount++
      return null;
    });

    values(data.attributes).some(value => {
      value.action && value.name && validAtt++
      return null;
    });

    if (validCount !== size(data) || validAtt !== size(data.attributes)) {
      // Show notification danger
      notification("Error al agregar indicador.", "Por favor complete todos los campos del formulario.", "danger");
    } else {
      // Set state
      setdataLoading(true);
      // Send data to api
      const response = await createIndicator(data);
      if (response.code == 201 && response.status == "success") {
        setdataLoading(false);
        setModalShow(true);
      } else {
        setdataLoading(false);
        if (Array.isArray(response.message)) {
          notification("Error al agregar artículo.", response.message[0], "danger");
        }else{
          notification("Error al agregar artículo.", response.message, "danger");
        }
      }
    }
  }

  return (
    <Container className="wrap-indicator">
      <Link to="/indicators">
        <Button className="atras">Regresar</Button>
      </Link>
      <h3>Crear indicador</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Group>
              <Form.Label className="label-indicator">Nombre</Form.Label>
              <Form.Control
                type="text"
                className="control-indicator"
                name="name"
                value={data.name}
                onChange={handleData}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label-indicator">Espacio en dashboard</Form.Label>
              <Form.Control
                as="select"
                className="control-indicator"
                name="columns"
                value={data.columns}
                onChange={handleData}
              >
                <option value="">Selecciona la rejilla</option>
                <option value="1">1 - 6</option>
                <option value="2">2 - 6</option>
                <option value="3">3 - 6</option>
                <option value="4">4 - 6</option>
                <option value="5">5 - 6</option>
                <option value="6">6 - 6</option>
              </Form.Control>
            </Form.Group>
            <Form.Label className="label-indicator">Campos a mostrar</Form.Label>
            {
              inputList.map((campo, indice) => {
                return (
                  <Row>
                    <Col lg={4}>
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="control-indicator"
                          name="action"
                          value={campo.action}
                          onChange={e => handleInputChange(e, indice)}
                        >
                          <option value="">Acción</option>
                          <option value="sum">Suma</option>
                          <option value="avarage">Promedio</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col lg={5}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className="control-indicator"
                          name="name"
                          value={campo.name}
                          onChange={e => handleInputChange(e, indice)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      {inputList.length !== 1 && <Button className="btn-list-input remove" onClick={() => handleRemoveClick(indice)}>-</Button>}
                      {inputList.length - 1 === indice && <Button className="btn-list-input add" onClick={handleAddClick}>+</Button>}
                    </Col>
                  </Row>
                )
              })
            }
          </Col>
          <Col lg={6}>
            <Form.Label className="label-indicator">Tipo de indicador</Form.Label>
            <Row>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="bar"
                  />
                  <label for="bar" className="label-chart">
                    <img src={BarChart} alt="Barras" />
                  </label>
                </div>
              </Col>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="point"
                  />
                  <label for="point" className="label-chart">
                    <img src={Point} alt="Puntos" />
                  </label>
                </div>
              </Col>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="pie"
                  />
                  <label for="pie" className="label-chart">
                    <img src={PieChart} alt="Pie Chart" />
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="onlyData"
                  />
                  <label for="onlyData" className="label-chart">
                    <img src={OnlyData} alt="Unico Dato" />
                  </label>
                </div>
              </Col>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="square"
                  />
                  <label for="square" className="label-chart">
                    <img src={Cuadrado} alt="Cuadrado" />
                  </label>
                </div>
              </Col>
              <Col lg={4}>
                <div className="indicator-chart">
                  <input
                    name="chart_type"
                    value={data.chart_type}
                    onChange={handleData}
                    type="radio"
                    id="percentage"
                  />
                  <label for="percentage" className="label-chart">
                    <img src={Percentage} alt="Procentaje" />
                  </label>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button type="submit" className="btn-save">
          {
            !dataLoading
              ?
              <>
                <img src={Save} alt="Guardar indicador" />
                <span>Guardar indicador</span>
              </>
              : <Spinner animation="border" />
          }
        </Button>
      </Form>
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
          <img src={Success} alt="Success"/>
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

const initialData = () => {
  return {
    name: "",
    chart_type: "",
    columns: "",
    attributes: []
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