// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { map } from "lodash";
// import configRouting from "./configRouting";
// import PublicRoute from './PublicRoute';
// import PrivateRoute from './PrivateRoute';
// import Login from "../pages/login";
// import Google from "../pages/google";

// export default function Routes(props) {
//   const { setRefreshCheckLogin } = props;
//   return (
//     <Router>
//       <Switch>
//         <PublicRoute setRefreshCheckLogin={ setRefreshCheckLogin } restricted={ false } component={ Login } path="/" exact />
//         <PublicRoute setRefreshCheckLogin={ setRefreshCheckLogin } restricted={ false } component={ Google } path="/google" exact />
//         {
//           map(configRouting, (route, index) => (
//             <PrivateRoute 
//               key={index} 
//               component={route.page} 
//               path={route.path} 
//               setRefreshCheckLogin={ setRefreshCheckLogin } 
//               exact={route.exact} 
//             />
//           ))
//         }
//       </Switch>
//     </Router>
//     // <Router>
//     //   <Switch>
//     //     {map(configRouting, (route, index) => (
//     //         <Route key={index} path={route.path} exact={route.exact}>
//     //           <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
//     //         </Route>
//     //     ))}
//     //   </Switch>
//     // </Router>
//   );
// }