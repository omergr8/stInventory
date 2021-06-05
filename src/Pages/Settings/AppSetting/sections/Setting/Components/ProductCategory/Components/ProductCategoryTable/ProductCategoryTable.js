import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ProductCategoryTable.module.css";
import ContentBar from "../../../../../ContentBar/ContentBar";
import AddProductGroupModal from "../AddProductGroupModal/AddProductGroupModal";
import EditProductGroupModal from "../EditProductGroupModal/EditProductGroupModal";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Button, Space, notification } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

const ProductCategoryTable = () => {
  const [productcategory, setProductCategory] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [showmodal, setShowModal] = useState(false);
  const headers = getToken();
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
  const deleteProduct = (id) => {
    axios
      .delete(
        `https://inventory-dev-295903.appspot.com/products/groups/1/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        Alert("bottomRight", "success", "Deleted Successfully.");
        fetchData();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const fetchData = () => {
    setShowModal(false);
    axios
      .get(`https://inventory-dev-295903.appspot.com/products/groups/1/`, {
        headers,
      })
      .then((res) => {
        const productCategory = res.data;
        setProductCategory(productCategory);
        totalPages(productCategory);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchData();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, row) => (
        <Space size="middle">
          <EditProductGroupModal
            fetchData={fetchData}
            id={row.key}
            name={row.name}
          />
          <Button
            type="button"
            type="primary"
            danger
            icon={<AiFillDelete />}
            onClick={() => deleteProduct(row.key)}
            size="small"
          />
        </Space>
      ),
    },
  ];
  let data;
  if (productcategory.results !== undefined) {
    data = [
      productcategory.results.map((product, index) => ({
        key: product.id,
        sno: index + 1,
        name: product.name,
      })),
    ];
    data = data[0];
  }

  const addNew = (name) => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
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

  const getPageData = (url) => {
    axios
      .get(url, { headers })
      .then((res) => {
        const productCategoryData = res.data;
        setProductCategory(productCategoryData);
        totalPages(productCategoryData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleTableChange = (pagination) => {
    if (pagination === "next") {
      getPageData(productcategory.next);
    } else if (pagination === "previous") {
      getPageData(productcategory.previous);
    }
  };
  const categoryImport = (file) => {
    let inputFR = new FileReader();
    inputFR.readAsText(file);
    inputFR.onload = () => {
      let body = new Blob([inputFR.result], { type: "text/csv" });
      axios
        .post(
          "https://inventory-dev-295903.appspot.com/products/groups/1/import/",
          body,
          {
            headers: {
              "Content-Type": "text/csv",
              Authorization: `token ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            fetchData();
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
  return (
    <div>
      <ContentBar
        addNew={addNew}
        categoryImport={(file) => categoryImport(file)}
        incoming="ProductCategory"
        title="Product Categories"
      />
      {showmodal ? (
        <AddProductGroupModal
          fetchData={fetchData}
          showModal={showmodal}
          closeModal={closeModal}
        />
      ) : null}
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
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};
export default ProductCategoryTable;
