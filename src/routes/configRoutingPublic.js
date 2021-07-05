import Login from "../pages/login";
import Google from "../pages/google";

export default [
  {
    path: "/google",
    exact: true,
    page: Google
  },
  {
    path: "/",
    exact: true,
    page: Login
  },
  {
    path: "*",
    page: Login
  }
];