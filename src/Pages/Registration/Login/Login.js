import React, { useState } from "react";
import classes from "./Login.module.css";
import LoginForm from "./sections/Form/Form";
import logo from "../../../Assets/logo-sumtracker.png";
import OverSpinner from "./sections/Spinner/Components/Overlay";
const Login = (props) => {
  const [waiting, setWaiting] = useState(false);
  const showSpinner = () => {
    console.log(waiting);
    if (waiting === false) {
      setWaiting(true);
    } else {
      setWaiting(false);
    }
  };
  return (
    <div className={classes.alignCenter}>
      <OverSpinner active={waiting} marginTop="150px">
        <div className={classes.logo}>
          <img src={logo} width="200px" alt="logo" />
        </div>
        <div className={classes.loginCard}>
          <h1>Sign In</h1>

          <LoginForm handler={showSpinner} />
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
      </OverSpinner>
    </div>
  );
};
export default Login;
