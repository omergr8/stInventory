import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../../../../../../../../Services/ListServices";
import { Table, Input, Button, Space, Form, Modal } from "antd";
import { ImCancelCircle } from "react-icons/im";
import { RiSave3Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import Text from "antd/lib/typography/Text";

const PurchaseinPackTable = (props) => {
  const headers = getToken();
  const [packsize, setPackSize] = useState([]);
  //   const [uom, setUom] = useState(props.uom);
  //   const [purchaserate, setPurchaseRate] = useState(props.purchaseRate);
  const data = packsize.map((data, index) => ({
    key: data.id,
    id: data.id,
    product_id: data.product_id,
    no: index + 1,
    packsize: data.size,
    productuom: data.product.uom,
    uom: data.uom,
    purchaserate: data.purchase_rate,
  }));
  const [tabledata, setTableData] = useState([]);
  const fetchPurchasePackData = () => {
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=False&product_id=${props.productId}`,
        { headers }
      )
      .then((res) => {
        console.log(res.data);
        setPackSize(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    let unmounted = false;
    axios
      .get(
        `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=False&product_id=${props.productId}`,
        { headers }
      )
      .then((res) => {
        if (!unmounted) {
          console.log(res.data);
          setPackSize(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    return () => {
      unmounted = true;
    };
  }, []);
  useEffect(() => {
    setTableData(data);
  }, [packsize]);

  const addComponent = () => {
    //  console.log();
    const obj = {
      key:
        tabledata[tabledata.length - 1] === undefined
          ? 1
          : tabledata[tabledata.length - 1].key + 1,
      no:
        tabledata[tabledata.length - 1] === undefined
          ? 1
          : tabledata[tabledata.length - 1].no + 1,
      id: undefined,
      product_id: props.productId,
      packsize: "",
      productuom: "",
      uom: "",
      purchaserate: "",
    };

    setTableData([...tabledata, obj]);
  };
  const deletePackSize = (url) => {
    axios
      .delete(url, { headers })
      .then((res) => {
        console.log(res);
        fetchPurchasePackData();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const remove = (id, productId) => {
    //console.log(productId, id, props.productId);
    if (id === undefined) {
      var filtered = tabledata.filter(function (el) {
        return el.id !== undefined;
      });
      //console.log("if", tabledata, id, filtered);
      setTableData(filtered);
    } else {
      console.log("else");
      deletePackSize(
        `https://inventory-dev-295903.appspot.com/products/pack_sizes/${id}/`
      );
    }
  };
  const updatePackData = (data) => {
    let copyPackSize = [...packsize];

    const index = copyPackSize.findIndex((x) => x.id === data.id);
    console.log(copyPackSize, copyPackSize, index);
    copyPackSize[index] = data;
    setPackSize(copyPackSize);
  };
  const postPackSize = (url, rowObject) => {
    const packSizeObject = {
      product_id: rowObject.product_id,
      uom: rowObject.uom,
      size: rowObject.packsize,
      purchase_rate: rowObject.purchaserate,
    };
    console.log(packSizeObject);
    axios
      .post(url, packSizeObject, { headers })
      .then((res) => {
        console.log(res);
        if (res) {
          //updatePackData(res.data);
          const copyPackSizeArray = [...packsize];
          copyPackSizeArray.push(res.data);
          setPackSize(copyPackSizeArray);
          props.save();
        }
      })
      .catch((err) => {
        if (err.res !== undefined) {
          console.log(err.response.data);
        }
      });
  };

  const putPackSize = (url, rowObject) => {
    const packSizeObject = {
      product_id: rowObject.product_id,
      uom: rowObject.uom,
      size: rowObject.packsize,
      purchase_rate: rowObject.purchaserate,
    };
    console.log(packSizeObject);
    axios
      .put(url, packSizeObject, { headers })
      .then((res) => {
        console.log(res.data);
        if (res) {
          updatePackData(res.data);
          props.save();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const save = (id, productId) => {
    const findRow = tabledata.find((sid) => sid.key === productId);
    console.log(id, productId, tabledata, findRow);
    if (id !== undefined) {
      console.log("update");
      putPackSize(
        `https://inventory-dev-295903.appspot.com/products/pack_sizes/${id}/`,
        findRow
      );
    } else {
      console.log("new");
      postPackSize(
        `https://inventory-dev-295903.appspot.com/products/pack_sizes/`,
        findRow
      );
    }
  };
  const onChangePackSize = (value) => {
    let copyArray = [...tabledata];
    let index = copyArray.findIndex(
      (x) => x.key === parseInt(value.target.name)
    );
    console.log(copyArray, index, parseInt(value.target.name), "a");
    let newObj;
    if (copyArray[index] !== undefined) {
      newObj = {
        key: copyArray[index].key,
        id: copyArray[index].id,
        no: copyArray[index].no,
        product_id: copyArray[index].product_id,
        packsize: value.target.value,
        productuom: copyArray[index].productuom,
        uom: copyArray[index].uom,
        purchaserate: copyArray[index].purchaserate,
      };
    }
    if (index !== -1) {
      copyArray[index] = newObj;
    }
    setTableData(copyArray);
  };
  const onChangePackUom = (value) => {
    let copyArray = [...tabledata];
    let index = copyArray.findIndex(
      (x) => x.key === parseInt(value.target.name)
    );
    let newObj;
    if (copyArray[index] !== undefined) {
      newObj = {
        key: copyArray[index].key,
        id: copyArray[index].id,
        no: copyArray[index].no,
        packsize: copyArray[index].packsize,
        product_id: copyArray[index].product_id,
        productuom: copyArray[index].productuom,
        uom: value.target.value,
        purchaserate: copyArray[index].purchaserate,
      };
    }
    if (index !== -1) {
      copyArray[index] = newObj;
    }
    setTableData(copyArray);
  };
  const onChangePackRate = (value) => {
    let copyArray = [...tabledata];
    let index = copyArray.findIndex(
      (x) => x.key === parseInt(value.target.name)
    );
    let newObj;
    if (copyArray[index] !== undefined) {
      newObj = {
        key: copyArray[index].key,
        id: copyArray[index].id,
        no: copyArray[index].no,
        packsize: copyArray[index].packsize,
        product_id: copyArray[index].product_id,
        productuom: copyArray[index].productuom,
        uom: copyArray[index].uom,
        purchaserate: value.target.value,
      };
    }
    if (index !== -1) {
      copyArray[index] = newObj;
    }
    setTableData(copyArray);
  };
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Pack Size",
      dataIndex: "packsize",
      key: "packsize",
      render: (text, row, index) => (
        <Input onChange={onChangePackSize} name={row.key} value={text} />
      ),
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
      render: (text, row) => (
        <Input onChange={onChangePackUom} name={row.key} value={text} />
      ),
    },
    {
      title: "Purchase Rate",
      dataIndex: "purchaserate",
      key: "purchaserate",
      render: (text, row) => (
        <Input onChange={onChangePackRate} name={row.key} value={text} />
      ),
    },
    {
      title: "",
      dataIndex: "close",
      key: "close",
      render: (text, row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ margin: "6px" }}>
            <Button
              onClick={() => save(row.id, row.key)}
              type="primary"
              icon={<RiSave3Fill />}
              size="small"
            >
              Save
            </Button>
          </div>
          <div style={{ margin: "6px" }}>
            <Button
              onClick={() => remove(row.id, row.product_id)}
              type="danger"
              icon={<RiDeleteBin5Line />}
              size="small"
            />{" "}
          </div>
        </div>
      ),
    },
  ];
  const Footer = (
    <Button onClick={addComponent} size="small">
      Add Pack Size
    </Button>
  );
  return (
    <div>
      <Table
        bordered
        pagination={false}
        columns={columns}
        dataSource={tabledata}
        footer={() => Footer}
      />
    </div>
  );
};
export default PurchaseinPackTable;
