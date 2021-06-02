import { Form, Input, Select, Checkbox, Button, notification } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "./Components/CountrySelector/CountrySelector";
import TimeZoneSelector from "./Components/TimeZoneSelector/TimeZoneSelector";
import { getToken } from "../../../../../../../Services/ListServices";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const DefaultSettings = () => {
  const headers = getToken();
  const [defaultSettings, setDefaultSettings] = useState({});
  const [country, setCountry] = useState("");
  const [timezone, setTimeZone] = useState("");
  const [paymentmethod, setPaymentMethod] = useState([]);
  const [clientsetting, setClientSetting] = useState([]);
  const [hidesetupinstruction, setHideSetupInstruction] = useState(false);
  const [disableautoarchieve, setDisableAutoArchieve] = useState(false);

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Settings Saved. `,
        placement,
      });
    } else if (type === "error")
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data)],
        placement,
      });
  };
  const onFinish = (values) => {
    const oldArray = [...clientsetting];
    if (hidesetupinstruction && oldArray.includes(1) === false) {
      oldArray.push(1);
    } else if (!hidesetupinstruction) {
      const index = oldArray.indexOf(1);
      if (index > -1) {
        oldArray.splice(index, 1);
      }
    }
    if (disableautoarchieve && oldArray.includes(2) === false) {
      oldArray.push(2);
    } else if (!disableautoarchieve) {
      const index = oldArray.indexOf(2);
      if (index > -1) {
        oldArray.splice(index, 1);
      }
    }
    let paymentCopy = [...paymentmethod];
    let splitPayment;
    if (paymentCopy.length === 1) {
      splitPayment = paymentCopy[0].split(",");
    } else {
      splitPayment = paymentCopy;
    }

    const settingObject = {
      timezone: timezone,
      country_code: country,
      payment_methods: splitPayment,
      client_settings: oldArray,
    };

    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/defaults/`,
        settingObject,
        {
          headers,
        }
      )
      .then((res) => {
        Alert("bottomRight", "success");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleCountryValue = (e) => {
    setCountry(e);
  };
  const handleTimeZoneValue = (e) => {
    setTimeZone(e);
  };

  useEffect(() => {
    let unmounted = false;
    axios
      .get(`https://inventory-dev-295903.appspot.com/settings/defaults/`, {
        headers,
      })
      .then((res) => {
        if (!unmounted) {
          const setting = res.data;
          setCountry(setting.country_code);
          setTimeZone(setting.timezone);
          setClientSetting(setting.client_settings);
          setPaymentMethod(setting.payment_methods);
          setDefaultSettings(setting);
          getClientSettingStatus(setting);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);

  const getClientSettingStatus = (setting) => {
    const client_settings = JSON.parse(localStorage.getItem("meta-data"));
    for (let i = 0; i < client_settings.client_settings.length; i++) {
      const metaClientId = client_settings.client_settings[i].id;
      let find = true;
      for (let j = 0; j < setting.client_settings.length; j++) {
        if (metaClientId === setting.client_settings[j]) {
          find = false;

          if (
            client_settings.client_settings[i].description ===
            "Hide setup instructions"
          ) {
            setHideSetupInstruction(true);
          } else if (
            client_settings.client_settings[i].description ===
            "Disable Auto Archive"
          ) {
            setDisableAutoArchieve(true);
          }
        } else if (find) {
          if (
            client_settings.client_settings[i].description ===
            "Hide setup instructions"
          ) {
            setHideSetupInstruction(false);
          } else if (
            client_settings.client_settings[i].description ===
            "Disable Auto Archive"
          ) {
            setDisableAutoArchieve(false);
          }
        }
      }
    }
  };
  const onChangeHideSetup = (e) => {
    setHideSetupInstruction(e.target.checked);
  };
  const onChangeAutoArchieve = (e) => {
    setDisableAutoArchieve(e.target.checked);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      {/* <button onClick={covertPaymentToString}>test</button> */}

      <Form.Item
        name={["user", "country"]}
        label="Country"
        label={<label style={{ fontWeight: "600" }}>Country</label>}
      >
        <CountrySelector
          handleChange={handleCountryValue}
          countryCode={country}
        />
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
        <TimeZoneSelector
          handleChange={handleTimeZoneValue}
          timeZone={timezone}
        />
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
        label={<label style={{ fontWeight: "600" }}>Payment Methods</label>}
      >
        <Input.TextArea
          value={paymentmethod}
          onChange={(e) => setPaymentMethod([e.target.value])}
        />
      </Form.Item>
      <Form.Item
        name={["user", "instruction"]}
        label={
          <label style={{ fontWeight: "600" }}>Hide setup instructions</label>
        }
      >
        <Checkbox onChange={onChangeHideSetup} checked={hidesetupinstruction} />
      </Form.Item>
      <Form.Item
        name={["user", "autoarchieve"]}
        label={
          <label style={{ fontWeight: "600" }}>Disable Auto Archive</label>
        }
      >
        <Checkbox
          onChange={onChangeAutoArchieve}
          checked={disableautoarchieve}
        />
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
