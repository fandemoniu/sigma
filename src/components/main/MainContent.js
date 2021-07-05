import React, { useState } from 'react';
import { Modal, Button, Media, Form } from "react-bootstrap";

import "./MainContent.scss";

import Search from "../../assets/images/search.png";
import Avatar from "../../assets/images/avatar.svg";
import Bell from "../../assets/images/bell.svg";

import { logoutUser, removeTokenApi, getToken, getUserData } from "../../api/auth";
import { getUser } from "../../hooks/useUsers";

export default function Main(props) {
  
  const {setRefreshCheckLogin} = props;
  // Use state for modal profile
  const [modalShow, setModalShow] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    puesto: "",
    email: "",
    telefono: ""
  });
  const hanleData = async () => {
    // Get the user id
    const userD = getUserData(); 
    const userParse = JSON.parse(userD);
    const user = await getUser(userParse.id);
    setUserData({
      name: user[0].profile.name +' '+user[0].profile.last_name,
      puesto: user[0].profile?.work_position,
      email: user[0]?.email,
      telefono: user[0].profile?.phone
    })
    setModalShow(true);
  }
  // Destructuring props
  const { children } = props;
  return (
    <div className="main-content">
      <header>
        <div className="search-wrapper">
          <img src={Search} />
          <input type="search" placeholder="Search" />
        </div>
        <div className="user-wrapper">
          <div className="bell-wrapper">
            <img src={Bell} alt="" />
          </div>
          <Button className="btn-modal-profile" onClick={hanleData}>
            <div className="user-main">
              <img src={Avatar} />
            </div>
          </Button>
          <ModalProfile
            show={modalShow}
            onHide={() => setModalShow(false)}
            setRefreshCheckLogin={setRefreshCheckLogin}
            userdata={userData}
          />
        </div>
      </header>
      <main className="animate__animated animate__fadeIn animate__faster">
        {children}
      </main>
    </div>
  );
}

// Modal profile struct
const ModalProfile = (props) => {
  const { setRefreshCheckLogin, userdata } = props;
  // Funtion Logiut
  const logout = async () => {
    // Get the current token 
    const token = getToken();
    // Call to api login
    const response = await removeTokenApi(token);
    // Validate the proccess
    if (response.code == 200) {
      // Remove token from localstore
      logoutUser();
      // Check login 
      setRefreshCheckLogin(true);
    }
  }

  return (
    <Modal 
      show={props.show} 
      onHide={props.onHide} 
      userdata={userdata}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton id="contained-modal-title-vcenter">
        <Media>
          <img
            src={Avatar}
            alt="Usuario"
            height={70}
            width={70}
            className="mr-2"
          />
          <Media.Body>
            <span className="name-user">{userdata.name}</span>
            <span className="rol-user">{userdata.puesto ? userdata.puesto : "No asignado"}</span>
          </Media.Body>
        </Media>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="profileUser">
            <Form.Label className="form-label-profile">Email</Form.Label>
            <Form.Control
              className="form-control-profile"
              type="text"
              defaultValue={userdata.email}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="profilePassword">
            <Form.Label className="form-label-profile">Teléfono</Form.Label>
            <Form.Control
              className="form-control-profile"
              type="text"
              defaultValue={userdata.telefono ? userdata.telefono : 'Sin teléfono'}
              disabled={true}
            />
          </Form.Group>
          <Button className="btn-close-sesion" onClick={logout}>
            Cerrar sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

