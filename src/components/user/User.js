import React, { useState } from 'react';
import { Container, Row, Col, Media, Spinner, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Success from "../../assets/images/success.svg";

import useUsers from "../../hooks/useUsers";
import useRoles from "../../hooks/useRoles";
import usePermissions from "../../hooks/usePermissions";

import Add from "../../assets/images/add.svg";
import Avatar from "../../assets/images/avatar.svg";
import Personal from "../../assets/images/Personal.svg";

import { editRol, editUserRol } from "../../api/rol";

import { store } from 'react-notifications-component';
import { getUser } from "../../hooks/useUsers";

import "./User.scss";

export default function User() {

  const [smShow, setSmShow] = useState(false);

  const [bandera, setbandera] = useState(false);

  const [idRol, setId] = useState(null);
  
  const [idU, setIdU] = useState(null);

  const [edit, setEdit] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const { data: permiso } = usePermissions();

  const [checked, setChecked] = useState(false);

  // Edit Role
  const [editRole, setEditRole] = useState({
    name: "",
    permissions: []
  });
  // Usuarios
  const { data: users, loading } = useUsers(bandera);

  const [rolUser, setRolUser] = useState(initialUser(users));
  // Roles
  const { data: roles, load } = useRoles(bandera);

  const handleBandera = () => {
    setbandera(!bandera);
  }
  // Manejo del edit
  const handleEdit = (id, name) => {
    setId(id);
    setEditRole({
      name: name,
      permissions: []
    });
    setEdit(true);
  }

  const handleUserRole = async (e, id) => {
    const user = await getUser(id);
    setRolUser({
      name: user[0].profile.name,
      last_name: user[0].profile.last_name,
      work_position: user[0].profile.work_position,
      birthdate: user[0].profile.birthdate,
      phone: user[0].profile.phone,
    });
    setIdU(id);
    setSmShow(true);
  }

  const changeUserRole = (e) => {
    setRolUser({
      ...rolUser,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxChange = (e) => {
    let newArray = [
      ...editRole.permissions,
      e.target.id
    ];
    if (editRole.permissions.includes(e.target.id)) {
      newArray = newArray.filter(permit => permit !== e.target.id);
    }
    setEditRole({
      ...editRole,
      permissions: newArray
    });
  }

  const handleInputChange = (e) => {
    setEditRole({
      ...editRole,
      name: e.target.value
    });
    setChecked(false);
  }

  const sendUserRoller = async (e) => {
    e.preventDefault();
    if (rolUser.role == "") {
      notification("Error al asignar rol.", "Por favor ingrese un rol.", "danger");
    }else{
      // Send data to api
      const response = await editUserRol(rolUser, idU);
      // Validate response
      if (response.code == 200 && response.status == "success") {
        handleBandera();
        setSmShow(false);
        setModalShow(true);
      } else {
        if (Array.isArray(response.message)) {
          notification("Error al asignar Rol.", response.message[0], "danger");
        } else {
          notification("Error al asignar Rol.", response.message, "danger");
        }
      }

    }
  }

  const envioData = async (e) => {
    e.preventDefault();
    if (!editRole.name.length > 0 || !editRole.permissions.length > 0) {
      notification("Error al agregar el rol.", "Por favor ingrese un rol o permisos", "danger");
    } else {
      // Mapiamosla respuesta
      let arrayPer = [];
      editRole.permissions.map((permis) => {
        arrayPer = [
          ...arrayPer,
          { name: permis }
        ]
      });

      const data = {
        name: editRole.name,
        permissions: arrayPer
      }
      // Send data to api
      const response = await editRol(data, idRol);
      // Validate response
      if (response.code == 200 && response.status == "success") {
        handleBandera();
        setEdit(false);
        setModalShow(true);
      } else {
        if (Array.isArray(response.message)) {
          notification("Error al agregar Rol.", response.message[0], "danger");
        } else {
          notification("Error al agregar Rol.", response.message, "danger");
        }
      }
    }
  }
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
                      users?.map((user) => (
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
                              <span className="rol">Falta</span>
                            </Media.Body>
                            <Button className="edit-user-role" onClick={(e) => handleUserRole(e, user.profile.id)}>Editar rol</Button>
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
                                  permisos.map(per => {
                                    return (
                                      <span className="per" key={per.id}>{per.name}</span>
                                    )
                                  })
                                }
                                <Button className="edit-role" onClick={() => handleEdit(rol.id, rol.name)}>Editar</Button>
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
        <EditModal
          show={edit}
          onHide={() => setEdit(false)}
          editRole={editRole}
          permiso={permiso}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          checked={checked}
          envioData={envioData}
        />
        <EditUserRole
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          rolUser={rolUser}
          roles={roles}
          changeUserRole={changeUserRole}
          sendUserRoller={sendUserRoller}
        />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          backdrop="static"
          keyboard={false}
        />
      </Container>
    </>
  )
}

function EditUserRole(props) {
  const { rolUser, roles, changeUserRole, sendUserRoller, ...remi } = props;
  return (
    <Modal
      {...remi}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={sendUserRoller}>
          <Form.Label className="labeli">
            Roles
          </Form.Label>
          <Form.Control
            as="select"
            className="form-control-art"
            name="role"
            onChange={changeUserRole}
            value={rolUser.role}
          >
            <option value="">Selecionar role</option>
            {
              roles.map(rol => (
                <option key={rol.id} value={rol.name}>{rol.name}</option>
              ))
            }
          </Form.Control>
          <hr />
          <Button className="save-rol" type="submit">Guardar cambios</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

function EditModal(props) {
  const { permiso, handleCheckboxChange, handleInputChange, editRole, checked, envioData } = props;
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={envioData}>
          <label className="lab-edit-role">Nombre del rol</label>
          <input
            className="e-role"
            value={editRole.name}
            onChange={handleInputChange}
          />
          {
            permiso.map((permi, index) => {
              return (
                <div key={index}>
                  <input
                    id={permi.name}
                    type="checkbox"
                    name="permissions"
                    className="e-perm"
                    onChange={handleCheckboxChange}
                    value={permi.name}
                    defaultChecked={checked}
                  />
                  <label for={permi.name} className="edit-custome">
                    {permi.name}
                  </label>
                </div>

              )
            })
          }
          <Button className="save-rol" type="submit">Guardar cambio</Button>
        </Form>
      </Modal.Body>
    </Modal>
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
        <div className="wrapper-button-article">
          <a onClick={props.onHide}>
            <div className="btn-create-article">
              <span>¡OK!</span>
            </div>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
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

const initialUser = (users) => {
  const user = users[0];
  console.log(users);
  return {
    name: "",
    last_name: "",
    work_position: "",
    birthdate: "",
    phone: "",
    role: ""
  }
}