import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ProductSizeTable.module.css";
import { Table, Button, notification } from "antd";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text, row) => (
      <Link to={`/dashboard/productpacksize/edit/${row.id}`}>{text}</Link>
    ),
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

const ProductSizeTable = (props) => {
  const [packsize, setPackSize] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [url, setUrl] = useState(
    `https://inventory-dev-295903.appspot.com/products/pack_sizes/`
  );
  const headers = getToken();

  const totalPages = (product) => {
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
  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Settings Saved. `,
        placement,
      });
    } else if (type === "error" && error !== undefined) {
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data.errors)],
        placement,
      });
    } else if (type === "error" && error === undefined) {
      notification.error({
        message: `Error Code: ${error} `,

        placement,
      });
    }
  };
  const getQueryParams = () => {
    let url = `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=True&${props.productId}`;
    setUrl(url);
  };
  React.useEffect(() => {
    props.productTableMethod_ref.current = getQueryParams;
  }, [props]);
  useEffect(() => {
    let unmounted = false;
    axios
      .get(url, {
        headers,
      })
      .then((res) => {
        const packSizeData = res.data;
        if (!unmounted) {
          setPackSize(packSizeData);
          totalPages(packSizeData);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          Alert("bottomRight", "error", err.response);
        } else {
          Alert("bottomRight", "error", "Undefined Error");
        }
      });
    return () => {
      unmounted = true;
    };
  }, [url]);
  let data;
  if (packsize.results !== undefined) {
    data = [
      packsize.results.map((product, index) => ({
        id: product.product_id,
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
    axios
      .get(url, { headers })
      .then((res) => {
        const packSizeData = res.data;
        setPackSize(packSizeData);
        totalPages(packSizeData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
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
