import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import WikiComponent from "../../components/wiki";

import "./Wiki.scss";

export default function Wiki({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <WikiComponent />
      </BasicLayout>
    </div>
  )
}
