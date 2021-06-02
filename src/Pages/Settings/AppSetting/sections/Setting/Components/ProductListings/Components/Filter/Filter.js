import React, { useState } from "react";
import { Form, Row, Col, notification, Select } from "antd";
import { getToken } from "../../../../../../../../../Services/ListServices";
import ProductTable from "../ProductTable/ProductTable";
import ContentBar from "../../../../../ContentBar/ContentBar";
import axios from "axios";
const { Option } = Select;

const Filter = () => {
  const [searchData, setSearchData] = useState([]);
  const [productid, setProductId] = useState();
  const [channelid, setChannelId] = useState();
  const [trackingid, setTrackingId] = useState();
  const [inventorysync, setInventorySync] = useState();
  const [optionsSelected, setOptionsSelected] = useState([]);
  const localChannel = JSON.parse(localStorage.getItem("meta-data"));
  const [channel] = useState(localChannel.channels);
  const [form] = Form.useForm();
  const productTableMethod_ref = React.useRef(null);

  function onChangeProduct(value) {
    let productId;
    if (value.length !== 0) {
      productId = `product=${value}`;
    }
    setProductId(productId);
  }
  function onChangeChannel(value) {
    setOptionsSelected(value);
    let channelId;
    if (value.length !== 0) {
      channelId = `channel=${value}`;
    }
    setChannelId(channelId);
  }
  function onChangeTrack(value) {
    setOptionsSelected(value);
    let trackingId;
    if (value.length !== 0) {
      trackingId = `product_tracking_type=${value}`;
    }

    setTrackingId(trackingId);
  }
  function onChangeInventory(value) {
    let inventory;
    if (value.length !== 0) {
      inventory = `has_inventory_sync=${value}`;
    }
    setInventorySync(inventory);
  }

  const errorAlert = (placement, error) => {
    notification.error({
      message: `Error Code: ${error.status} `,
      description: [JSON.stringify(error.data)],
      placement,
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
        errorAlert("bottomRight", err.response);
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
        errorAlert("bottomRight", err.response);
      });
  };
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <ContentBar
          productTableMethod_ref={productTableMethod_ref}
          incoming="ProductListings"
          title="Product Listings"
        />
      </div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <Row gutter={18}>
          <Col span={9} key={1}>
            <Form.Item name="Product" label="Product">
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
          </Col>
          <Col span={5} key={2}>
            <Form.Item name="Channel " label="Channel">
              <Select
                mode="multiple"
                allowClear
                placeholder="Select Channel"
                onChange={onChangeChannel}
              >
                {channel.map((res, index) => (
                  <Option
                    key={index}
                    value={res.id}
                    disabled={
                      channelid !== undefined
                        ? optionsSelected.includes(res.name)
                          ? false
                          : true
                        : false
                    }
                  >
                    {res.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5} key={3}>
            <Form.Item name="Tracking Type " label="Tracking Type">
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Tracking Type"
                optionFilterProp="children"
                onChange={onChangeTrack}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option
                  disabled={
                    trackingid !== undefined
                      ? optionsSelected.includes(2)
                        ? false
                        : true
                      : false
                  }
                  key={1}
                  value={2}
                >
                  Tracked
                </Option>
                <Option
                  disabled={
                    trackingid !== undefined
                      ? optionsSelected.includes(5)
                        ? false
                        : true
                      : false
                  }
                  key={2}
                  value={5}
                >
                  Not Tracked
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={5} key={4}>
            <Form.Item name="Inventory Sync" label="Inventory Sync">
              <Select defaultValue="all" onChange={onChangeInventory}>
                <Option>All</Option>
                <Option value={true}>Sync On</Option>

                <Option value={false}>Sync Off</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ProductTable
        productId={productid}
        channelId={channelid}
        trackingId={trackingid}
        inventorySync={inventorysync}
        productTableMethod_ref={productTableMethod_ref}
      />
    </div>
  );
};
export default Filter;
