import React, { useState } from "react";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import { Modal, Button, Form, Input, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
};
const EditProductGroupModal = (props) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(props.name);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
  const submit = () => {
    const groupObject = {
      name: name,
    };

    axios
      .put(appUrls.PRODUCT_GROUP1 + props.id + "/", groupObject)
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
    <>
      <Button icon={<EditOutlined />} onClick={showModal} size="small">
        Edit
      </Button>
      <Modal
        title="Product Group"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isModalVisible}
        footer={[
          <div key="1" style={{ textAlign: "center" }}>
            <Button
              htmlType="submit"
              key="save"
              type="primary"
              onClick={submit}
            >
              Save
            </Button>
            ,
          </div>,
        ]}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item label={<label>Group Name</label>}>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductGroupModal;
