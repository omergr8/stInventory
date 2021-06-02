import Content from "./sections/Content/Content";
import { useHistory } from "react-router-dom";
import { Spin, Alert, notification } from "antd";
import Navbar from "../Common/Navbar/Navbar";
import Sidebar from "../Common/Sidebar/Sidebar";
import routes from "../../routes";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { useEffect } from "react";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
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
        <Navbar />
      </Layout>
      <Layout style={{ marginTop: "52px" }}>
        <Sidebar routes={routes} />
        <Content>{switchRoutes}</Content>
      </Layout>
    </div>
  );
};
export default Dashboard;
