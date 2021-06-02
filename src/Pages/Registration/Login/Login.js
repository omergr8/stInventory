import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import LoginForm from "./sections/LoginForm/LoginForm";
import logo from "../../../Assets/logo-sumtracker.png";
import { Spin, notification } from "antd";

const Login = (props) => {
  const [waiting, setWaiting] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    }
  }, []);

  const showSpinner = (error) => {
    if (waiting === false) {
      setWaiting(true);
    } else {
      setWaiting(false);
    }

    if (error !== undefined) {
      if (error.data.code === "invalid") {
        setWaiting(false);
        errorAlert("bottomRight", error);
      }
    }
  };
  const onSuccess = () => {
    successAlert("bottomRight");
  };
  const errorAlert = (placement, error) => {
    notification.error({
      message: `Error Code: ${error.status} `,
      description: [JSON.stringify(error.data)],
      placement,
    });
  };
  const successAlert = (placement) => {
    notification.success({
      message: `Login Successfully. `,
      placement,
    });
  };
  return (
    <div className={classes.alignCenter}>
      <Spin spinning={waiting}>
        <div className={classes.logo}>
          <img src={logo} width="200px" alt="logo" />
        </div>
        <div className={classes.loginCard}>
          <h1>Sign In</h1>

          <LoginForm handler={showSpinner} onSuccess={onSuccess} />
        </div>

        <div className={classes.bottomText}>
          <p>Version: 2020.d9</p>
          <p className={classes.captchaInfo}>
            This app is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">
              {" "}
              Privacy Policy
            </a>{" "}
            and
            <a href="https://policies.google.com/terms">
              {" "}
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </Spin>
    </div>
  );
};
export default Login;
