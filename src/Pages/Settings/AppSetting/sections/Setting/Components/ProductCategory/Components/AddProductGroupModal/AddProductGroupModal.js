import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, notification } from "antd";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};
const AddProductGroupModal = (props) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    setIsModalVisible(props.showModal);
  }, [props.showModal]);
  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Saved. `,
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
    props.closeModal();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    props.closeModal();
  };
  const submit = () => {
    const groupObject = {
      name: name,
    };
    axios
      .post(appUrls.PRODUCT_GROUP1, groupObject)
      .then((res) => {
        Alert("bottomRight", "success");
        setIsModalVisible(false);
        props.fetchData();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  return (
    <Modal
      title="Product Group"
      onOk={handleOk}
      onCancel={handleCancel}
      visible={isModalVisible}
      footer={[
        <div key="1" style={{ textAlign: "center" }}>
          <Button key="save" type="primary" onClick={submit}>
            Save
          </Button>
          ,
        </div>,
      ]}
    >
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item
          label={<label style={{ fontWeight: "600" }}>Group Name</label>}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductGroupModal;
