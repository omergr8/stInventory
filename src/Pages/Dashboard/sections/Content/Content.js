import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import routes from "../../../../routes";
import AppSetting from "../../../Settings/AppSetting/AppSetting";
const { Content } = Layout;

const ContentDash = (props) => {
  return (
    <Layout
      className="site-layout"
      style={{ marginLeft: 200, backgroundColor: "#FAFAFA" }}
    >
      <Breadcrumb style={{ margin: "26px 26px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );
};
export default ContentDash;
