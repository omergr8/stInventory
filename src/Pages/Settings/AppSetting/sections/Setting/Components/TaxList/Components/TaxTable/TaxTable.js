import { Table, Button, Space } from "antd";
import { AiFillDelete } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from "axios";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Percentage",
    dataIndex: "percentage",
    key: "percentage",
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" size="small">
          Edit
        </Button>
        <Button type="primary" danger icon={<AiFillDelete />} size="small" />
      </Space>
    ),
  },
];

const TaxTable = () => {
  const [tax, setTax] = useState([]);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };

  useEffect(() => {
    axios
      .get(`https://inventory-dev-295903.appspot.com/settings/taxes/`, {
        headers,
      })
      .then((res) => {
        const taxList = res.data;
        setTax(taxList);
        console.log(taxList);
      });
  }, []);

  const data = [
    tax.map((tax, index) => ({
      key: tax.id,
      name: tax.name,
      percentage: tax.tax_rate + "%",
    })),
  ];

  console.log(data);
  return (
    <div>
      <Table pagination={false} columns={columns} dataSource={data[0]} />
    </div>
  );
};
export default TaxTable;
