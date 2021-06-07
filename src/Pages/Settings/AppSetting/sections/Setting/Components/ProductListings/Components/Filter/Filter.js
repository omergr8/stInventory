import React, { useState } from "react";
import { Form, Row, Col, notification, Select } from "antd";
import {
  getToken,
  getAllChannels,
} from "../../../../../../../../../Services/ListServices";
import ProductTable from "../ProductTable/ProductTable";
import ContentBar from "../../../../../ContentBar/ContentBar";
import axios from "axios";
const { Option } = Select;

const Filter = (props) => {
  const [searchData, setSearchData] = useState([]);
  const [productid, setProductId] = useState();
  const [channelid, setChannelId] = useState();
  const [allchannels, setAllChannels] = useState(getAllChannels());
  const [trackingid, setTrackingId] = useState();
  const [inventorysync, setInventorySync] = useState();
  const [optionsSelected, setOptionsSelected] = useState([]);
  const [onchangeinventory, setOnChangeInventory] = useState("all");
  const localChannel = JSON.parse(localStorage.getItem("meta-data"));
  const [channel] = useState(localChannel.channels);
  const [form] = Form.useForm();
  const productTableMethod_ref = React.useRef(null);
  const reset_ref = React.useRef(null);
  function onChangeProduct(value) {
    let productId;
    if (value.length !== 0) {
      productId = `product=${value}`;
    }
    // else {
    //   productId = "";
    // }

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
    setOnChangeInventory(value);
    if (value !== undefined && value !== null) {
      if (value.length !== 0 && value !== "all") {
        inventory = `has_inventory_sync=${value}`;
      }
    }
    setInventorySync(inventory);
  }
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
  const reset = () => {
    form.resetFields();
    setProductId();
    setChannelId();
    setTrackingId();
    setInventorySync();
    setOnChangeInventory("all");
  };
  const sync = (value, type) => {
    const headers = getToken();
    if (type === "inventory") {
      axios
        .post(
          `https://inventory-dev-295903.appspot.com/ecom/settings/channels/hard_refresh_inventory/${value}/`,
          {},
          { headers }
        )
        .then((res) => {
          Alert("bottomRight", "success", "Inventory Synced.");
        })
        .catch((err) => {
          Alert("bottomRight", "error", err.response);
        });
    } else if (type === "product") {
      axios
        .post(
          `https://inventory-dev-295903.appspot.com/ecom/settings/channels/sync_products/${value}/`,
          {},
          { headers }
        )
        .then((res) => {
          Alert("bottomRight", "success", "Product Synced.");
        })
        .catch((err) => {
          Alert("bottomRight", "error", err.response);
        });
    }
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
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <ContentBar
          productTableMethod_ref={productTableMethod_ref}
          reset_ref={reset_ref}
          channels={allchannels}
          incoming="ProductListings"
          title="Product Listings"
          sync={(value, type) => sync(value, type)}
        />
      </div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <Row gutter={10}>
          <Col span={8} key={1}>
            <Form.Item name="Product" labelCol={{ span: 24 }} label="Product">
              <Select
                mode="multiple"
                showSearch
                allowClear
                placeholder="Search product/sku"
                filterOption={false}
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
          <Col span={4} key={2}>
            <Form.Item name="Channel " labelCol={{ span: 24 }} label="Channel">
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
          <Col span={4} key={3}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="Tracking Type "
              label="Tracking Type"
            >
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
          <Col span={4} key={4}>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label="Inventory Sync"
            >
              <Select value={onchangeinventory} onChange={onChangeInventory}>
                <Option value={"all"}>All</Option>
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
        reset_ref={reset_ref}
        productTableMethod_ref={productTableMethod_ref}
        reset={reset}
      />
    </div>
  );
};
export default Filter;
