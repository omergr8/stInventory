import { Table, Button, Space, notification } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import EditTaxModal from "../EditTaxModal/EditTaxModal";
import AddTaxModal from "../AddTaxModel/AddTaxModel";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";

const TaxTable = () => {
  const [tax, setTax] = useState([]);

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Tax Deleted.`,
        placement,
      });
    } else if (type === "error")
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data.errors)],
        placement,
      });
  };

  const onDelete = (id) => {
    axios
      .delete(appUrls.TAXES + id)
      .then((res) => {
        Alert("bottomRight", "success");
        fetchTaxData();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const fetchTaxData = () => {
    axios
      .get(appUrls.TAXES)
      .then((res) => {
        const taxList = res.data;
        setTax(taxList);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchTaxData();
    }
    return () => {
      unmounted = true;
    };
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
      render: (text) => parseFloat((text * 100).toFixed(5)).toString() + "%",
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
            icon={<RiDeleteBin6Line />}
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

  return (
    <div>
      <div style={{ marginTop: "20px", marginBottom: "20px", float: "right" }}>
        <AddTaxModal fetchData={fetchTaxData} />
      </div>
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={data[0]}
      />
    </div>
  );
};
export default TaxTable;
