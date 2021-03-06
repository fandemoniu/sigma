import React from 'react';

import AttributeComp from "../../components/attribute";
import BasicLayout from "../../layout/BasicLayout";

export default function Attribute({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <AttributeComp />
      </BasicLayout>
    </div>
  )
}