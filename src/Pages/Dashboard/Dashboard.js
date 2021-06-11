import Content from "./sections/Content/Content";
import { useHistory } from "react-router-dom";
import React from "react";
import Toolbar from "../Common/Toolbar/Toolbar";
import Sidebar from "../Common/Sidebar/Sidebar";
import routes from "../../routes";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
  </Switch>
);

const Dashboard = () => {
  const history = useHistory();
  const isAuth = localStorage.getItem("token");
  // if (localStorage.getItem("token") === null) {
  //   history.push("/login");
  // }
  // useEffect(() => {
  //   if (isAuth) {

  //   }
  // }, []);
  return (
    <div>
      <Layout>
        <Toolbar />
        <Layout style={{ marginTop: "53px" }}>
          <Sidebar routes={routes} />
          <Layout style={{ marginTop: "" }}>
            <Content>{switchRoutes}</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default Dashboard;
