import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, notification, Row, Col } from "antd";
import CountrySelector from "../../../DefaultSettings/Components/CountrySelector/CountrySelector";
import { AiFillEdit } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 17,
  },
};
const customLabel = (value) => {
  return <label style={{ fontWeight: "600" }}>{value}</label>;
};

const AddressModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warehouseaddress, setWarehouseAddress] = useState(props.address);
  const headers = getToken();
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
    setWarehouseAddress(props.address);
  }, [props]);
  const onFinish = () => {
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/contacts/addresses/${warehouseaddress.id}/`,
        warehouseaddress,
        { headers }
      )
      .then((res) => {
        setIsModalVisible(false);
        props.updateAddress(warehouseaddress);
        Alert("bottomRight", "success", "Address Saved");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          Alert("bottomRight", "error", err.response);
        }
      });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onFinish();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCountryValue = (e) => {
    let copyObj = { ...warehouseaddress };
    copyObj.country = e;
    setWarehouseAddress(copyObj);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    let copyObj = { ...warehouseaddress };
    if (name === "label") {
      copyObj.label = value;
      setWarehouseAddress(copyObj);
    } else if (name === "firstname") {
      copyObj.first_name = value;
      setWarehouseAddress(copyObj);
    } else if (name === "lastname") {
      copyObj.last_name = value;
      setWarehouseAddress(copyObj);
    } else if (name === "companyname") {
      copyObj.company_name = value;
      setWarehouseAddress(copyObj);
    } else if (name === "phone") {
      copyObj.phone = value;
      setWarehouseAddress(copyObj);
    } else if (name === "email") {
      copyObj.email = value;
      setWarehouseAddress(copyObj);
    } else if (name === "taxid") {
      copyObj.tax_num = value;
      setWarehouseAddress(copyObj);
    } else if (name === "addressline1") {
      copyObj.address_line_1 = value;
      setWarehouseAddress(copyObj);
    } else if (name === "addressline2") {
      copyObj.address_line_2 = value;
      setWarehouseAddress(copyObj);
    } else if (name === "city") {
      copyObj.city = value;
      setWarehouseAddress(copyObj);
    } else if (name === "state") {
      copyObj.state = value;
      setWarehouseAddress(copyObj);
    } else if (name === "postalcode") {
      copyObj.pincode = value;
      setWarehouseAddress(copyObj);
    }
  };
  return (
    <>
      <Button
        type="primary"
        icon={<AiFillEdit />}
        onClick={showModal}
        size="small"
      />
      <Modal
        title="Address"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={20} xl={20}>
            <Form {...layout} name="nest-messages">
              <Form.Item required label={customLabel("Label")}>
                <Input
                  name="label"
                  onChange={handleChange}
                  value={warehouseaddress.label}
                />
              </Form.Item>
              <Form.Item label={customLabel("First Name")}>
                <Input
                  name="firstname"
                  onChange={handleChange}
                  value={warehouseaddress.first_name}
                />
              </Form.Item>
              <Form.Item label={customLabel("Last Name")}>
                <Input
                  name="lastname"
                  onChange={handleChange}
                  value={warehouseaddress.last_name}
                />
              </Form.Item>
              <Form.Item label={customLabel("Company Name")}>
                <Input
                  name="companyname"
                  onChange={handleChange}
                  value={warehouseaddress.company_name}
                />
              </Form.Item>
              <Form.Item label={customLabel("Phone")}>
                <Input
                  name="phone"
                  onChange={handleChange}
                  value={warehouseaddress.phone}
                />
              </Form.Item>
              <Form.Item label={customLabel("Email")}>
                <Input
                  name="email"
                  onChange={handleChange}
                  value={warehouseaddress.email}
                />
              </Form.Item>
              <Form.Item label={customLabel("Tax Id")}>
                <Input
                  name="taxid"
                  onChange={handleChange}
                  value={warehouseaddress.tax_num}
                />
              </Form.Item>
              <Form.Item label={customLabel("Address Line 1")}>
                <Input
                  name="addressline1"
                  onChange={handleChange}
                  value={warehouseaddress.address_line_1}
                />
              </Form.Item>
              <Form.Item label={customLabel("Address Line 2")}>
                <Input
                  name="addressline2"
                  onChange={handleChange}
                  value={warehouseaddress.address_line_2}
                />
              </Form.Item>
              <Form.Item label={customLabel("City")}>
                <Input
                  name="city"
                  onChange={handleChange}
                  value={warehouseaddress.city}
                />
              </Form.Item>
              <Form.Item label={customLabel("State")}>
                <Input
                  name="state"
                  onChange={handleChange}
                  value={warehouseaddress.state}
                />
              </Form.Item>
              <Form.Item label={customLabel("Postal Code")}>
                <Input
                  name="postalcode"
                  onChange={handleChange}
                  value={warehouseaddress.pincode}
                />
              </Form.Item>
              <Form.Item name="country" label={customLabel("Country")}>
                <CountrySelector
                  handleChange={handleCountryValue}
                  countryCode={warehouseaddress.country}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4}>
            <Button type="primary" size="small" onClick={onFinish}>
              Save Address
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddressModal;
