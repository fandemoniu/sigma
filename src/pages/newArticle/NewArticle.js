import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import CreateArticle from "../../components/create_article";

import "./NewArticle.scss";

export default function NewArticle({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <CreateArticle/>
      </BasicLayout>
    </div>
  )
}
