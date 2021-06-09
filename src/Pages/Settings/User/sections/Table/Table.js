import React, { useState, useEffect } from "react";
import { Table, Divider, Checkbox, notification } from "antd";
import axios from "../../../../../axiosSet";
import { appUrls } from "../../../../../Constants/appUrls";
import { checkUserPermission } from "../../../../../Services/ListServices";
import { useParams } from "react-router";

const settingsData = [
  { key: "1", number: 1, function: "Get low stock alerts" },
];
const PermissionTable = (props) => {
  const [permission, setPermission] = useState([]);
  const [settings, setSettings] = useState([]);
  const { id } = useParams();

  const permissionData = [
    {
      key: "1",
      number: 1,
      per: permission !== undefined ? permission[0] : 1,
      function: "Can change stock levels",
    },
    {
      key: "2",
      number: 2,
      per: permission !== undefined ? permission[1] : 1,
      function: "Can change settings",
    },
  ];
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
    setPermission(props.permission.user_permissions);
    setSettings(props.permission.user_settings);
  }, [props]);
  const save = (type) => {
    let copyObj = { ...props.permission };
    if (type === "value") {
      copyObj.user_settings = [1];
    } else if (type === "empty") {
      copyObj.user_settings = [];
    }

    axios
      .put(appUrls.USERS + id + "/", copyObj)
      .then((response) => {
        Alert("bottomRight", "success", "Saved.");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const handleChange = (value) => {
    if (!value.target.checked) {
      setSettings([]);
      save("empty");
    } else if (value.target.checked) {
      setSettings([1]);
      save("value");
    }
  };
  const permissionColumns = [
    {
      title: "#",
      dataIndex: "number",
      disabled: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Function",
      dataIndex: "function",
    },
    {
      title: "",
      dataIndex: "check",
      render: (text, row) => (
        <Checkbox checked={checkUserPermission(row.per, id)} disabled={true} />
      ),
    },
  ];
  const settingsColumns = [
    {
      title: "#",
      dataIndex: "number",
      disabled: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Function",
      dataIndex: "function",
    },
    {
      title: "",
      dataIndex: "check",
      render: (text, row) => (
        <Checkbox
          onChange={handleChange}
          checked={
            settings !== undefined
              ? settings.length !== 0
                ? true
                : false
              : null
          }
        />
      ),
    },
  ];

  return (
    <div>
      <Table
        bordered
        pagination={false}
        columns={permissionColumns}
        dataSource={permissionData}
      />
      <Divider />
      <h3 style={{ textDecoration: "underline" }}>Settings</h3>
      <Table
        bordered
        pagination={false}
        columns={settingsColumns}
        dataSource={settingsData}
      />
    </div>
  );
};

export default PermissionTable;
