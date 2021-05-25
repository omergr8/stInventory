import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

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
  const [warehousee, setWarehouse] = useState([]);
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
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/warehouses/links/`,
        {
          headers,
        }
      )
      .then((res) => {
        const warehouse = res.data;
        setWarehouseLinks(warehouse);
        console.log(warehouse);
      });
  }, []);

  const getChannel = (id) => {
    console.log(id);
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/${id}`,
        {
          headers,
        }
      )
      .then((res) => {
        const channelName = res.data;
        setChannel(channelName.name);
      });

    return channel;
  };
  var CHANNEL_TYPE = {
    SHOPIFY: 2,
    AMAZON: 3,
    OFFLINE: 5,
    WOOCOMMERCE: 6,
    EBAY: 7,
    ETSY: 8,
  };
  const getWarehouse = () => {
    const asArray = Object.entries(CHANNEL_TYPE);
    const filtered = asArray.filter(([key, value]) => value === 2);
    const atLeast9WinsObject = Object.fromEntries(filtered);
    console.log(filtered, atLeast9WinsObject);
  };

  const data = [
    warehouselinks.map((warehouse, index) => ({
      key: warehouse.id,
      warehouse: getWarehouse(),
      location: warehouse.location_name,
      priority: warehouse.priority,
      channelname:
        warehouse.channel_id === 2
          ? "SHOPIFY"
          : warehouse.channel_id === 3
          ? "AMAZON"
          : warehouse.channel_id === 5
          ? "OFFLINE"
          : warehouse.channel_id === 6
          ? "WOOCOMMERCE"
          : warehouse.channel_id === 7
          ? "EBAY"
          : warehouse.channel_id === 8
          ? "ETSY"
          : "",
      channel: getChannel(warehouse.channel_id),
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
