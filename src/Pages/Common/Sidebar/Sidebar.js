import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import classes from "./Sidebar.module.css";
import {
  HomeFilled,
  ShoppingFilled,
  FileTextFilled,
  StockOutlined,
  BarChartOutlined,
  SettingFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { FaCubes, FaLayerGroup } from "react-icons/fa";
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const rootKeys = ["sub1", "sub2", "sub3"];

  const onOpenChange = (items) => {
    const latestOpenKey = items.find((key) => openKeys.indexOf(key) === -1);
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(items);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : "");
    }
  };
  return (
    <Sider
      style={{
        overflowX: "hidden",
        height: "92vh",
        position: "fixed",
        backgroundColor: "#eeeef6",
      }}
    >
      <Menu
        className={classes.sider}
        mode="inline"
        defaultSelectedKeys={["1"]}
        openKeys={openKeys}
        style={{ height: "100%", borderRight: 0 }}
        onOpenChange={onOpenChange}
      >
        <Menu.Item icon={<HomeFilled />} key="1">
          Dashboard
        </Menu.Item>
        <Menu.Item icon={<ShoppingFilled />} key="2">
          Orders
        </Menu.Item>
        <SubMenu key="sub1" icon={<FileTextFilled />} title="Purchase">
          <Menu.Item key="3">Purchase Orders</Menu.Item>
          <Menu.Item key="4">GRNs</Menu.Item>
          <Menu.Item key="5">Returns</Menu.Item>
          <Menu.Item key="6">Suppliers List</Menu.Item>
        </SubMenu>

        <Menu.Item icon={<FaCubes />} key="7">
          Products
        </Menu.Item>
        <Menu.Item icon={<FaLayerGroup />} key="8">
          Bundles
        </Menu.Item>
        <Menu.Item icon={<StockOutlined />} key="9">
          Stock Levels
        </Menu.Item>
        <SubMenu key="sub2" icon={<MenuOutlined />} title="Adjust Stock">
          <Menu.Item key="10">Add Stock</Menu.Item>
          <Menu.Item key="11">Reduce Stock</Menu.Item>
          <Menu.Item key="12">Set Stock</Menu.Item>
          <Menu.Item key="13">Stock Transfers</Menu.Item>
        </SubMenu>
        <Menu.Item icon={<BarChartOutlined />} key="13">
          Reports
        </Menu.Item>
        <SubMenu key="sub3" icon={<SettingFilled />} title="Settings">
          <Menu.Item key="14">App Settings</Menu.Item>
          <Menu.Item key="15">Users</Menu.Item>
          <Menu.Item key="16">Shopify Billing</Menu.Item>
          <Menu.Item key="17">Reset Cache</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default Sidebar;
