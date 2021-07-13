import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  Label,
  CartesianGrid
} from "recharts";
import { Row, Col, Media, Container, Spinner } from "react-bootstrap";
import { Donut, DonutValue } from 'react-donut-component';
import { PieChart as PieLib } from 'react-minimal-pie-chart';
import Moment from 'moment';
import 'moment/locale/es';

import { useGetBirthday } from "../../api/birthday";

import Avatar from "../../assets/images/avatar.svg";
import Mascot from "../../assets/images/mascota-cumple.svg";

import useIndicators from "../../hooks/useIndicators";

import "./Dashboard.scss";

export default function Dashboard() {

  const { data: indicator, loading } = useIndicators();
  const { data: birthday, load: loadBirthday } = useGetBirthday();

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={8}>
              <Row>
                {
                  indicator.map((indicador, index) => {
                    return (
                      <Col lg={indicador.columns * 2} key={index}>
                        <div className="card-sigma">
                          <h5>{indicador.name}</h5>
                          <div style={{ width: '100%', height: 200 }}>
                            {
                              (indicador.chart_type === 'bar' && (indicador.attributes[0].result_attribute ? <BarSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>)) ||
                              (indicador.chart_type === 'gauge' && (indicador.attributes[0].result_attribute ? <GaugeSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>)) ||
                              (indicador.chart_type === 'pie' && (indicador.attributes[0].result_attribute ? <PieSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>)) ||
                              (indicador.chart_type === 'waves' && (indicador.attributes[0].result_attribute ? <WavesSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>)) ||
                              (indicador.chart_type === 'donut' && (indicador.attributes[0].result_attribute ? <DonutSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>)) ||
                              (indicador.chart_type === 'percentage' && (indicador.attributes[0].result_attribute ? <PercentageSigma data={indicador.attributes} /> : <div className="no-data">Indicador {indicador.name} sin datos</div>))
                            }
                          </div>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
            <Col lg={4}>
              <div className="card-sigma">
                <h5>Cumpleaños</h5>
                <div className="wrap-bitrh">
                  {
                    loadBirthday
                      ?
                      (
                        <div className="text-center dash-clipor">
                          <Spinner animation="border" role="status" variant="primary"></Spinner>
                        </div>
                      )
                      :
                      <>
                        {
                          birthday.map(birth => (
                            <div className="card-bitrh" key={birth.id}>
                              <Media>
                                <img
                                  src={Avatar}
                                  alt="Usuario"
                                  height={50}
                                  width={50}
                                  className="mr-2"
                                />
                                <Media.Body>
                                  <span className="name-birth">{birth.name} {birth.last_name}</span>
                                  <span className="date-birth">{Moment(birth.birthdate).format('dddd, D MMMM YYYY')}</span>
                                </Media.Body>
                              </Media>
                            </div>
                          ))
                        }
                      </>

                  }
                </div>
                <div className="wrap-mascot-birth">
                  <img
                    src={Mascot}
                    alt="Mascota Cumpleaños"
                    height={130}
                    width={200}
                  />
                </div>
              </div>
              <div className="card-sigma">
                <h5>Top Tareas</h5>
                <div className="wrap-task">
                  <div className="card-task">
                    <Media>
                      <img
                        src={Avatar}
                        alt="Usuario"
                        height={50}
                        width={50}
                        className="mr-2"
                      />
                      <Media.Body>
                        <span className="name-task">John Doe</span>
                        <span className="number-task">25</span>
                      </Media.Body>
                    </Media>
                  </div>
                  <div className="card-task">
                    <Media>
                      <img
                        src={Avatar}
                        alt="Usuario"
                        height={50}
                        width={50}
                        className="mr-2"
                      />
                      <Media.Body>
                        <span className="name-task">John Doe</span>
                        <span className="number-task">12</span>
                      </Media.Body>
                    </Media>
                  </div>
                  <div className="card-task">
                    <Media>
                      <img
                        src={Avatar}
                        alt="Usuario"
                        height={50}
                        width={50}
                        className="mr-2"
                      />
                      <Media.Body>
                        <span className="name-task">John Doe</span>
                        <span className="number-task">8</span>
                      </Media.Body>
                    </Media>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

const BarSigma = ({ data }) => {
  let dataGrafica = [];
  data.map((value) => {
    dataGrafica = [
      ...dataGrafica,
      { name: value.name, value: value.result_attribute.value }
    ]
  });
  return (
    <ResponsiveContainer>
      <BarChart data={dataGrafica} className="BarChart">
        <Bar dataKey="value" fill="#225DA9" />
        <XAxis dataKey="name" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  )
}

const GaugeSigma = ({ data }) => {
  let dataGauge = [];
  data.map((value) => {
    dataGauge = [
      ...dataGauge,
      { name: value.name, value: parseInt(value.result_attribute.value) }
    ]
  });
  return (
    <ResponsiveContainer>
      <PieChart height={200}>
        <Pie
          animate
          animationDuration={500}
          animationEasing="ease-out"
          center={[50, 50]}
          dataKey="value"
          startAngle={180}
          viewBoxSize={[100, 100]}
          endAngle={0}
          data={dataGauge}
          outerRadius={80}
          cy={140}
          fill="#225DA9"
          label
          radius={PieChart.defaultProps.radius - 3}
          segmentsShift={(index) => (index === 0 ? 3 : 0.5)}
          fontSize={12}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

const PieSigma = ({ data }) => {
  let dataPie = [];
  data.map((value) => {
    dataPie = [
      ...dataPie,
      { name: value.name, value: parseInt(value.result_attribute.value) }
    ]
  });
  return (
    <ResponsiveContainer>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={dataPie}
              fill="#225DA9"
              label
              fontSize={12}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ResponsiveContainer>
  )
}

const WavesSigma = ({ data }) => {
  let dataWaves = [];
  data.map((value) => {
    dataWaves = [
      ...dataWaves,
      { name: value.name, value: value.result_attribute.value }
    ]
  });
  return (
    <ResponsiveContainer>
      <AreaChart
        data={dataWaves}
        margin={{
          top: 10,
          right: 10,
          left: 25,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#225DA9" fill="#225DA9" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const DonutSigma = ({ data }) => {
  let dataDonut = [];
  data.map((value) => {
    dataDonut = [
      ...dataDonut,
      { name: `${value.name} ${value.result_attribute.value}`, value: parseInt(value.result_attribute.value) }
    ]
  });
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart >
          <Pie
            data={dataDonut}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#225DA9"
            paddingAngle={5}
            dataKey="value"
            label
            fontSize={12}
          >
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const PercentageSigma = ({ data }) => {
  return (
    <div className="separator">
      <Row>
        {
          data.map(per => {
            return (
              <Col lg={4}>
                <Donut
                  color="#000000"
                  indicatorColor="#225DA9"
                  animate={true}
                  linecap="round"
                  size={100}
                  strokeWidth={10}
                  styleIndicator={{
                    stroke: '#225DA9',
                    strokeLinecap: 'round'
                  }}
                  styleTrack={{
                    stroke: '#C4C2C1',
                    strokeWidth: 7
                  }}
                >
                  <DonutValue
                    style={{
                      fontWeight: 'bold',
                      fontSize: '30px',
                    }}
                    symbol='%'
                    styleSymbol={{
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    {per.result_attribute.value}
                  </DonutValue>
                </Donut>
                <span className="label-donut">{per.name}</span>
              </Col>
            )

          })
        }
      </Row>
    </div>
  )
} 
