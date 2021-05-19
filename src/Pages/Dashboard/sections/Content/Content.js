import { Layout, Menu, Breadcrumb } from "antd";
import AppSetting from "../../../Settings/AppSetting/AppSetting";
const { Content } = Layout;

const ContentDash = () => {
  return (
    <Layout
      className="site-layout"
      style={{ marginLeft: 200, backgroundColor: "#FAFAFA" }}
    >
      <Breadcrumb style={{ margin: "16px 0" }}>
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
        <AppSetting />
      </Content>
    </Layout>
  );
};
export default ContentDash;
