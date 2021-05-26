import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./ProductCategoryTable.module.css";
import { Table, Button, Space } from "antd";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

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
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" size="small">
          Edit
        </Button>
        <Button type="primary" danger icon={<AiFillDelete />} size="small" />
      </Space>
    ),
  },
];

const ProductCategoryTable = () => {
  const [productcategory, setProductCategory] = useState([]);
  const [nextButtonState, setNextButton] = useState(true);
  const [previousButtonState, setPreviousButton] = useState(true);
  const [autosno, setSno] = useState(0);
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
      // setItem(totalItem + 2);

      setNextButton(false);
    } else {
      setNextButton(true);
    }
    if (product.previous !== null) {
      setPreviousButton(false);
    } else {
      setPreviousButton(true);
    }

    // console.log(totalItem);
  };

  useEffect(() => {
    axios
      .get(`https://inventory-dev-295903.appspot.com/products/groups/1/`, {
        headers,
      })
      .then((res) => {
        const productCategory = res.data;
        setProductCategory(productCategory);
        totalPages(productCategory);

        // console.log("kk", productCategory);
      });
  }, []);
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
  const getPageData = (url) => {
    axios.get(url, { headers }).then((res) => {
      const productCategoryData = res.data;
      setProductCategory(productCategoryData);
      //   if (action === "next") {
      //     // setSno(autosno + productCategoryData.results.length);
      //     setSno((sno) => sno + productCategoryData.results.length);
      //     console.log(
      //       autosno,
      //       productCategoryData.results.length,
      //       productCategoryData
      //     );
      //   } else if (action === "previous") {
      //     setSno((sno) => sno - productCategoryData.results.length);
      //     console.log(
      //       autosno,
      //       productCategoryData.results.length,
      //       productCategoryData
      //     );
      //   }
      totalPages(productCategoryData);
    });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination === "next") {
      getPageData(productcategory.next);
      //   setSno((sno) => sno + productcategory.results.length);
      //   console.log(autosno);
    } else if (pagination === "previous") {
      getPageData(productcategory.previous);
      //   setSno((sno) => sno - productcategory.results.length);
      //   console.log(autosno);
    }
  };

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
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};
export default ProductCategoryTable;
