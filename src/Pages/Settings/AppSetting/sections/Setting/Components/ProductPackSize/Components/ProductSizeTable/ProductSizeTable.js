import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ProductSizeTable.module.css";
import { Table, Button, Space } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Pack Size",
    dataIndex: "packsize",
    key: "packsize",
  },
  {
    title: "Product UOM",
    dataIndex: "productuom",
    key: "productuom",
  },
  {
    title: "Pack UOM",
    dataIndex: "packuom",
    key: "packuom",
  },
  {
    title: "Purchase Rate",
    dataIndex: "purchaserate",
    key: "purchaserate",
  },
];

const ProductSizeTable = () => {
  const [packsize, setPackSize] = useState([]);
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
      .get(`https://inventory-dev-295903.appspot.com/products/pack_sizes/`, {
        headers,
      })
      .then((res) => {
        const packSizeData = res.data;
        setPackSize(packSizeData);
        totalPages(packSizeData);
      });
  }, []);
  let data;
  if (packsize.results !== undefined) {
    data = [
      packsize.results.map((product, index) => ({
        key: product.id,
        product: product.product.sku,
        packsize: product.size,
        productuom: product.product.uom,
        packuom: product.uom,
        purchaserate: product.purchase_rate,
      })),
    ];
    data = data[0];
  }
  const getPageData = (url) => {
    axios.get(url, { headers }).then((res) => {
      const packSizeData = res.data;
      setPackSize(packSizeData);

      totalPages(packSizeData);
    });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination === "next") {
      getPageData(packsize.next);
    } else if (pagination === "previous") {
      getPageData(packsize.previous);
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
      <Table pagination={false} columns={columns} dataSource={data} />
      {pageButtons}
    </div>
  );
};
export default ProductSizeTable;
