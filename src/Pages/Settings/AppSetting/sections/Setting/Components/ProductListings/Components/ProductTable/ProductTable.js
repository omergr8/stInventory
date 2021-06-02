import React, { useState, useEffect } from "react";
import { queryParams } from "../../../../../../../../../Services/ListServices";
import { Table, Tag, Button, notification } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import axios from "axios";
import { Link } from "react-router-dom";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { getToken } from "../../../../../../../../../Services/ListServices";
import classes from "./ProductTable.module.css";

const columns = [
  {
    title: "Product	",
    dataIndex: "product",
    render: (text, row) => (
      <Link to={`/dashboard/productpacksize/edit/${row.id}`}>{text}</Link>
    ),
  },
  {
    title: "Sumtracker SKU",
    dataIndex: "sumtracker",
  },
  {
    title: "Remote ID",
    dataIndex: "remote",
  },
  {
    title: "Inv Sync",
    dataIndex: "inv",
    render: (cond) =>
      cond ? (
        <div className={classes.trueInv}></div>
      ) : (
        <div className={classes.falseInv}></div>
      ),
  },
  {
    title: "Channel",
    dataIndex: "channel",
  },
  {
    title: "Properties",
    dataIndex: "properties",
    render: (text) => (text ? <Tag color="#87d068">{text}</Tag> : ""),
  },
  {
    title: "Last Update Time",
    dataIndex: "updatetime",
  },
];

const ProductTable = (props) => {
  const headers = getToken();
  const [product, setProduct] = useState({});
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [url, setUrl] = useState(
    `https://inventory-dev-295903.appspot.com/ecom/settings/channels/products/links/?is_archieved=False`
  );

  const errorAlert = (placement, error) => {
    notification.error({
      message: `Error Code: ${error.status} `,
      description: [JSON.stringify(error.data)],
      placement,
    });
  };
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
  const getQueryParams = () => {
    const queryParamsList = queryParams(props);
    let url = `https://inventory-dev-295903.appspot.com/ecom/settings/channels/products/links/?is_archieved=False${queryParamsList}`;
    setUrl(url);
  };
  useEffect(() => {
    props.productTableMethod_ref.current = getQueryParams;
  }, [props]);

  useEffect(() => {
    let unmounted = false;
    axios
      .get(url, { headers })
      .then((res) => {
        if (!unmounted) {
          const productLinks = res.data;
          setProduct(productLinks);
          totalPages(productLinks);
        }
      })
      .catch((err) => {
        errorAlert("bottomRight", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, [url]);

  let data;
  if (product.results !== undefined) {
    data = [
      product.results.map((product, index) => ({
        key: index,
        id: product.product.id,
        product: product.product.name,
        sumtracker: product.product.sku,
        remote: product.remote_id,
        inv: product.has_inventory_sync,
        channel: <MetaFind incoming="ProductTable" id={product.channel_id} />,
        properties: product.product.is_bundle
          ? "B"
          : product.product.is_archived
          ? "Archieved"
          : product.product.is_ebay_inventory_item
          ? "Uses Inventory API"
          : "",
        updatetime: product.stock_update_time,
      })),
    ];
    data = data[0];
  }

  const getPageData = (url) => {
    let unmounted = false;
    axios
      .get(url, { headers })
      .then((res) => {
        if (!unmounted) {
          const productLinks = res.data;
          setProduct(productLinks);
          totalPages(productLinks);
        }
      })
      .catch((err) => {
        errorAlert("bottomRight", err.response);
      });
    return () => {
      unmounted = true;
    };
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination === "next") {
      getPageData(product.next);
    } else if (pagination === "previous") {
      getPageData(product.previous);
    }
  };
  return (
    <div>
      {/* <div> <Button onClick={getQueryParams}>test</Button></div> */}
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
      <Table columns={columns} dataSource={data} bordered pagination={false} />
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
    </div>
  );
};
export default ProductTable;
