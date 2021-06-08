import React, { useState } from "react";
import axios from "axios";
import { Form, Input, notification, Select, Space, Row, Col } from "antd";
import ArchivedProductTable from "../ArchivedProductTable/ArchivedProductTable";
import ContentBar from "../../../../../ContentBar/ContentBar";
import MoreFilters from "../MoreFilters/MoreFilters";
import { getToken } from "../../../../../../../../../Services/ListServices";

const { Option } = Select;
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

const ArchivedProductFilter = () => {
  const [searchData, setSearchData] = useState([]);
  const [productid, setProductId] = useState();
  const [searchinput, setSearchInput] = useState("");
  const [optionsSelected] = useState([]);
  const [form] = Form.useForm();
  const archiveProductTableMethod_ref = React.useRef(null);
  const reset_ref = React.useRef(null);
  const more_ref = React.useRef(null);
  const moreReset_ref = React.useRef();

  const fetchSearchData = () => {
    const headers = getToken();
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/?is_archived=False&limit=25&paginate=False&search=`,
        { headers }
      )
      .then((res) => {
        const searchDataResponse = res.data;
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

        setSearchData(searchDataResponse);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };

  function onChangeProduct(value) {
    let productId;
    if (value.length !== 0) {
      productId = `id=${value}`;
    }
    setProductId(productId);
  }

  const reset = () => {
    form.resetFields();
    moreReset_ref.current.setFromOutside();
    setProductId(undefined);
    setSearchInput("");
  };

  return (
    <div>
      <ContentBar
        archiveProductTableMethod_ref={archiveProductTableMethod_ref}
        reset_ref={reset_ref}
        more_ref={more_ref}
        incoming="ArchivedProduct"
        title="Archived Products List"
      />
      <Form
        name="basic"
        style={{ marginTop: "20px" }}
        form={form}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Space>
            <Col xs={24} sm={24} md={24} lg={24} xl={9} key={1}>
              <Form.Item label="Product" name="product" labelCol={{ span: 24 }}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={9} key={2}>
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
          </Space>
        </Row>
      </Form>
      <MoreFilters
        more_ref={more_ref}
        ref={moreReset_ref}
        archiveProductTableMethod_ref={archiveProductTableMethod_ref}
        productId={productid}
        searchInput={searchinput}
      />
      <hr />
      <div>
        <ArchivedProductTable
          archiveProductTableMethod_ref={archiveProductTableMethod_ref}
          reset_ref={reset_ref}
          productId={productid}
          searchInput={searchinput}
          reset={reset}
        />
      </div>
    </div>
  );
};
export default ArchivedProductFilter;
