import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import Team from "../../components/team";

export default function Teams({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <Team/>
      </BasicLayout>
    </div>
  )
}
