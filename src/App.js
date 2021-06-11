import "./App.css";
import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./Pages/User/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {!token ? (
          <Redirect from="" to="/login" />
        ) : (
          <Redirect from="" to="/dashboard" />
        )}
        {/* {!token ? <Redirect to="/login" /> : <Redirect to="/dashboard" />} */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
