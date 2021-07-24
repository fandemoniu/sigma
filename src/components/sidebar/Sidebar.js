import React from 'react'
import { HashRouter, Link } from "react-router-dom";

import "./Sidebar.scss";

import SigmaIso from "../../assets/images/sigma-iso.svg";
import Home from "../../assets/images/home.svg";
import Newspaper from "../../assets/images/newspaper.svg";
import Accessibility from "../../assets/images/accessibility.svg";
import People from "../../assets/images/people.svg";
import Chart from "../../assets/images/chart.svg";
import AddUser from "../../assets/images/add-user.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={SigmaIso} alt="Sigma" />
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/">
              <div className="wrap-link">
                <img src={ Home } alt="Home" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/wiki">
              <div className="wrap-link">
                <img src={ Newspaper } alt="Wiki" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <div className="wrap-link">
                <img src={Accessibility} alt="users" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <div className="wrap-link">
                <img src={People} alt="Teams" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/indicators">
              <div className="wrap-link">
                <img src={Chart} alt="Chart" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/join">
              <div className="wrap-link">
                <img src={AddUser} alt="Join" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
