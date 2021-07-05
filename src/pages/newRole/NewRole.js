import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import NewRoles from "../../components/newRoles";

export default function NewRole({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <NewRoles/>
      </BasicLayout>
    </div>
  )
}
