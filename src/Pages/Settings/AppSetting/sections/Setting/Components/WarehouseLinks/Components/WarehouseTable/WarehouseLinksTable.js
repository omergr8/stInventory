import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WarehouseName from "./Components/WarehouseName/WarehouseName";
import WarehouseChannel from "./Components/WarehouseChannel/WarehouseChannel";
import { Table, Tag, Space } from "antd";
import { getByTestId } from "@testing-library/dom";

const columns = [
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Remote Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
  },

  {
    title: "Channel Name",
    dataIndex: "channelname",
    key: "pincode",
  },
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
];

const WarehouseTable = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [warehouselinks, setWarehouseLinks] = useState([]);

  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };

  useEffect(() => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/warehouses/links/`,
        {
          headers,
        }
      )
      .then((res) => {
        const warehouse = res.data;
        setWarehouseLinks(warehouse);
        if (warehouse) {
          console.log(warehouse);
        }
      });
  }, [setWarehouseLinks]);

  const data = [
    warehouselinks.map((warehouse, index) => ({
      key: warehouse.id,
      warehouse: <WarehouseName id={warehouse.warehouse_id} />,
      location: warehouse.location_name,
      priority: warehouse.priority,
      channelname: <WarehouseChannel id={warehouse.channel_id} />,
      channel: <WarehouseChannel id={warehouse.channel_id} />,
    })),
  ];

  return (
    <div>
      <div>
        <h4>
          Total <span>{warehouselinks.length}</span> Warehouses
        </h4>
      </div>
      <Table pagination={false} columns={columns} dataSource={data[0]} />
    </div>
  );
};
export default WarehouseTable;
