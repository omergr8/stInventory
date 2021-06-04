import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./ArchivedProductTable.module.css";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Button, notification } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "35%",
    render: (text, row) => (
      <Link to={`/dashboard/productpacksize/edit/${row.key}`}>{text}</Link>
    ),
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

const ArchivedProductTable = (props) => {
  const [archivedroduct, setArchivedroduct] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [url, setUrl] = useState(
    `https://inventory-dev-295903.appspot.com/products/?is_archived=true`
  );
  const headers = getToken();
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
    let queryParams;
    if (props.searchInput === "" && props.productId === undefined) {
      queryParams = "";
    } else if (props.productId === undefined && props.searchInput !== "") {
      queryParams = `&search=${props.searchInput}`;
    } else if (props.searchInput === "" && props.productId !== undefined) {
      queryParams = `&${props.productId}`;
    } else {
      queryParams = `&search=${props.searchInput}&${props.productId}`;
    }
    let url = `https://inventory-dev-295903.appspot.com/products/?is_archived=True&paginate=True${queryParams}`;
    setUrl(url);
  };
  const reset = () => {
    props.reset();
    setUrl(
      "https://inventory-dev-295903.appspot.com/products/?is_archived=True&paginate=True"
    );
  };
  React.useEffect(() => {
    props.archiveProductTableMethod_ref.current = getQueryParams;
    props.reset_ref.current = reset;
  }, [props]);
  useEffect(() => {
    let unmounted = false;
    axios
      .get(url, {
        headers,
      })
      .then((res) => {
        if (!unmounted) {
          const ArchivedProductData = res.data;
          setArchivedroduct(ArchivedProductData);
          totalPages(ArchivedProductData);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, [url]);
  let data;
  if (archivedroduct.results !== undefined) {
    data = [
      archivedroduct.results.map((product, index) => ({
        key: product.id,
        name: product.name,
        sku: product.sku,
        uom: product.uom,
        category: (
          <MetaFind id={product.group1_id} incoming="ArchivedProductTable" />
        ),
      })),
    ];
    data = data[0];
  }
  const getPageData = (url) => {
    axios
      .get(url, { headers })
      .then((res) => {
        const packSizeData = res.data;
        setArchivedroduct(packSizeData);
        totalPages(packSizeData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleTableChange = (pagination) => {
    if (pagination === "next") {
      getPageData(archivedroduct.next);
    } else if (pagination === "previous") {
      getPageData(archivedroduct.previous);
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
        }}
        columns={columns}
        dataSource={data}
      />
      {pageButtons}
    </div>
  );
};
export default ArchivedProductTable;
