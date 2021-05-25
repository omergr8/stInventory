import { Form, Input, Select, Checkbox, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "./Components/CountrySelector/CountrySelector";
import TimeZoneSelector from "./Components/TimeZoneSelector/TimeZoneSelector";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
function handleChange(value) {
  console.log(`selected ${value}`);
}
/* eslint-enable no-template-curly-in-string */

const DefaultSettings = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [defaultSettings, setDefaultSettings] = useState({});
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };
  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    axios
      .get(`https://inventory-dev-295903.appspot.com/settings/defaults/`, {
        headers,
      })
      .then((res) => {
        const setting = res.data;
        setDefaultSettings(res.data);
      });
  }, []);
  console.log(defaultSettings);
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "country"]}
        label="Country"
        label={<label style={{ fontWeight: "600" }}>Country</label>}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <CountrySelector countryCode={defaultSettings.country_code} />
      </Form.Item>
      <Form.Item
        name={["user", "timeZone"]}
        label={<label style={{ fontWeight: "600" }}>Time Zone</label>}
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <TimeZoneSelector timeZone={defaultSettings.timezone} />
      </Form.Item>
      <Form.Item
        name={["user", "currency"]}
        label={<label style={{ fontWeight: "600" }}>Default Currency</label>}
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <label>{defaultSettings.currency}</label>
      </Form.Item>
      <Form.Item
        name={["user", "payment"]}
        label={<label style={{ fontWeight: "600" }}>Payment Methods</label>}
      >
        <Input.TextArea value={defaultSettings.payment_methods} />
      </Form.Item>
      <Form.Item
        name={["user", "instruction"]}
        label={
          <label style={{ fontWeight: "600" }}>Hide setup instructions</label>
        }
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name={["user", "autoarchieve"]}
        label={
          <label style={{ fontWeight: "600" }}>Disable Auto Archive</label>
        }
      >
        <Checkbox />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button block type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DefaultSettings;
