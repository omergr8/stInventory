import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const WarehouseChannel = (props) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [channel, setChannel] = useState("");
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };

  useEffect(() => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/${props.id}`,
        {
          headers,
        }
      )
      .then((res) => {
        const channelName = res.data;
        setChannel(channelName.name);
      });
  }, []);
  return <div>{channel}</div>;
};
export default WarehouseChannel;
