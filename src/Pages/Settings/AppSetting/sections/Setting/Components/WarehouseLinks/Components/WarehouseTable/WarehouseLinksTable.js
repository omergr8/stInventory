import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../../../../../../../Services/ListServices";
import axios from "axios";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { Table, notification } from "antd";

const columns = [
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (text, row) => (
      <Link to={`/dashboard/warehouselink/edit/${row.key}`}>{text}</Link>
    ),
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
  const headers = getToken();
  const [warehouselinks, setWarehouseLinks] = useState([]);

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Settings Saved. `,
        placement,
      });
    } else if (type === "error")
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data.errors)],
        placement,
      });
  };
  useEffect(() => {
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/warehouses/links/`,
        {
          headers,
        }
      )
      .then((res) => {
        if (!unmounted) {
          const warehouse = res.data;
          setWarehouseLinks(warehouse);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, [setWarehouseLinks]);

  const data = [
    warehouselinks.map((warehouse, index) => ({
      key: warehouse.id,
      warehouse: (
        <MetaFind
          id={warehouse.warehouse_id}
          incoming="WarehouseTableWarehouse"
        />
      ),
      location: warehouse.location_name,
      priority: warehouse.priority,
      channelname: (
        <MetaFind id={warehouse.channel_id} incoming="WarehouseTableChannel" />
      ),
      channel: (
        <MetaFind id={warehouse.channel_id} incoming="WarehouseTableChannel" />
      ),
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
