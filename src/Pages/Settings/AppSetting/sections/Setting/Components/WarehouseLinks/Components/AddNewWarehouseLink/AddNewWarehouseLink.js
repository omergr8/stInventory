import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import {
  getAllWarehouses,
  getAllChannels,
} from "../../../../../../../../../Services/ListServices";
import ContentBar from "../../../../../ContentBar/ContentBar";
import { Form, Input, Button, Select, notification, Row, Col } from "antd";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 11,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 16,
  },
};

export const AddNewWarehouseLink = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [sumtrackerwarehouse, setSumtrackerWarehouse] = useState(Number);
  const [channel, setChannel] = useState("");
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

  const onFinish = (values) => {
    const linkObj = {
      warehouse: sumtrackerwarehouse,
      warehouse_id: sumtrackerwarehouse,
      channel: channel,
      channel_id: channel,
      priority: priority,
    };
    axios
      .post(appUrls.WAREHOUSE_LINKS, linkObj)
      .then((res) => {
        Alert("bottomRight", "success", "Warehouse Added Successfully");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  function handleChange(value, name) {
    if (name === "warehouse") {
      setSumtrackerWarehouse(value);
    } else if (name === "channel") {
      setChannel(value);
    }
  }
  const customLabel = (value) => {
    return <label>{value}</label>;
  };

  return (
    <div>
      <div style={{ marginBottom: "60px" }}>
        <ContentBar title="Warehouse" />
      </div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item label={customLabel("Channel")}></Form.Item>
            <Form.Item label={customLabel("Channel Name")}>
              <Select
                placeholder="Please select"
                name="Sumtracker Warehouse"
                onChange={(value) => handleChange(value, "channel")}
              >
                {getAllChannels().map((warehouse, index) => (
                  <Option value={warehouse.id} key={index}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={customLabel("Sumtracker Warehouse")}>
              <Select
                placeholder="Please select"
                name="Sumtracker Warehouse"
                onChange={(value) => handleChange(value, "warehouse")}
              >
                {getAllWarehouses().map((warehouse, index) => (
                  <Option value={warehouse.id} key={index}>
                    {warehouse.code}
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default AddNewWarehouseLink;
