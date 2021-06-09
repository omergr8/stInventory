import React, { useState, useEffect } from "react";
import axios from "../../../axiosSet";
import { appUrls } from "../../../Constants/appUrls";
import PermissionTable from "./sections/Table/Table";
import ContentBar from "../AppSetting/sections/ContentBar/ContentBar";
import { Form, Input, Button, Radio, notification, Row, Col } from "antd";
import { useParams } from "react-router";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
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
  let oldResponse = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    axios.get(appUrls.USERS + id + "/").then((res) => {
      setUser(res.data);
    });
  }, []);
  const save = () => {
    axios
      .put(appUrls.USERS + id + "/", user)
      .then((response) => {
        oldResponse.user = response.data;
        Alert("bottomRight", "success", "Saved.");
        localStorage.setItem("user-info", JSON.stringify(oldResponse));
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let copyObj = { ...user };
    if (name === "firstname") {
      copyObj.first_name = value;
    } else if (name === "lastname") {
      copyObj.last_name = value;
    } else if (name === "active") {
      copyObj.is_active = value;
    }
    setUser(copyObj);
  };

  return (
    <div>
      <ContentBar
        title={
          user.first_name !== undefined
            ? `User ${user.first_name} ${user.last_name}`
            : "User"
        }
        incoming="user"
        user={user}
      />
      <Row gutter={18}>
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Form.Item label="First Name">
              <Input
                value={user.first_name}
                name="firstname"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                value={user.last_name}
                name="lastname"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled={true} value={user.email} />
            </Form.Item>
            <Form.Item label="Active">
              <Radio.Group
                disabled={!user.is_admin}
                onChange={handleChange}
                value={user.is_active}
                name="active"
              >
                <Radio.Button value={true}>Yes</Radio.Button>
                <Radio.Button value={false}>No</Radio.Button>
              </Radio.Group>
              {/* <h2>hello{user.is_active}</h2> */}
            </Form.Item>
            <Form.Item label="Change Password">
              <a href="">Click Here</a>
            </Form.Item>
            <Form.Item label="Permissions">
              <PermissionTable permission={user} />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          {" "}
          <Button block size="large" type="primary" onClick={save}>
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default User;
