import React, { useState } from "react";
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
  const productTableMethod_ref = React.useRef(null);

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
      <div style={{ marginBottom: "30px" }}>
        <ContentBar
          productTableMethod_ref={productTableMethod_ref}
          incoming="ProductPackSize"
          title="Pack Size List"
        />
      </div>
      <Form
        {...layout}
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
      </Form>
      <Divider />
      <div>
        <ProductSizeTable
          productId={productid}
          productTableMethod_ref={productTableMethod_ref}
        />
      </div>
    </div>
  );
};
export default ProductSizeFilter;
