import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import User from "../../components/user";

export default function Users({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <User />
      </BasicLayout>
    </div>
  )
}
