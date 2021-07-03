import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import WikiComponent from "../../components/wiki";

import "./Wiki.scss";

export default function Wiki() {
  return (
    <div>
      <BasicLayout>
        <WikiComponent />
      </BasicLayout>
    </div>
  )
}
