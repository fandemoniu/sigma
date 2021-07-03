import React from 'react'

import Sidebar from "../../components/sidebar";
import Main from "../../components/main";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { className, setRefreshCheckLogin, children } = props;
  return (
    <div className={`className`}>
      <Sidebar />
      <Main setRefreshCheckLogin={setRefreshCheckLogin}>
        {children}
      </Main>      
    </div>
  )
}
