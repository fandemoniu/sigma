import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Indicators.scss";

import Add from "../../assets/images/add.svg";
import BarChart from "../../assets/images/bar-chart.svg";
import PieChart from "../../assets/images/pie-chart.svg";
import Percentage from "../../assets/images/percentage.svg";
import Cuadrado from "../../assets/images/cuadrado.svg";
import Indi from "../../assets/images/indi.svg";
import Edit from "../../assets/images/edit.png";
import Gauge from "../../assets/images/gauge.svg";
import Waves from "../../assets/images/waves.svg";
import Donut from "../../assets/images/donut.svg";

import useIndicators from "../../hooks/useIndicators";

export default function IndicatorsComponent() {
  const { data: indicator, loading } = useIndicators();
  return (
    <Container className="super-indicador">
      <Link to="/create-indicator">
        <Button className="wrap-btn-board">
          <img src={Add} />
          <span>Crear indicador</span>
        </Button>
      </Link>
      <h3 className="tabler">Mis indicadores</h3>
      {
        loading
          ?
          <div className="text-center indi-clipor">
            <Spinner animation="border" role="status" variant="primary"></Spinner>
          </div>
          : !indicator.length > 0
            ?
              <Alert variant="primary mr-50 text-center">
                No se encontraron registros de indicadores en la base de datos.
              </Alert>
            :
            <Table striped bordered hover className="table-board">
              <thead>
                <tr className="tr-table ">
                  <th></th>
                  <th>Indicador</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  indicator.map((ind, i) => {
                    return (
                      <tr className="tr-table back" key={i}>
                        <td>
                          {
                            (ind.chart_type === 'bar' && <img src={BarChart} alt="BarChart" />) ||
                            (ind.chart_type === 'gauge' && <img src={Gauge} alt="Gauge" />) ||
                            (ind.chart_type === 'pie' && <img src={PieChart} alt="PieChart" />) ||
                            (ind.chart_type === 'waves' && <img src={Waves} alt="Waves" />) ||
                            (ind.chart_type === 'donut' && <img src={Donut} />) ||
                            (ind.chart_type === 'percentage' && <img src={Percentage} />)
                          }
                        </td>
                        <td>{ind.name}</td>
                        <td className="text-center">
                          <Link to={`/attribute/${ind?.id}`}>
                            <div className="powerfull">
                              <img src={Edit} className="pencil" alt="Edit" />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

      }
      <div className="wrap-indi">
        <img src={Indi} alt="Greom" />
      </div>
    </Container>
  )
}