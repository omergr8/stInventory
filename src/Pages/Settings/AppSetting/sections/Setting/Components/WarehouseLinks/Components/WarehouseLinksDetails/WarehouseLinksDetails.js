import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import { getAllWarehouses } from "../../../../../../../../../Services/ListServices";
import MetaFind from "../../../../../MetaFind/MetaFind";
import ContentBar from "../../../../../ContentBar/ContentBar";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Row,
  Col,
  Space,
} from "antd";
import { RiDeleteBinLine } from "react-icons/ri";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 11,
  },
};

export const WarehouseLinksDetails = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [warehouselinks, setWarehouseLinks] = useState([]);
  const [channel, setChannel] = useState(Number);
  const [sumtrackerwarehouse, setSumtrackerWarehouse] = useState([]);
  const [shopifylocationid, setShopifyLocationId] = useState(Number);
  const [shopifylocation, setShopifyLocation] = useState([]);
  const [locationid, setLocationId] = useState([]);
  const [priority, setPriority] = useState("");

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
  useEffect(() => {
    let unmounted = false;
    axios
      .get(appUrls.WAREHOUSE_LINKS + id + "/")
      .then((res) => {
        if (!unmounted) {
          const warehouse = res.data;
          setWarehouseLinks(warehouse);
          setChannel(warehouse.channel);
          setSumtrackerWarehouse(warehouse.warehouse_id);
          setShopifyLocationId(warehouse.channel_id);
          setLocationId(warehouse.location_name);
          setPriority(warehouse.priority);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);
  const onDelete = () => {
    axios
      .delete(appUrls.WAREHOUSE_LINKS + id + "/")
      .then((res) => {
        Alert("bottomRight", "success", "Warehouse Deleted Successfully");
        window.history.back();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };

  const onFinish = () => {
    const linkObj = {
      warehouse: sumtrackerwarehouse,
      warehouse_id: sumtrackerwarehouse,
      channel: shopifylocationid,
      channel_id: shopifylocationid,
      priority: priority,
    };

    axios
      .put(appUrls.WAREHOUSE_LINKS + id + "/", linkObj)
      .then((res) => {
        Alert("bottomRight", "success", "Warehouse Updated Successfully");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };

  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  function handleChange(value, name) {
    if (name === "warehouse") {
      setSumtrackerWarehouse(value);
    } else if (name === "location") {
      setLocationId(value);
    }
  }
  function onFocus(id) {
    axios
      .get(appUrls.SHOPIFY_LOCATIONS + id + "/")
      .then((res) => {
        setShopifyLocation(res.data);
        setLocationId(warehouselinks.location_id);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  }

  return (
    <div>
      <div>
        <ContentBar title="Warehouse" />
      </div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Form
            style={{ marginTop: "40px" }}
            {...layout}
            form={form}
            name="control-hooks"
          >
            <Form.Item label={customLabel("Channel")}>
              <MetaFind id={channel} incoming="WarehouseDetailsChannel" />
            </Form.Item>
            <Form.Item label={customLabel("Channel Name")}>
              <Select
                allowClear
                placeholder="Please select"
                value={
                  <MetaFind id={channel} incoming="WarehouseDetailsChannel" />
                }
                disabled
              >
                <Option key={1}>
                  <MetaFind id={channel} incoming="WarehouseDetailsChannel" />
                </Option>
              </Select>
            </Form.Item>
            <Form.Item label={customLabel("Sumtracker Warehouse")}>
              <Select
                placeholder="Please select"
                name="Sumtracker Warehouse"
                onChange={(value) => handleChange(value, "warehouse")}
                value={sumtrackerwarehouse}
              >
                {getAllWarehouses().map((warehouse, index) => (
                  <Option value={warehouse.id} key={index}>
                    {warehouse.code}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={customLabel("Shopify Location")}>
              <Select
                placeholder="Please select"
                onChange={(value) => handleChange(value, "location")}
                onFocus={() => onFocus(shopifylocationid)}
                value={locationid}
              >
                {shopifylocation.map((location, index) => (
                  <Option value={location.id} key={index}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={customLabel("Priority")}>
              <Input
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4} offset={4}>
          <Space style={{ marginTop: "15px" }}>
            <Button type="primary" onClick={onFinish}>
              Save
            </Button>

            <Button onClick={onDelete} icon={<RiDeleteBinLine />}>
              Delete
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
export default WarehouseLinksDetails;
