import React, { useState } from "react";
import axios from "axios";
import PermissionTable from "./sections/Table/Table";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";

const User = () => {
  let userr = JSON.parse(localStorage.getItem("user-info"));
  const [user, setUser] = useState(userr);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  let userToken = "token";
  userToken += " ";
  userToken += token;

  let oldResponse = JSON.parse(localStorage.getItem("user-info"));
  console.log(oldResponse);
  const save = () => {
    const headers = {
      Authorization: userToken,
    };
    console.log(headers);
    axios
      .put(
        "https://inventory-dev-295903.appspot.com/users/18/",
        {
          first_name: firstName,
          last_name: lastName,
        },
        { headers }
      )
      .then((response) => {
        oldResponse.user = response.data;
        localStorage.setItem("user-info", JSON.stringify(oldResponse));

        //  localStorage.setItem("user-info.user", JSON.stringify(response.data));
      });
  };
  return (
    <div>
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
            defaultValue={user.user.first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            defaultValue={user.user.last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input disabled={true} defaultValue={user.user.email} />
        </Form.Item>
        <Form.Item name="radio-button" label="Active">
          <Radio.Group
            disabled={!user.user.is_admin}
            defaultValue={user.user.is_active.toString()}
          >
            <Radio.Button value="true">Yes</Radio.Button>
            <Radio.Button value="false">No</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Change Password">
          <a href="">Click Here</a>
        </Form.Item>
        <Form.Item label="Permissions">
          <PermissionTable
            permission={user.user.user_permission}
            isAdmin={user.user.is_admin}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            size="large"
            type="submit"
            htmlType="submit"
            onClick={save}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default User;
