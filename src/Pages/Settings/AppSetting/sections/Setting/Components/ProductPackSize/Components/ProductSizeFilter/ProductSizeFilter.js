import React, { useEffect, useState } from "react";
import { Form, notification, Select, Divider } from "antd";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import ProductSizeTable from "../ProductSizeTable/ProductSizeTable";
import ContentBar from "../../../../../ContentBar/ContentBar";
const { Option } = Select;
const layout = {
  wrapperCol: {
    span: 10,
  },
};
const ProductSizeFilter = () => {
  const [searchData, setSearchData] = useState([]);
  const [productid, setProductId] = useState();
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [form] = Form.useForm();
  const productTableMethod_ref = React.useRef(null);
  const reset_ref = React.useRef(null);
  const import_ref = React.useRef(null);
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

  function onChangeProduct(value) {
    let productId;
    if (value.length !== 0) {
      productId = `product=${value}`;
    }
    setProductId(productId);
  }
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
  const reset = () => {
    form.resetFields();
    setProductId(undefined);
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

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <ContentBar
          productTableMethod_ref={productTableMethod_ref}
          reset_ref={reset_ref}
          import_ref={import_ref}
          incoming="ProductPackSize"
          title="Pack Size List"
        />
      </div>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item label="Product" name="product">
          <Select
            mode="multiple"
            showSearch
            allowClear
            filterOption={false}
            placeholder="Search product/sku"
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
      </Form>
      <hr />
      <div>
        <ProductSizeTable
          productId={productid}
          productTableMethod_ref={productTableMethod_ref}
          reset_ref={reset_ref}
          import_ref={import_ref}
          reset={reset}
        />
      </div>
    </div>
  );
};
export default ProductSizeFilter;
