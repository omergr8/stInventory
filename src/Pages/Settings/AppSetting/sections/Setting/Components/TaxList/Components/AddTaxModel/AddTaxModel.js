import React, { useEffect, useState } from "react";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import {
  Table,
  Input,
  InputNumber,
  Button,
  Form,
  Modal,
  notification,
} from "antd";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";
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
  useEffect(() => {
    // console.log("mounted", taxname);
    setTableData([]);
    setTaxName("");
  }, [isModalVisible]);
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
  const handleChangeTaxPercentage = (value, name) => {
    let copyArray = [...tabledata];

    let index = copyArray.findIndex((x) => x.key === name);
    let newObj = {
      key: copyArray[index].key,
      no: copyArray[index].no,
      name: copyArray[index].name,
      percentage: parseFloat((value / 100).toFixed(7)),
    };
    // console.log(newObj, value / 100);
    if (index !== -1) {
      copyArray[index] = newObj;
    }

    if (value <= 100) {
      setTableData(copyArray);
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
      percentage: Number,
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
        <InputNumber
          min={0}
          max={100}
          onChange={(value) => handleChangeTaxPercentage(value, row.key)}
          name={row.key}
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
          style={{ backgroundColor: "#d9534f" }}
          icon={
            <IconContext.Provider
              value={{
                className: "crossIcon",
              }}
            >
              {" "}
              <ImCross />
            </IconContext.Provider>
          }
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
    //  console.log("i am tax%", taxData);
    return Object.keys(taxData)
      .reduce((sum, key) => sum + parseFloat(taxData[key] || 0), 0)
      .toFixed(6);
  };
  const handleOk = () => {
    const taxDataObject = getTaxDataObject();
    delete taxDataObject[""];
    const taxModalObject = {
      name: taxname,
      tax_type: "2",
      tax_rate: parseFloat(getTaxPercentage()),
      tax_data: taxDataObject,
    };
    //console.log(taxDataObject, taxModalObject);
    axios
      .post(appUrls.TAXES, taxModalObject)
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
      <Button type="primary" onClick={showModal}>
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
export default AddTaxModal;
