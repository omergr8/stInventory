import Setting from "./sections/Setting/Setting";
import User from "./sections/User/User";
import { Tabs, PageHeader } from "antd";
const { TabPane } = Tabs;
const AppSetting = () => {
  function callback(key) {}
  return (
    <div>
      <PageHeader
        style={{ backgroundColor: "#F5F5F5", marginBottom: "25px" }}
        className="site-page-header"
        title="Settings"
      />
      <Tabs onChange={callback} type="card">
        <TabPane tab="APP SETTINGS" key="1">
          <div>
            <Setting />
          </div>
        </TabPane>
        <TabPane tab="USERS" key="2">
          <div>
            <User />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default AppSetting;
