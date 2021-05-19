import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import classes from "../../Login.module.css";
const NormalLoginForm = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/dashboard");
    }
  }, []);

  const login = () => {
    let item = { username, password };
    props.handler();
    let result = axios
      .post("https://inventory-dev-295903.appspot.com/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("user-info", JSON.stringify(response.data));
        if (response) {
          props.handler();
        }

        setTimeout(() => {
          history.push("/dashboard");
        }, 1500);
      });
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className={classes.container}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
            onClick={login}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default NormalLoginForm;
