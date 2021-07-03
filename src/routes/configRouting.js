import Home from "../pages/home";
import Error404 from "../pages/error404";
import Wiki from "../pages/wiki";
import NewArticle from "../pages/newArticle";
import Users from "../pages/users";
import NewRole from "../pages/newRole";
import Teams from "../pages/teams";
import boards from "../pages/boards";
import Join from "../pages/join";
import EditArticle from "../pages/editArticle";
import Indicators from "../pages/indicators";
import NewIndicators from "../pages/newIndicator";
import Attribute from "../pages/attribute";

export default [
  {
    path: "/wiki",
    exact: true,
    page: Wiki
  },
  {
    path: "/users",
    exact: true,
    page: Users
  },
  {
    path: "/indicators",
    exact: true,
    page: Indicators
  },
  {
    path: "/new-role",
    exact: true,
    page: NewRole
  },
  {
    path: "/create-article",
    exact: true,
    page: NewArticle
  },
  {
    path: "/create-indicator",
    exact: true,
    page: NewIndicators
  },
  {
    path: "/attribute/:id_indicator",
    exact: true,
    page: Attribute
  },
  {
    path: "/edit-article/:id_sections/:id_article",
    exact: true,
    page: EditArticle
  },
  {
    path: "/teams",
    exact: true,
    page: Teams
  },
  {
    path: "/board",
    exact: true,
    page: boards
  },
  {
    path: "/join",
    exact: true,
    page: Join
  },
  {
    path: "/",
    exact: true,
    page: Home
  },
  {
    path: "*",
    page: Error404
  }
];