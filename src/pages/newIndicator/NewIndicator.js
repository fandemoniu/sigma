import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import CreateIndicator from "../../components/create_indicator";

export default function NewIndicator({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <CreateIndicator />
      </BasicLayout>
    </div>
  )
}