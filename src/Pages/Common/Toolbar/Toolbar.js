import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import { CaretDownFilled, QuestionCircleFilled } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import { appRoutes } from "../../../Constants/appRoutes";
import Button from "antd-button-color";
import classes from "./Toolbar.module.css";
import logo from "../../../Assets/logo-sumtracker-light.svg";

const menuHelp = (
  <Menu className={classes.menu}>
    <Menu.Item key="0">
      <Link to="#">Help Documentation</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="#">Show Setup</Link>
    </Menu.Item>
  </Menu>
);

const Toolbar = () => {
  const history = useHistory();
  let userr = JSON.parse(localStorage.getItem("user-info"));
  const [user] = useState(userr);

  const logout = () => {
    localStorage.clear();
    history.push(appRoutes.LOGIN);
  };

  const menuUser = (
    <Menu className={classes.menu}>
      <Menu.Item key="0">
        <Link to="#">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="text" onClick={logout}>
          Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );
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

export default Toolbar;
