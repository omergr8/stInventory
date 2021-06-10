import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { queryParams } from "../../../../../../../../../Services/ListServices";
import { Table, Tag, Button, notification } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import { appRoutes } from "../../../../../../../../../Constants/appRoutes";
import { Constants } from "../../../../../../../../../Constants/Constants";
import { Link } from "react-router-dom";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { dateFormatter } from "../../../../../../../../../Services/ListServices";
import FilterTags from "../FilterTags/FilterTags";
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
    render: (text) =>
      text !== "Not Tracked" ? (
        <Tag color="#87d068">{text}</Tag>
      ) : text === "Not Tracked" ? (
        <Tag color="default">{text}</Tag>
      ) : (
        ""
      ),
  },
  {
    title: "Last Update Time",
    dataIndex: "updatetime",
    render: (text) => dateFormatter(text),
  },
];

const ProductTable = (props) => {
  const [product, setProduct] = useState({});
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const history = useHistory();
  const search = useLocation().search;
  const [url, setUrl] = useState(appUrls.PRODUCT_LINKS + search);

  useEffect(() => {
    setUrl(appUrls.PRODUCT_LINKS + search);
  }, [search]);
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
    history.push(appRoutes.PRODUCT_LISTING + queryParamsList);
  };
  const reset = () => {
    props.reset();
    history.push(appRoutes.PRODUCT_LISTING);
    setUrl(appUrls.PRODUCT_LINKS + "?is_archived=False");
  };
  useEffect(() => {
    props.productTableMethod_ref.current = getQueryParams;
    props.reset_ref.current = reset;
  }, [props]);

  useEffect(() => {
    let unmounted = false;
    axios
      .get(url)
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
          ? "Archived"
          : product.product.is_ebay_inventory_item
          ? "Uses Inventory API"
          : product.product.tracking_type ===
            Constants.TRACKING_TYPE.NOT_TRACKED
          ? "Not Tracked"
          : "",
        updatetime: product.stock_update_time,
      })),
    ];
    data = data[0];
  }

  const getPageData = (url) => {
    let unmounted = false;
    axios
      .get(url)
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
  const handleTableChange = (pagination) => {
    if (pagination === "next") {
      getPageData(product.next);
    } else if (pagination === "previous") {
      getPageData(product.previous);
    }
  };
  new URLSearchParams(search).get("channel");
  return (
    <div>
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
      <div style={{ display: "flex" }}>
        <p>Filters Applied: </p>
        <FilterTags />
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
