import React, { useState } from "react";
import { Form, Row, Col, Input, Select } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const Filter = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={5} key={1}>
          <Form.Item
            name="Product"
            label="Product"
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="Search product/sku" />
          </Form.Item>
        </Col>
        <Col span={5} key={2}>
          <Form.Item
            name="Channel "
            label="Channel"
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={5} key={3}>
          <Form.Item
            name="Tracking Type"
            label="Tracking Type"
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={5} key={4}>
          <Form.Item
            name="Inventory Sync"
            label="Inventory Sync"
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Select defaultValue="all" onChange={handleChange}>
              <Option value="all">All</Option>
              <Option value="sync on">Sync On</Option>

              <Option value="sync off">Sync Off</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default Filter;
