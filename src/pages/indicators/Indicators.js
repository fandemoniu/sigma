import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import IndicatorsComponent from "../../components/Indicators";

export default function Indicators({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <IndicatorsComponent />
      </BasicLayout>
    </div>
  )
}
