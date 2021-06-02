import "./App.css";
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Registration/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import AppSetting from "./Pages/Settings/AppSetting/AppSetting";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";

function App() {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute path="/dashboard" component={Dashboard} />
        {!token ? <Redirect to="/login" /> : <Redirect to="/dashboard" />}
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        {/* {token ? <Route path="/dashboard" component={Dashboard} /> : null} */}
        {/* {token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />} */}

        {/* {token ? (
          <React.Fragment>
            <Route path="/dashboard" component={Dashboard} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            
            <Redirect to="/login" />
          </React.Fragment>
        )} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
