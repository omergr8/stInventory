// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import axios from "axios";
import { getToken } from "./Services/ListServices";

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  // Add your own authentication on the below line.
  // const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://inventory-dev-295903.appspot.com/settings/defaults/", {
        headers: getToken(),
      })
      .then((response) => {
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setLoading(false);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn === false && loading === false)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        if (isLoggedIn === true && loading === false) {
          return Component ? <Component {...props} /> : render(props);
        }
      }}
    />
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     isLoggedIn ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect
    //         to={{ pathname: "/login", state: { from: props.location } }}
    //       />
    //     )
    //   }
    // />
  );
};

export default PrivateRoute;
