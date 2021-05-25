import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
const WarehouseName = (props) => {
  const [warehousedata, setWarehouse] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };

  useEffect(() => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${props.id}`,

        {
          headers,
        }
      )
      .then((res) => {
        const warehouse = res.data.code;
        setWarehouse(warehouse);
        console.log(warehouse);
      });
  }, []);
  return <div>{warehousedata}</div>;
};
export default WarehouseName;
