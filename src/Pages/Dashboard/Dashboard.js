import Content from "./sections/Content/Content";
import Navbar from "../Common/Navbar/Navbar";
import Sidebar from "../Common/Sidebar/Sidebar";
import Box from "../Settings/ShopifyBilling/ShopifyBilling";
import routes from "../../routes";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout } from "antd";

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
  const refreshNav = () => {};
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
