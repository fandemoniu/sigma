import React from 'react';

import BasicLayout from "../../layout/BasicLayout";
import CreateArticle from "../../components/create_article";

import "./NewArticle.scss";

export default function NewArticle() {
  return (
    <div>
      <BasicLayout>
        <CreateArticle/>
      </BasicLayout>
    </div>
  )
}
