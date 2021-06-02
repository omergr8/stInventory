import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Tag, notification } from "antd";
import { getToken } from "../../../../../../../../../Services/ListServices";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, row) => (
      <div>
        <div>
          <Link to={`/dashboard/warehouse/edit/${row.key}`}>{text}</Link>
        </div>
        {row.isArchived ? (
          <div>
            <Tag color="blue">{row.isArchived ? "Archived" : "not"}</Tag>
          </div>
        ) : (
          ""
        )}
      </div>
    ),
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Pincode",
    dataIndex: "pincode",
    key: "pincode",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
];

const WarehouseTable = () => {
  const headers = getToken();
  const [warehouses, setWarehouses] = useState([]);

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
      .get(`https://inventory-dev-295903.appspot.com/settings/warehouses/`, {
        headers,
      })
      .then((res) => {
        if (!unmounted) {
          const warehouse = res.data;
          setWarehouses(warehouse);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);
  const data = [
    warehouses.map((warehouse, index) => ({
      key: warehouse.id,
      name: warehouse.name,
      code: warehouse.code,
      address:
        warehouse.address.address_line_1 +
        " " +
        warehouse.address.address_line_2,
      pincode: warehouse.address.pincode,
      contact: warehouse.address.contact,
      isArchived: warehouse.is_archived,
    })),
  ];
  return (
    <div>
      <div>
        <h4>
          Total <span>{warehouses.length}</span> Warehouses
        </h4>
      </div>
      <Table pagination={false} columns={columns} dataSource={data[0]} />
    </div>
  );
};
export default WarehouseTable;
