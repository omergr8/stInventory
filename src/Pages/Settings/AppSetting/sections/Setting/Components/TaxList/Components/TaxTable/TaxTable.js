import { Table, Button, Space } from "antd";
import { AiFillDelete } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import EditTaxModal from "../EditTaxModal/EditTaxModal";
import AddTaxModal from "../AddTaxModel/AddTaxModel";
import axios from "axios";

const TaxTable = () => {
  const [tax, setTax] = useState([]);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };
  const onDelete = (id) => {
    axios
      .delete(`https://inventory-dev-295903.appspot.com/settings/taxes/${id}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        fetchTaxData();
      });
  };
  const fetchTaxData = () => {
    axios
      .get(`https://inventory-dev-295903.appspot.com/settings/taxes/`, {
        headers,
      })
      .then((res) => {
        const taxList = res.data;
        setTax(taxList);
        console.log(taxList);
      });
  };
  useEffect(() => {
    fetchTaxData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (text) => text * 100 + "%",
    },

    {
      title: "Action",
      key: "action",
      render: (text, row, record) => (
        <Space size="middle">
          <EditTaxModal
            incoming="edit"
            id={row.key}
            percentage={row.percentage}
            taxData={row.tax}
            name={row.name}
            fetchData={fetchTaxData}
          />
          <Button
            onClick={() => onDelete(row.key)}
            type="primary"
            danger
            icon={<AiFillDelete />}
            size="small"
          />
        </Space>
      ),
    },
  ];

  const data = [
    tax.map((tax, index) => ({
      key: tax.id,
      name: tax.name,
      percentage: tax.tax_rate,
      tax: tax.tax_data,
    })),
  ];

  console.log(data);
  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        <AddTaxModal fetchData={fetchTaxData} />
      </div>
      <Table pagination={false} columns={columns} dataSource={data[0]} />
    </div>
  );
};
export default TaxTable;
