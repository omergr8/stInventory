import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../../../Constants/appUrls";
import {
  getWarehouse,
  getAllWarehouses,
} from "../../../../../../../../../../../Services/ListServices";
import { Form, Input, Select, Button, notification, Row, Col } from "antd";
import formReducer from "../../../../../../../../../../../Reducers/FormReducer";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
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
      .put(appUrls.DOCUMENT_TYPES + id + "/", docObj)
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
      <Row>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <Form
            style={{ marginTop: "40px" }}
            {...layout}
            name="nest-messages"
            fields={fields}
          >
            <Form.Item name="document" label={customLabel("Document")}>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="defaultwarehouse"
              label={customLabel("Default Warehouse")}
            >
              <Select
                onChange={(value) =>
                  handleSelectChange(value, "defaultwarehouse")
                }
              >
                {getAllWarehouses().map((value, index) => (
                  <Option key={index} value={value.id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="docprefix" label={customLabel("Doc No. Prefix")}>
              <Input name="docprefix" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
            <Form.Item name="docnumber" label={customLabel("Doc Number")}>
              <Input name="docnumber" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4} offset={4}>
          <Button block onClick={save} type="primary">
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default DocumentDetails;
