import { Layout, Breadcrumb } from "antd";
const { Content } = Layout;

const ContentDash = (props) => {
  return (
    <Layout
      className="site-layout"
      style={{ marginLeft: 190, backgroundColor: "#FAFAFA" }}
    >
      <Content
        className="site-layout-background"
        style={{
          paddingLeft: "20px",
          paddingTop: "10px",
          paddingRight: "10px",
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
