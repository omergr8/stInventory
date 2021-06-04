import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Input, Button, Form, Modal, notification } from "antd";
import { ImCancelCircle } from "react-icons/im";
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddTaxModal = (props) => {
  const [form] = Form.useForm();
  const [tabledata, setTableData] = useState([]);
  const headers = getToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taxname, setTaxName] = useState("");

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: `Tax Saved. `,
        placement,
      });
    } else if (type === "error")
      notification.error({
        message: `Error Code: ${error.status} `,
        description: [JSON.stringify(error.data.errors)],
        placement,
      });
  };
  //To handle Change tax input
  const handleChangeTax = (value) => {
    let copyArray = [...tabledata];

    let index = copyArray.findIndex((x) => x.key === value.target.name);
    let newObj = {
      key: copyArray[index].key,
      no: copyArray[index].no,
      name: value.target.value,
      percentage: copyArray[index].percentage,
    };

    if (index !== -1) {
      copyArray[index] = newObj;
    }
    setTableData(copyArray);
  };
  //To handle change percentage input.
  const handleChangeTaxPercentage = (value) => {
    let copyArray = [...tabledata];
    let index = copyArray.findIndex((x) => x.key === value.target.name);
    let newObj = {
      key: copyArray[index].key,
      no: copyArray[index].no,
      name: copyArray[index].name,
      percentage: JSON.stringify(value.target.value / 100),
    };

    if (index !== -1) {
      copyArray[index] = newObj;
    }

    if (value.target.value <= 100) {
      setTableData(copyArray);
    } else {
    }
  };

  //To add Component in table
  const addComponent = () => {
    const obj = {
      key:
        tabledata[tabledata.length - 1] === undefined
          ? "1"
          : tabledata[tabledata.length - 1].key + 1,
      no:
        tabledata[tabledata.length - 1] === undefined
          ? 1
          : tabledata[tabledata.length - 1].no + 1,
      name: "",
      percentage: "",
    };
    setTableData([...tabledata, obj]);
  };
  const remove = (id) => {
    var filtered = tabledata.filter(function (el) {
      return el.key !== id;
    });
    setTableData(filtered);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, row, index) => (
        <Input onChange={handleChangeTax} name={row.key} />
      ),
    },
    {
      title: "Percentage (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, row) => (
        <Input onChange={handleChangeTaxPercentage} name={row.key} />
      ),
    },
    {
      title: "",
      dataIndex: "close",
      key: "close",
      render: (text, row) => (
        <Button
          onClick={() => remove(row.key)}
          type="danger"
          icon={<ImCancelCircle />}
          size="small"
        />
      ),
    },
  ];
  const getTaxDataObject = () => {
    let data = {};
    const copyTableData = [...tabledata];
    for (let i = 0; i < copyTableData.length; i++) {
      let dataKey = copyTableData[i].name;
      let dataPercentage = copyTableData[i].percentage;
      data[dataKey] = dataPercentage;
    }
    return data;
  };
  const getTaxPercentage = () => {
    const taxData = getTaxDataObject();
    return Object.keys(taxData)
      .reduce((sum, key) => sum + parseFloat(taxData[key] || 0), 0)
      .toFixed(2);
  };
  const handleOk = () => {
    const taxDataObject = getTaxDataObject();
    const taxModalObject = {
      name: taxname,
      tax_type: "2",
      tax_rate: getTaxPercentage(),
      tax_data: taxDataObject,
    };
    axios
      .post(
        `https://inventory-dev-295903.appspot.com/settings/taxes/`,
        taxModalObject,
        { headers }
      )
      .then((response) => {
        Alert("bottomRight", "success");
        setIsModalVisible(false);
        props.fetchData();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  const Footer = (
    <Button onClick={addComponent} size="small">
      Add Component
    </Button>
  );
  return (
    <>
      <Button type="primary" onClick={showModal} block>
        Add New Tax
      </Button>
      <Modal
        title="Tax"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={600}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item label={customLabel("Tax Display Name")}>
            <Input onChange={(e) => setTaxName(e.target.value)} />
          </Form.Item>
          <Form.Item label={customLabel("Tax Components")}>
            <Table
              bordered
              pagination={false}
              columns={columns}
              dataSource={tabledata}
              footer={() => Footer}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTaxModal;
