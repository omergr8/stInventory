import React, { useState } from "react";
import { Form, Input, notification, Select, Divider, Row, Col } from "antd";
import ArchievedProductTable from "../ArchievedProductTable/ArchievedProductTable";
import ContentBar from "../../../../../ContentBar/ContentBar";
import { getToken } from "../../../../../../../../../Services/ListServices";
import axios from "axios";
const { Option } = Select;

const ArchievedProductFilter = () => {
  const [searchData, setSearchData] = useState([]);
  const [productid, setProductId] = useState();
  const [searchinput, setSearchInput] = useState("");
  const [optionsSelected] = useState([]);
  const archiveProductTableMethod_ref = React.useRef(null);
  function onChangeProduct(value) {
    let productId;
    if (value.length !== 0) {
      productId = `id=${value}`;
    }
    setProductId(productId);
  }
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
  const fetchSearchData = () => {
    const headers = getToken();
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/?is_archived=False&limit=25&paginate=False&search=`,
        { headers }
      )
      .then((res) => {
        const searchDataResponse = res.data;
        console.log(searchDataResponse);
        setSearchData(searchDataResponse);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const onSearch = (val) => {
    const headers = getToken();
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/?is_archived=False&limit=25&paginate=False&search=${val}`,
        { headers }
      )
      .then((res) => {
        const searchDataResponse = res.data;
        console.log(searchDataResponse);
        setSearchData(searchDataResponse);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <ContentBar
        archiveProductTableMethod_ref={archiveProductTableMethod_ref}
        incoming="ArchievedProduct"
        title="Archived Products List"
      />
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={18}>
          <Col xs={24} sm={24} md={24} lg={24} xl={10} key={1}>
            <Form.Item
              label="Product"
              name="product"
              rules={[
                {
                  required: false,
                  message: "Please input your username!",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                style={{ width: "400px" }}
                placeholder="Search product/sku"
                optionFilterProp="children"
                onChange={onChangeProduct}
                onFocus={fetchSearchData}
                onSearch={onSearch}
              >
                {searchData.map((res, index) => (
                  <Option
                    key={index}
                    value={res.id}
                    disabled={
                      productid !== undefined
                        ? optionsSelected.includes(res.name)
                          ? false
                          : true
                        : false
                    }
                  >
                    {res.name}/ {res.print_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={10} key={2}>
            <Form.Item
              label="Search"
              name="search"
              rules={[
                {
                  required: false,
                  message: "Please input your username!",
                },
              ]}
              labelCol={{ span: 24 }}
            >
              <Input
                style={{ width: "300px" }}
                placeholder="Any part of product name/sku"
                value={searchinput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
      <div>
        <ArchievedProductTable
          archiveProductTableMethod_ref={archiveProductTableMethod_ref}
          productId={productid}
          searchInput={searchinput}
        />
      </div>
    </div>
  );
};
export default ArchievedProductFilter;
