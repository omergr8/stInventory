import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import MetaFind from "../../../../../MetaFind/MetaFind";
import ContentBar from "../../../../../ContentBar/ContentBar";
import { Form, Input, Button, Select, notification } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 11,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

export const WarehouseLinksDetails = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const headers = getToken();
  const [warehouselinks, setWarehouseLinks] = useState([]);
  const [channel, setChannel] = useState(Number);
  const [channelname, setChannelName] = useState(Number);
  const [sumtrackerwarehouse, setSumtrackerWarehouse] = useState([]);
  const [shopifylocationid, setShopifyLocationId] = useState(Number);
  const [shopifylocation, setShopifyLocation] = useState([]);
  const [priority, setPriority] = useState("");

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
  useEffect(() => {
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/warehouses/links/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        if (!unmounted) {
          const warehouse = res.data;
          setWarehouseLinks(warehouse);
          setChannel(warehouse.channel);
          setChannelName(warehouse.channel);
          setSumtrackerWarehouse(warehouse.location_name);
          setShopifyLocationId(warehouse.channel_id);
          setPriority(warehouse.priority);
          console.log(warehouse);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);

  const onFinish = (values) => {
    //      const warehouseDetails = {
    //        name: warehousename,
    //        code: warehousecode,
    //      };
    //      console.log(warehouseDetails);
    //      axios
    //        .put(
    //          `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/`,
    //          warehouseDetails,
    //          { headers }
    //        )
    //        .then((res) => {
    //          console.log(res);
    //        })
    //        .catch((err) => {
    //          // what now?
    //          console.log("ensure this field has no more than 20 characters");
    //        });
    //    };
    //    const onEdit = (value) => {
    //      const action = value;
    //      axios
    //        .put(
    //          `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/${action}/`,
    //          { name: "hh" },
    //          { headers }
    //        )
    //        .then((res) => {
    //          console.log(res);
    //          if (value === "archive") {
    //            console.log("1");
    //            setOnEdit(false);
    //          } else if (value === "undo-archive") {
    //            if (onedit) {
    //              setOnEdit(false);
    //            } else {
    //              setOnEdit(true);
    //            }
    //            console.log("2");
    //          }
    //        })
    //        .catch((err) => {
    //          // what now?
    //          console.log(err);
    //        });
  };

  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function onFocus(id) {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/ecom/settings/channels/shopify/locations/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        const shopifyLocation = res.data;
        setShopifyLocation(shopifyLocation);
        console.log(shopifyLocation);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  }

  return (
    <div>
      <div style={{ marginBottom: "60px" }}>
        <ContentBar title="Warehouse" />
      </div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item label={customLabel("Channel")}>
          <MetaFind id={channel} incoming="WarehouseDetailsChannel" />
        </Form.Item>
        <Form.Item label={customLabel("Channel Name")}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            value={<MetaFind id={channel} incoming="WarehouseDetailsChannel" />}
            disabled
          >
            <Option key={1}>
              <MetaFind id={channel} incoming="WarehouseDetailsChannel" />
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label={customLabel("Sumtracker Warehouse")}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            onChange={handleChange}
            defaultValue={1}
          >
            <Option value={1} key={1}>
              {sumtrackerwarehouse}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label={customLabel("Shopify Location")}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            defaultValue={1}
            onFocus={() => onFocus(shopifylocationid)}
          >
            <Option value={1} key={1}>
              {sumtrackerwarehouse}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label={customLabel("Priority")}>
          <Input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>

          <Button icon={<RiDeleteBinLine />} htmlType="button">
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default WarehouseLinksDetails;
