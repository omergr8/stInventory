import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import { CaretDownFilled, QuestionCircleFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Button from "antd-button-color";
import classes from "./Navbar.module.css";
import logo from "../../../Assets/logo-sumtracker-light.svg";

const menuHelp = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Help Documentation</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">Show Setup</a>
    </Menu.Item>
  </Menu>
);
const logout = () => {
  localStorage.clear();
};
const menuUser = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#" onClick={logout}>
        Log Out
      </a>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  const history = useHistory();
  let userr = JSON.parse(localStorage.getItem("user-info"));
  const [user, setUser] = useState(userr);

  useEffect(() => {
    console.log("navbar");
    setUser(JSON.parse(localStorage.getItem("user-info")));
    if (localStorage.getItem("user-info")) {
      history.push("/dashboard");
    } else {
      console.log("i am else", history);
      history.push("/");
    }
  }, [localStorage.getItem("user-info")]);
  return (
    <ul className={classes.ul}>
      <div className={classes.container}>
        <li className={classes.li}>
          <img src={logo} height="40" width="130" alt="logo" />
        </li>
        <li className={classes.li}>
          <span className={classes.storeName}>{user.client.name}</span>
        </li>
        <li className={classes.li}>
          <Button
            className={classes.cancelledButton}
            type="primary"
            size="small"
          >
            CANCELLED
          </Button>
        </li>
        <li className={classes.li}>
          <Button type="warning" size="small">
            SANDBOX
          </Button>
        </li>
        <li className={classes.alignRight}>
          <Dropdown overlay={menuUser} trigger={["click"]}>
            <a
              href="!"
              className={classes.dropdown}
              onClick={(e) => e.preventDefault()}
            >
              {user.user.first_name} {user.user.last_name} <CaretDownFilled />
            </a>
          </Dropdown>
        </li>
        <li className={classes.alignRight}>
          <Dropdown
            className={classes.dropdown}
            overlay={menuHelp}
            trigger={["click"]}
          >
            <a
              className={classes.dropdown}
              href="!"
              onClick={(e) => e.preventDefault()}
            >
              Help <QuestionCircleFilled />
            </a>
          </Dropdown>
        </li>
        <li className={classes.alignRightButton}>
          <Button
            className={classes.scheduleButton}
            type="primary"
            size="small"
          >
            Schedule a Call
          </Button>
        </li>
      </div>
    </ul>
  );
};

export default Navbar;
