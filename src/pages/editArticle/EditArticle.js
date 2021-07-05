import React from 'react';

import EditArticleComponent from "../../components/edit_article";
import BasicLayout from "../../layout/BasicLayout";

export default function EditArticle({setRefreshCheckLogin}) {
  return (
    <div>
      <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
        <EditArticleComponent />
      </BasicLayout>
    </div>
  )
}
