import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Row, Col, Media, Container, Spinner } from "react-bootstrap";
import { Donut, DonutValue } from 'react-donut-component';
import Moment from 'moment';
import 'moment/locale/es';

import { useGetBirthday } from "../../api/birthday";

import Avatar from "../../assets/images/avatar.svg";
import Mascot from "../../assets/images/mascota-cumple.svg";

import "./Dashboard.scss";

const data = [
  {
    name: "Online",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Corporativo",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "NGM",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Convenio",
    uv: 2780,
    pv: 3908,
    amt: 2000
  }
];

const data_marketing = [
  {
    name: "Alcanzadas",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Comunidad",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Leads",
    uv: 2000,
    pv: 9800,
    amt: 2290
  }
];

// const data_circle = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {

  const { data: birthday, load: loadBirthday } = useGetBirthday();

  return (
    <Container fluid>
      <Row>
        <Col lg={4}>
          <div className="card-sigma">
            <h5>Ventas</h5>
            <div style={{ width: '100%', height: 150 }}>
              <ResponsiveContainer>
                <BarChart data={data} className="BarChart">
                  <Bar dataKey="uv" fill="#225DA9" />
                  <XAxis dataKey="name" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-sigma">
            <h5>Marketing</h5>
            <div style={{ width: '100%', height: 150 }}>
              <ResponsiveContainer>
                <BarChart data={data_marketing} className="BarChart">
                  <Bar dataKey="pv" fill="#225DA9" />
                  <XAxis dataKey="name" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card-sigma">
            <h5>Relaciones Públicas</h5>
            <Row>
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
                    95
                  </DonutValue>
                </Donut>
                <span className="label-donut">Satisfacción Colaboradores</span>
              </Col>
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
                    45
                  </DonutValue>
                </Donut>
                <span className="label-donut">Atención Postventa</span>
              </Col>
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
                    35
                  </DonutValue>
                </Donut>
                <span className="label-donut">Atención con respuesta</span>
              </Col>
            </Row>
          </div>
          <div className="card-sigma">
            <h5>Calidad</h5>
            <Row>
              <Col lg={4}>
                <Donut
                  color="#000000"
                  indicatorColor="#225DA9"
                  animate={true}
                  linecap="round"
                  size={100}
                  strokeWidth={10}
                  animate={true}
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
                    95
                  </DonutValue>
                </Donut>
                <span className="label-donut">Proyectos</span>
              </Col>
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
                    45
                  </DonutValue>
                </Donut>
                <span className="label-donut">Satisfacción Alumnos</span>
              </Col>
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
                    35
                  </DonutValue>
                </Donut>
                <span className="label-donut">Satisfacción Empresas</span>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card-sigma">
            <h5>Cumpleaños</h5>
            <div className="wrap-bitrh">
              {
                loadBirthday
                  ?
                  (
                    <div className="text-center clipor">
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
    </Container>
  )
}
