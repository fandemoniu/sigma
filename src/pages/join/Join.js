import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import JoinTeam from "../../components/join_team";

export default function Join({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <JoinTeam />
      </BasicLayout>
    </div>
  )
}
