import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, notification } from "antd";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 7,
    span: 16,
  },
};
const label = (text) => {
  return <label style={{ fontWeight: "600" }}>{text}</label>;
};

const AddWarehouseModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(props.modal);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    setIsModalVisible(props.modal);
  }, [props]);

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

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    props.setModalFalse();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    props.setModalFalse();
  };
  const onFinish = () => {
    const warehouseObj = {
      name: name,
      code: code,
    };
    axios
      .post(appUrls.WAREHOUSES, warehouseObj)
      .then((res) => {
        Alert("bottomRight", "success", "Warehouse Added Successfully.");
        setIsModalVisible(false);
        props.setModalFalse();
        form.resetFields();
        props.fetchWarehouses();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="name" label={label("Warehouse Name")}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item name="code" label={label("Warehouse Code")}>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddWarehouseModal;
