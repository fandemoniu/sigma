import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import Board from "../../components/board";

export default function boards({setRefreshCheckLogin}) {
  return (
    <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
      <Board />
    </BasicLayout>
  )
}
