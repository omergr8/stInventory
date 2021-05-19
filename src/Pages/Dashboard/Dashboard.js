import Content from "./sections/Content/Content";
import Navbar from "../Common/Navbar/Navbar";
import Sidebar from "../Common/Sidebar/Sidebar";
import { Layout } from "antd";
const Dashboard = () => {
  return (
    <div>
      <Layout>
        <Navbar />
      </Layout>
      <Layout style={{ marginTop: "52px" }}>
        <Sidebar />
        <Content />
      </Layout>
    </div>
  );
};
export default Dashboard;
