import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import ContentBar from "../../../../../ContentBar/ContentBar";
import { Form, Input, Button } from "antd";
import { FcAddressBook } from "react-icons/fc";
import { RiDeleteBinLine } from "react-icons/ri";

const layout = {
  labelCol: {
    span: 7,
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
  const [warehousedetail, setWarehouseDetail] = useState([]);
  const [warehousename, setWarehouseName] = useState("");
  const [warehousecode, setWarehouseCode] = useState("");
  const [warehouseaddress, setWarehouseAddress] = useState("");
  const [isarchive, setIsArchive] = useState(Boolean);
  const [onedit, setOnEdit] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/`,
        {
          headers,
        }
      )
      .then((res) => {
        const warehouse = res.data;
        setWarehouseName(warehouse.name);
        setWarehouseCode(warehouse.code);
        setWarehouseAddress(warehouse.address.address_line_1);
        setIsArchive(warehouse.is_archived);
        setWarehouseDetail(warehouse);
        console.log(warehouse);
      });
  }, [onedit]);

  const onFinish = (values) => {
    const warehouseDetails = {
      name: warehousename,
      code: warehousecode,
    };
    console.log(warehouseDetails);
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/warehouses/${id}/`,
        warehouseDetails,
        { headers }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // what now?
        console.log("ensure this field has no more than 20 characters");
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
        console.log(res);
        if (value === "archive") {
          console.log("1");
          setOnEdit(false);
        } else if (value === "undo-archive") {
          if (onedit) {
            setOnEdit(false);
          } else {
            setOnEdit(true);
          }

          console.log("2");
        }
      })
      .catch((err) => {
        // what now?
        console.log(err);
      });
  };

  //   const onReset = () => {
  //     form.resetFields();
  //   };

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
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
          <Input
            addonAfter={<FcAddressBook />}
            value={warehouseaddress}
            disabled
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
    </div>
  );
};
export default WarehouseDetails;
