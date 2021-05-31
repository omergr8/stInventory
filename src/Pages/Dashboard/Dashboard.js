import Content from "./sections/Content/Content";
import Navbar from "../Common/Navbar/Navbar";
import Sidebar from "../Common/Sidebar/Sidebar";
import routes from "../../routes";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        console.log(prop.layout + prop.path);
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
