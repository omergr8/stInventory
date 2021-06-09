import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import classes from "./ArchivedProductTable.module.css";
import MetaFind from "../../../../../MetaFind/MetaFind";
import { Table, Button, notification, Row, Col, Space, Tag } from "antd";
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
  const [selectedrow, setSelectedRow] = useState([]);
  const search = useLocation().search;
  const history = useHistory();
  const [url, setUrl] = useState(`${appUrls.PRODUCTS + search}`);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRow(selectedRowKeys);
    },
  };

  useEffect(() => {
    setUrl(`${appUrls.PRODUCTS + search}`);
  }, [search]);
  useEffect(() => {
    props.reset_ref.current = reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchArchivedProducts();
    }
    return () => {
      unmounted = true;
    };
  }, [url]);

  const fetchArchivedProducts = () => {
    axios
      .get(url)
      .then((res) => {
        const ArchivedProductData = res.data;
        setArchivedroduct(ArchivedProductData);
        totalPages(ArchivedProductData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: error,
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

  const reset = () => {
    props.reset();
    history.push(`/dashboard/archived-product/?is_archived=True`);
  };

  const deleteArchived = () => {
    const deleteObj = {
      product_ids: selectedrow,
    };
    axios
      .post(appUrls.BULK_DELETE_PRODUCTS, deleteObj)
      .then((res) => {
        console.log(res);
        fetchArchivedProducts();
        setSelectedRow([]);
        Alert("bottomRight", "success", "Product Deleted Successfully");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const deleteAllArchived = () => {
    const deleteObj = {
      is_select_all: "True",
    };
    axios
      .post(appUrls.BULK_DELETE_PRODUCTS, deleteObj)
      .then((res) => {
        console.log(res);
        fetchArchivedProducts();
        setSelectedRow([]);
        Alert(
          "bottomRight",
          "success",
          "All Archived Products Deleted Successfully"
        );
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const undoArchived = () => {
    const undoArchiveObj = {
      product_ids: selectedrow,
    };
    axios
      .post(appUrls.BULK_UNDO_ARCHIVE_PRODUCTS, undoArchiveObj)
      .then((res) => {
        console.log(res);
        setSelectedRow([]);
        fetchArchivedProducts();
        Alert("bottomRight", "success", "Unarchived Successfully");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
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
      .get(url)
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
  const selectedButtons = (
    <Space>
      <label> Selected {selectedrow.length} items</label>
      <Button onClick={undoArchived}>Undo Archive Products</Button>
      <Button onClick={deleteArchived}>Delete Selected Products</Button>
      <Button onClick={deleteAllArchived}>Delete All Archived Products</Button>
    </Space>
  );
  const FilterTags = (
    <div style={{ display: "flex" }}>
      <p>Filters Applied: </p>
      <div style={{ marginLeft: "10px" }}>
        {new URLSearchParams(search).get("id") !== null ? (
          <Tag color="cyan">
            Product: {new URLSearchParams(search).get("id")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("search") !== null ? (
          <Tag color="cyan">
            Search: {new URLSearchParams(search).get("search")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("search") === null &&
        new URLSearchParams(search).get("id") === null ? (
          <Tag color="default">None</Tag>
        ) : null}
      </div>
    </div>
  );
  return (
    <div>
      <div>
        {FilterTags}
        <hr />
        <Row>
          <Col xs={24} sm={24} md={24} lg={13} xl={13}>
            {selectedrow.length === 0 ? (
              <label>
                Showing{" "}
                {archivedroduct.results !== undefined
                  ? archivedroduct.results.length
                  : null}{" "}
                results
              </label>
            ) : null}
            {selectedrow.length > 0 ? selectedButtons : null}
          </Col>
          <Col xs={24} sm={4} md={4} lg={3} xl={3} offset={8}>
            {pageButtons}
          </Col>
        </Row>
      </div>

      <Table
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        bordered
        columns={columns}
        dataSource={data}
      />
      {pageButtons}
    </div>
  );
};
export default ArchivedProductTable;
