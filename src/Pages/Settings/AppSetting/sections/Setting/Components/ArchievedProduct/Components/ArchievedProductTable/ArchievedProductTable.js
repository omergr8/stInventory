import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./ArchievedProductTable.module.css";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Button, notification } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
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

const ArchievedProductTable = (props) => {
  const [archievedroduct, setArchievedroduct] = useState([]);
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
  React.useEffect(() => {
    props.archiveProductTableMethod_ref.current = getQueryParams;
  }, [props]);
  useEffect(() => {
    let unmounted = false;
    axios
      .get(url, {
        headers,
      })
      .then((res) => {
        if (!unmounted) {
          const ArchievedProductData = res.data;
          setArchievedroduct(ArchievedProductData);
          totalPages(ArchievedProductData);
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
    axios
      .get(url, { headers })
      .then((res) => {
        const packSizeData = res.data;
        setArchievedroduct(packSizeData);
        totalPages(packSizeData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleTableChange = (pagination) => {
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
        }}
        columns={columns}
        dataSource={data}
      />
      {pageButtons}
    </div>
  );
};
export default ArchievedProductTable;
