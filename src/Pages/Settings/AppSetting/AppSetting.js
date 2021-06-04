import Setting from "./sections/Setting/Setting";
import User from "./sections/User/User";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const AppSetting = () => {
  function callback(key) {}
  return (
    <div>
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
