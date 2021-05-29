import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../../../../../../../../Services/ListServices";
import { Table, Input, Button, Space, Form, Modal } from "antd";
import { ImCancelCircle } from "react-icons/im";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};

const EditTaxModal = (props) => {
  const [form] = Form.useForm();
  const headers = getToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taxname, setTaxName] = useState(props.name);
  let data = Object.entries(props.taxData).map(([key, value]) => ({
    key: key,
    no: 1,
    name: key,
    percentage: value,
  }));
  const handleChangeTax = (value) => {
    let copyArray = [...tabledata];
    console.log(copyArray);
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
      console.log("delete");
    }
  };
  const [tabledata, setTableData] = useState(data);
  const addComponent = () => {
    const obj = {
      key: tabledata[tabledata.length - 1].key + 1,
      no: tabledata[tabledata.length - 1].no + 1,
      name: "",
      percentage: "",
    };
    console.log(obj);
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
        <Input onChange={handleChangeTax} name={row.key} value={text} />
      ),
    },
    {
      title: "Percentage (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, row) => (
        <Input
          onChange={handleChangeTaxPercentage}
          name={row.key}
          value={text * 100}
        />
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

  const showModal = () => {
    setIsModalVisible(true);
  };
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
    console.log(tabledata);
    const taxDataObject = getTaxDataObject();
    const taxModalObject = {
      name: taxname,
      tax_type: "2",
      tax_rate: getTaxPercentage(),
      tax_data: taxDataObject,
    };
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/taxes/${props.id}/`,
        taxModalObject,
        { headers }
      )
      .then((response) => {
        setIsModalVisible(false);
        props.fetchData();
      });
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
      <Button type="primary" onClick={showModal} size="small">
        Edit
      </Button>
      <Modal
        title="Tax"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item label={customLabel("Tax Display Name")}>
            <Input
              value={taxname}
              onChange={(e) => setTaxName(e.target.value)}
            />
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
export default EditTaxModal;
