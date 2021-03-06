import { Form, Input, Checkbox, Button, notification, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import axios from "../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../Constants/appUrls";
import CountrySelector from "./Components/CountrySelector/CountrySelector";
import TimeZoneSelector from "./Components/TimeZoneSelector/TimeZoneSelector";
import ContentBar from "../../../ContentBar/ContentBar";

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 15,
  },
};
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

const DefaultSettings = () => {
  const [defaultSettings, setDefaultSettings] = useState({});
  const [country, setCountry] = useState("");
  const [timezone, setTimeZone] = useState("");
  const [paymentmethod, setPaymentMethod] = useState([]);
  const [clientsetting, setClientSetting] = useState([]);
  const [hidesetupinstruction, setHideSetupInstruction] = useState(false);
  const [disableautoarchive, setDisableAutoArchive] = useState(false);

  useEffect(() => {
    let unmounted = false;
    axios
      .get(appUrls.DEFAULT_SETTINGS)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = () => {
    const oldArray = [...clientsetting];
    if (hidesetupinstruction && oldArray.includes(1) === false) {
      oldArray.push(1);
    } else if (!hidesetupinstruction) {
      const index = oldArray.indexOf(1);
      if (index > -1) {
        oldArray.splice(index, 1);
      }
    }
    if (disableautoarchive && oldArray.includes(2) === false) {
      oldArray.push(2);
    } else if (!disableautoarchive) {
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
      .put(appUrls.DEFAULT_SETTINGS, settingObject)
      .then((res) => {
        const setting = res.data;
        setCountry(setting.country_code);
        setTimeZone(setting.timezone);
        setClientSetting(setting.client_settings);
        setPaymentMethod(setting.payment_methods);
        setDefaultSettings(setting);
        getClientSettingStatus(setting);
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
            setDisableAutoArchive(true);
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
            setDisableAutoArchive(false);
          }
        }
      }
    }
  };
  const onChangeHideSetup = (e) => {
    setHideSetupInstruction(e.target.checked);
  };
  const onChangeAutoArchive = (e) => {
    setDisableAutoArchive(e.target.checked);
  };

  return (
    <div>
      <ContentBar title="Default Settings" />
      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Form style={{ marginTop: "50px" }} {...layout} name="nest-messages">
            <Form.Item
              name={["user", "country"]}
              label={<label>Country</label>}
            >
              <CountrySelector
                handleChange={handleCountryValue}
                countryCode={country}
              />
            </Form.Item>
            <Form.Item
              name={["user", "timeZone"]}
              label={<label>Time Zone</label>}
              wrapperCol={{ span: 12 }}
            >
              <TimeZoneSelector
                handleChange={handleTimeZoneValue}
                timeZone={timezone}
              />
            </Form.Item>
            <Form.Item
              name={["user", "currency"]}
              label={<label>Default Currency</label>}
            >
              <label>{defaultSettings.currency}</label>
            </Form.Item>
            <Form.Item label={<label>Payment Methods</label>}>
              <Input.TextArea
                value={paymentmethod}
                onChange={(e) => setPaymentMethod([e.target.value])}
              />
            </Form.Item>
            <Form.Item
              name={["user", "instruction"]}
              label={<label>Hide setup instructions</label>}
              labelCol={{ span: 12 }}
            >
              <Checkbox
                onChange={onChangeHideSetup}
                checked={hidesetupinstruction}
              />
            </Form.Item>
            <Form.Item
              name={["user", "autoarchive"]}
              label={<label>Disable Auto Archive</label>}
              labelCol={{ span: 12 }}
            >
              <Checkbox
                onChange={onChangeAutoArchive}
                checked={disableautoarchive}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={3} offset={5}>
          <Button
            style={{ marginTop: "15px" }}
            type="primary"
            onClick={onFinish}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DefaultSettings;
