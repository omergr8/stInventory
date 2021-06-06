import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import ContentBar from "../../../../../ContentBar/ContentBar";
import AddressModal from "../AddressModal/AddressModal";
import { Form, Input, Button, notification, Row, Col } from "antd";
import { FcAddressBook } from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";

const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 11,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const WarehouseDetails = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const headers = getToken();
  const [warehousename, setWarehouseName] = useState("");
  const [warehousecode, setWarehouseCode] = useState("");
  const [warehouseaddress, setWarehouseAddress] = useState("");
  const [isarchive, setIsArchive] = useState(Boolean);

  const [onedit, setOnEdit] = useState(true);
  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Settings Saved. `,
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
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        if (!unmounted) {
          const warehouse = res.data;
          setWarehouseName(warehouse.name);
          setWarehouseCode(warehouse.code);
          setWarehouseAddress(warehouse.address);
          setIsArchive(warehouse.is_archived);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, [onedit]);

  const onFinish = (values) => {
    const warehouseDetails = {
      name: warehousename,
      code: warehousecode,
    };
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/`,
        warehouseDetails,
        { headers }
      )
      .then((res) => {
        Alert("bottomRight", "success");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const onEdit = (value) => {
    const action = value;

    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/${action}/`,
        { name: "hh" },

        { headers }
      )
      .then((res) => {
        Alert("bottomRight", "success");
        if (value === "archive") {
          setOnEdit(false);
        } else if (value === "undo-archive") {
          if (onedit) {
            setOnEdit(false);
          } else {
            setOnEdit(true);
          }
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const updateAddress = (value) => {
    setWarehouseAddress(value);
  };
  const getAddress = (address) => {
    const addresss = `${address.label}\n${address.contact_id}\n${address.name}
${address.company_name}\n${address.first_name}\n${address.last_name}
    \n${address.phone}\n${address.email}\n${address.tax_num}\n${address.address_line_1}
    \n${address.address_line_2}\n${address.city}\n${address.state}
    \n${address.pincode}\n${address.country}\n${address.contact}`;
    const nullRemovedAddress = addresss.replaceAll("null", "");
    const emptyRemoveAddress = nullRemovedAddress.replace(/(^[ \t]*\n)/gm, "");

    if (address) {
      return emptyRemoveAddress;
    } else {
      return undefined;
    }
  };
  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  const undoButton = () => {
    if (isarchive) {
      return (
        <Button
          onClick={() => onEdit("undo-archive")}
          icon={<RiDeleteBinLine />}
          htmlType="button"
        >
          Undo archive
        </Button>
      );
    } else {
      return null;
    }
  };
  return (
    <div>
      <div style={{ marginBottom: "60px" }}>
        <ContentBar title="Warehouse" />
      </div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item label={customLabel("Warehouse Name")}>
              <Input
                value={warehousename}
                onChange={(e) => setWarehouseName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={customLabel("Warehouse Code")}>
              <Input
                value={warehousecode}
                onChange={(e) => setWarehouseCode(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={customLabel("Address")}>
              <TextArea
                addonAfter={<FcAddressBook />}
                value={getAddress(warehouseaddress)}
                rows={
                  getAddress(warehouseaddress) !== undefined
                    ? (getAddress(warehouseaddress).match(/\n/g) || "").length +
                      1
                    : ""
                }
                disabled
              />
              <AddressModal
                updateAddress={(value) => updateAddress(value)}
                address={warehouseaddress}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              {undoButton()}
              <Button
                onClick={() => onEdit("archive")}
                icon={<RiDeleteBinLine />}
                htmlType="button"
              >
                Delete
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default WarehouseDetails;
