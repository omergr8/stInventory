import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ArchievedProductTable.module.css";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { Table, Button } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "SKU",
    dataIndex: "sku",
  },
  {
    title: "UOM",
    dataIndex: "uom",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const ArchievedProductTable = () => {
  const [archievedroduct, setArchievedroduct] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };

  const totalPages = (product) => {
    console.log("total", product.next);
    if (product.next !== null) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
    if (product.previous !== null) {
      setPreviousButton(false);
    } else {
      setPreviousButton(true);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/?is_archived=true`,
        {
          headers,
        }
      )
      .then((res) => {
        const ArchievedProductData = res.data;
        console.log(ArchievedProductData);
        setArchievedroduct(ArchievedProductData);
        totalPages(ArchievedProductData);
      });
  }, []);
  let data;
  if (archievedroduct.results !== undefined) {
    data = [
      archievedroduct.results.map((product, index) => ({
        key: product.id,
        name: product.name,
        sku: product.sku,
        uom: product.uom,
        category: (
          <MetaFind id={product.group1_id} incoming="ArchievedProductTable" />
        ),
      })),
    ];
    data = data[0];
  }
  const getPageData = (url) => {
    axios.get(url, { headers }).then((res) => {
      const packSizeData = res.data;
      setArchievedroduct(packSizeData);

      totalPages(packSizeData);
    });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination === "next") {
      getPageData(archievedroduct.next);
    } else if (pagination === "previous") {
      getPageData(archievedroduct.previous);
    }
  };
  const pageButtons = (
    <div style={{ float: "right" }}>
      <Button
        className={classes.button}
        disabled={previousButtonState}
        type="primary"
        icon={<GrFormPreviousLink />}
        onClick={() => handleTableChange("previous")}
      />
      <Button
        className={classes.button}
        disabled={nextButtonState}
        type="primary"
        icon={<GrFormNextLink />}
        onClick={() => handleTableChange("next")}
      />
    </div>
  );
  return (
    <div>
      {pageButtons}
      <Table
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      {pageButtons}
    </div>
  );
};
export default ArchievedProductTable;
