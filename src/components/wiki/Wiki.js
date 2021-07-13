import React, { Fragment } from 'react';
import { Container, Tab, Row, Col, ListGroup, Spinner, Table } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import Moment from 'moment';

import { getToken } from "../../api/auth";

import Add from "../../assets/images/add.svg";
import Geek from "../../assets/images/geek.svg";
import Pencil from "../../assets/images/pencil.svg";
import Down from "../../assets/images/down.svg";

import "./Wiki.scss";
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { API_HOST } from "../../utils/constant";

export default function WikiComponent() {
  Moment.locale('en');
  // Get token
  const token = getToken();
  // Custom huok fetch
  const { data, loading } = useFetch(token);
  const wiki = !!data && data;
  // Generate return
  return (
    <Container className="wiki-main" fluid>
      <h1 className="text-center h1">Manual de calidad</h1>
      <div className="wrapper-button-article">
        <Link to="/create-article">
          <div className="btn-create-article">
            <img src={Add} alt="Agregar" />
            <span>Crear artículo</span>
          </div>
        </Link>
      </div>
      {
        loading
          ?
          <div className="text-center clipor">
            <Spinner animation="border" role="status" variant="primary"></Spinner>
          </div>
          :
          <Tab.Container defaultActiveKey="default">
            <Row>
              <Col lg={2}>
                <div className="wrapper-wiki-list">
                  <ListGroup className="list-group list-group-root well">
                    {
                      wiki.map((wiki, index) => (
                        <ListGroupItem
                          className="list-group-item"
                          wiki={wiki}
                          key={wiki.id}
                          index={index}
                        />
                      ))
                    }
                  </ListGroup>
                </div>
                <div className="wrap-geek">
                  <img src={Geek} />
                </div>
              </Col>
              <Col lg={10}>
                <Tab.Content className="wrapper-wiki-content">
                  <Tab.Pane eventKey="default" key={0}>
                    <h3>Welcom the quality manual</h3><h5>Lorem impsum dolor sit amet</h5><p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p><p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice.</p><p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best.</p>
                  </Tab.Pane>
                  {
                    wiki.map(wiki => {
                      const { articles } = wiki;
                      return (
                        <Fragment key={wiki.id}>
                          {
                            articles.map(content => {
                              const { versions } = content;
                              const { documents } = content;
                              return (
                                <Tab.Pane eventKey={`#link${content.id}`} key={content.id}>
                                  { parse(content.content)}
                                  <Row>
                                    {
                                      documents.map(documento => {
                                        return (
                                          <Col lg={6} key={documento.id}>
                                            <a
                                              className="down-file"
                                              href={`${API_HOST}/storage/wiki/${content.id}-${content.title}/${documento.image}`}
                                              download
                                              target="_blank"
                                            >
                                            <span>{documento.image}</span>
                                            <img src={Down} alt="Descargar"/>
                                        </a>
                                          </Col>

                                        )
                                      })
                                    }
                                  </Row>
                                  <Table className="version-table">
                                    <thead>
                                      <tr>
                                        <th>Versión</th>
                                        <th>Folio</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Usuario</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        versions.map((ver, i) => {
                                          return (
                                            <tr key={i}>
                                              <td>{ver.version_code}</td>
                                              <td>{ver.folio}</td>
                                              <td>{ver.description}</td>
                                              <td>{Moment(ver.created_at).format('DD MM YYYY hh:mm:ss')}</td>
                                              <td>{ver.created_by_version_article.profile.name + ' ' + ver.created_by_version_article.profile.last_name}</td>
                                            </tr>
                                          )
                                        })
                                      }
                                    </tbody>
                                  </Table>
                                  <div className="wrap-wiki-edit">
                                    <Link to={`/edit-article/${wiki?.id}/${content?.id}`}>
                                      <div className="btn-edit-article">
                                        <img src={Pencil} alt="Editar" />
                                        <span>Editar artículo</span>
                                      </div>
                                    </Link>
                                  </div>
                                </Tab.Pane>
                              )
                            })
                          }
                        </Fragment>
                      )
                    })
                  }
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
      }
    </Container>
  );
}

const ListGroupItem = ({ wiki, index }) => {
  const { articles, name } = wiki;
  return (
    <ListGroup.Item>
      {index + 1 + `. ` + name}
      <ListGroup className="list-group">
        {
          articles.map((article) => (
            <ListGroup.Item className="list-group-item" key={article.id} action eventKey={`#link${article.id}`}>
              {article.index + ` ` + article.title}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </ListGroup.Item>
  );
}