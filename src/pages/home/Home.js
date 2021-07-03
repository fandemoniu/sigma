import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import Dashboard from "../../components/dashboard";

export default function Home(props) {
  const {setRefreshCheckLogin} = props;
  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <Dashboard />
    </BasicLayout>
  )
}
