import React, { useState, useEffect } from "react";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import ContentBar from "../../../../../ContentBar/ContentBar";
import AddWarehouseModal from "../AddWarehouseModal/AddWarehouseModal";
import { Link } from "react-router-dom";
import { Table, Tag, notification } from "antd";

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
  const fetchWarehouses = () => {
    axios
      .get(appUrls.WAREHOUSES)
      .then((res) => {
        const warehouse = res.data;
        setWarehouses(warehouse);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchWarehouses();
    }
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
  const [modal, setModal] = useState(false);
  const setModalFalse = () => {
    setModal(false);
  };
  return (
    <div>
      <ContentBar
        addWarehouse={() => setModal(true)}
        title="Warehouse List"
        incoming="Warehouses"
      />
      <div>
        <AddWarehouseModal
          modal={modal}
          setModalFalse={setModalFalse}
          fetchWarehouses={fetchWarehouses}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>
          Total <span>{warehouses.length}</span> Warehouses
        </p>
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
export default WarehouseTable;
