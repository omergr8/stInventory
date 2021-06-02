import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getToken,
  getWarehouse,
} from "../../../../../../../../../../../Services/ListServices";
import { Form, Input, Select, Button, notification } from "antd";
import formReducer from "../../../../../../../../../../../Reducers/FormReducer";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const initialFormState = {
  document: "",
  defaultwarehouse: "",
  docprefix: "",
  docnumber: "",
};
const DocumentDetails = (props) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { id } = useParams();
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

  const callDispatcher = (data, name) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: name,
      payload: data,
    });
  };

  const fields = [
    {
      name: ["document"],
      value: formState.document,
    },
    {
      name: ["defaultwarehouse"],
      value: getWarehouse(formState.defaultwarehouse),
    },
    {
      name: ["docprefix"],
      value: formState.docprefix,
    },
    {
      name: ["docnumber"],
      value: formState.docnumber,
    },
  ];
  const handleTextChange = (e) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const handleSelectChange = (value, name) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: name,
      payload: value,
    });
  };
  useEffect(() => {
    if (Object.keys(props.documentData).length > 0) {
      callDispatcher(props.documentData.prefix, "document");
      callDispatcher(props.documentData.warehouse_id, "defaultwarehouse");
      callDispatcher(props.documentData.prefix, "docprefix");
      callDispatcher(props.documentData.number, "docnumber");
    }
  }, [props.documentData]);
  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  const save = () => {
    const docObj = {
      number: formState.docnumber,
      prefix: formState.docprefix,
      warehouse_id: formState.defaultwarehouse,
    };
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/documents/types/${id}/`,
        docObj,
        { headers }
      )
      .then((res) => {
        if (res) {
          Alert("bottomRight", "success", "Settings Updated");
          props.fetchDocument();
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  return (
    <div>
      <Form {...layout} onFinish={save} name="nest-messages" fields={fields}>
        <Form.Item name="document" label={customLabel("Document")}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="defaultwarehouse"
          label={customLabel("Default Warehouse")}
        >
          <Select
            style={{ width: 250 }}
            onChange={(value) => handleSelectChange(value, "defaultwarehouse")}
          >
            <Option value={formState.defaultwarehouse}>
              {getWarehouse(formState.defaultwarehouse)}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="docprefix" label={customLabel("Doc No. Prefix")}>
          <Input name="docprefix" onChange={(e) => handleTextChange(e)} />
        </Form.Item>
        <Form.Item name="docnumber" label={customLabel("Doc Number")}>
          <Input name="docnumber" onChange={(e) => handleTextChange(e)} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default DocumentDetails;
