import React, { useState } from 'react';
import { Container, Row, Col, Table, Modal, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Indicators.scss";

import Add from "../../assets/images/add.svg";
import BarChart from "../../assets/images/bar-chart.svg";
import Point from "../../assets/images/point.svg";
import PieChart from "../../assets/images/pie-chart.svg";
import OnlyData from "../../assets/images/only-data.svg";
import Percentage from "../../assets/images/percentage.svg";
import Cuadrado from "../../assets/images/cuadrado.svg";
import Indi from "../../assets/images/indi.svg";
import Edit from "../../assets/images/edit.png";

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
            loading
              ?
              <div className="text-center clipor-user">
                <Spinner animation="border" role="status" variant="primary"></Spinner>
              </div>
              :
              <>
                {
                  indicator.map((ind, i) => {
                    return (
                      <tr className="tr-table back" key={i}>
                        <td>
                          {
                            (ind.chart_type === 'bar' && <img src={BarChart} alt="BarChart" />) ||
                            (ind.chart_type === 'point' && <img src={Point} alt="Point" />) ||
                            (ind.chart_type === 'pie' && <img src={PieChart} alt="PieChart" />) ||
                            (ind.chart_type === 'onlyData' && <img src={OnlyData} alt="OnlyData" />) ||
                            (ind.chart_type === 'square' && <img src={Cuadrado} />) ||
                            (ind.chart_type === 'percentage' && <img src={Percentage} />)
                          }
                        </td>
                        <td>{ind.name}</td>
                        <td className="text-center">
                          {/* <div className="powerfull">
                            <img src={Edit} className="pencil" alt="Edit" />
                          </div> */}
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
              </>
          }
        </tbody>
      </Table>
      <div className="wrap-indi">
        <img src={Indi} alt="Greom" />
      </div>
    </Container>
  )
}