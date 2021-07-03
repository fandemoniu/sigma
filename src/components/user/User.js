import React from 'react';
import { Container, Row, Col, Media, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import useUsers from "../../hooks/useUsers";
import useRoles from "../../hooks/useRoles";

import Add from "../../assets/images/add.svg";
import Avatar from "../../assets/images/avatar.svg";
import Personal from "../../assets/images/Personal.svg";

import "./User.scss";

export default function User() {
  const { data: users, loading } = useUsers();
  const { data: roles, load } = useRoles();
  return (
    <>
      <div className="wrap-personal">
        <img src={Personal} alt="Personal" />
      </div>
      <Container>
        <Row>
          <Col>
            <div className="card-user">
              <h4>Colaboradores</h4>
              {
                loading
                  ?
                  <div className="text-center clipor-user">
                    <Spinner animation="border" role="status" variant="primary"></Spinner>
                  </div>
                  :
                  <div>
                    {
                      users?.map( (user) => (
                        <div className="card-info-user" key={user.profile.id}>
                          <Media>
                            <img
                              width={50}
                              height={50}
                              className="mr-2 circle-user"
                              src={user.profile.image ? user.profile.image : Avatar}
                              alt="User"
                            />
                            <Media.Body>
                              <span className="name-user">{user.profile.name} {user.profile.last_name}</span>
                              <span className="rol">Root</span>
                            </Media.Body>
                          </Media>
                        </div>
                      ))
                    }
                  </div>
              }
            </div>
          </Col>
          <Col>
            <div className="card-user">
              <Link to="/new-role">
                <div className="wrap-button-col">
                  <img src={Add} alt="Agregar Rol" />
                  <span>Crear nuevo rol</span>
                </div>
              </Link>
              {
                load
                  ?
                  <div className="text-center clipor-user">
                    <Spinner animation="border" role="status" variant="primary"></Spinner>
                  </div>
                  :
                  <div>
                    {
                      roles.map(rol => {
                        const permisos = rol.permissions
                        return (
                          <div className="card-info-user" key={rol.id}>
                            <Media>
                              <Media.Body>
                                <span className="name-user">{rol.name}</span>
                                {
                                  permisos.map( per => {
                                    return (
                                      <span className="per" key={per.id}>{per.name}</span>
                                    )
                                  })
                                }
                              </Media.Body>
                            </Media>
                          </div>
                        )
                      })
                    }
                  </div>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
