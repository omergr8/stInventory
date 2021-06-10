import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../../axiosSet";
import { appUrls } from "../../../../../Constants/appUrls";
import { appRoutes } from "../../../../../Constants/appRoutes";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import classes from "../../Login.module.css";
const LoginForm = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const getMetadata = () => {
    let unmounted = false;
    axios.get(appUrls.METADATA).then((res) => {
      if (res && !unmounted) {
        const metaData = res.data;
        localStorage.setItem("meta-data", JSON.stringify(metaData));
        if (localStorage.getItem("token")) {
          history.push(appRoutes.DASHBOARD);
        }
      }
    });
    return () => {
      unmounted = true;
    };
  };
  const login = () => {
    ("login");
    let item = { username: username, password: password };
    props.handler();
    let unmounted = false;
    axios
      .post(appUrls.LOGIN, item)
      .then((response) => {
        localStorage.setItem("user-info", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        if (response && !unmounted) {
          props.handler();
          props.onSuccess();
          getMetadata();
        }
      })
      .catch((err) => {
        if (err) {
          props.handler(err.response);
        }
      });
    return () => {
      unmounted = true;
    };
  };
  return (
    <div className={classes.container}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={login}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: false,
              message: "Please input your Username!",
            },
          ]}
        >
          <h3 className={classes.inputLabel}>Username</h3>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
            className={classes.formInput}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: false,
              message: "Please input your Password!",
            },
          ]}
        >
          <h3 className={classes.inputLabel}>Password</h3>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
            className={classes.formInput}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            block
            size="large"
            type="submit"
            htmlType="submit"
            className={classes.submitButton}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      {/* {isauth ? (
        <Redirect exact from="/login" to="/dashboard" />
      ) : (
        <h1>null</h1>
      )} */}
    </div>
  );
};
export default LoginForm;
