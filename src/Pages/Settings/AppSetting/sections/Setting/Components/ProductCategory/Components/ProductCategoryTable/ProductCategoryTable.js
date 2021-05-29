import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ProductCategoryTable.module.css";
import ContentBar from "../../../../../ContentBar/ContentBar";
import AddProductGroupModal from "../AddProductGroupModal/AddProductGroupModal";
import EditProductGroupModal from "../EditProductGroupModal/EditProductGroupModal";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Button, Space } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

const ProductCategoryTable = () => {
  const [productcategory, setProductCategory] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [showmodal, setShowModal] = useState(false);
  const headers = getToken();

  const deleteProduct = (id) => {
    axios
      .delete(
        `https://inventory-dev-295903.appspot.com/products/groups/1/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        fetchData();
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
      });
  };
  useEffect(() => {
    console.log("useeffect");
    fetchData();
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

  const getPageData = (url) => {
    axios.get(url, { headers }).then((res) => {
      const productCategoryData = res.data;
      setProductCategory(productCategoryData);
      totalPages(productCategoryData);
    });
  };
  const handleTableChange = (pagination) => {
    if (pagination === "next") {
      getPageData(productcategory.next);
    } else if (pagination === "previous") {
      getPageData(productcategory.previous);
    }
  };

  return (
    <div>
      <ContentBar
        addNew={addNew}
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
