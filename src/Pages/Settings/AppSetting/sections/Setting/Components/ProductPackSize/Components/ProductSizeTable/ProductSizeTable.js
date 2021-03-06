import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import { appRoutes } from "../../../../../../../../../Constants/appRoutes";
import classes from "./ProductSizeTable.module.css";
import { Table, Button, notification, Tag } from "antd";
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
  const search = useLocation().search;
  const [url, setUrl] = useState(appUrls.PRODUCT_PACK_SIZES + search);
  const history = useHistory();

  useEffect(() => {
    setUrl(appUrls.PRODUCT_PACK_SIZES + search);
  }, [search]);
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
        message: error,
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
    } else if (type === "errorSuccess" && error !== undefined) {
      notification.error({
        message: `Error Code: 500 `,
        description: [JSON.stringify(error)],
        placement,
      });
    }
  };
  const getQueryParams = () => {
    if (props.productId === undefined) {
      history.push(appRoutes.PRODUCT_PACK_SIZE);
    } else {
      history.push(appRoutes.PRODUCT_PACK_SIZE + "&" + props.productId);
    }
  };
  const reset = () => {
    props.reset();
    history.push(appRoutes.PRODUCT_PACK_SIZE);
    // setUrl("https://inventory-dev-295903.appspot.com/products/pack_sizes/");
  };
  const importt = (file) => {
    let inputFR = new FileReader();
    inputFR.readAsText(file);
    inputFR.onload = () => {
      let body = new Blob([inputFR.result], { type: "text/csv" });
      axios
        .post(appUrls.PRODUCT_PACK_SIZES + "import/", body, {
          headers: {
            "Content-Type": "text/csv",
            Authorization: `token ${JSON.parse(localStorage.getItem("token"))}`,
          },
        })
        .then((res) => {
          if (res) {
            fetchProductSize();
          }
          if (res.data.errors) {
            Alert("bottomRight", "errorSuccess", res.data.errors);
          } else {
            Alert("bottomRight", "success", "imported successfully");
          }
        })
        .catch((err) => {
          Alert("bottomRight", "error", err.response);
        });
    };
  };
  React.useEffect(() => {
    props.productTableMethod_ref.current = getQueryParams;
    props.reset_ref.current = reset;
    props.import_ref.current = (file) => importt(file);
  }, [props]);
  const fetchProductSize = () => {
    axios
      .get(url)
      .then((res) => {
        const packSizeData = res.data;

        setPackSize(packSizeData);
        totalPages(packSizeData);
      })
      .catch((err) => {
        if (err.response !== undefined) {
          Alert("bottomRight", "error", err.response);
        } else {
          Alert("bottomRight", "error", "Undefined Error");
        }
      });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchProductSize();
    }
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
      .get(url)
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
  const FilterTags = (
    <div style={{ display: "flex" }}>
      <p>Filters Applied: </p>
      <div style={{ marginLeft: "10px" }}>
        {new URLSearchParams(search).get("product") !== null ? (
          <Tag color="cyan">
            Product: {new URLSearchParams(search).get("product")}
          </Tag>
        ) : (
          <Tag color="default">None</Tag>
        )}
      </div>
    </div>
  );
  return (
    <div>
      {pageButtons}
      {FilterTags}
      <Table pagination={false} columns={columns} dataSource={data} />
      {pageButtons}
    </div>
  );
};
export default ProductSizeTable;
