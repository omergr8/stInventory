import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
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

  const handleOk = () => {
    setIsModalVisible(false);
    props.closeModal();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    props.closeModal();
  };
  const submit = () => {
    const headers = getToken();
    const groupObject = {
      name: name,
    };
    axios
      .post(
        `https://inventory-dev-295903.appspot.com/products/groups/1/`,
        groupObject,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        setIsModalVisible(false);
        props.fetchData();
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
