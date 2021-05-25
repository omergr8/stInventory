import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [warehouses, setWarehouses] = useState([]);
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };
  useEffect(() => {
    axios
      .get(`https://inventory-dev-295903.appspot.com/settings/warehouses/`, {
        headers,
      })
      .then((res) => {
        const warehouse = res.data;
        setWarehouses(warehouse);
        console.log(warehouse);
      });
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
