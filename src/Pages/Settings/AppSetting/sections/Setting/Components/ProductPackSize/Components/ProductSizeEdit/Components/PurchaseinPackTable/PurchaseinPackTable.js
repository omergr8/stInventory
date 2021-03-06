import React, { useState, useEffect } from "react";
import axios from "../../../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../../../Constants/appUrls";
import { Table, Input, Button, notification } from "antd";
import { RiDeleteBin5Line } from "react-icons/ri";

const PurchaseinPackTable = (props) => {
  const [packsize, setPackSize] = useState([]);
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
  const fetchPurchasePackData = () => {
    axios
      .get(
        `${appUrls.PRODUCT_PACK_SIZES}?paginate=False&product_id=${props.productId}`
      )
      .then((res) => {
        setPackSize(res.data);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    axios
      .get(
        `${appUrls.PRODUCT_PACK_SIZES}?paginate=False&product_id=${props.productId}`
      )
      .then((res) => {
        if (!unmounted) {
          setPackSize(res.data);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);
  useEffect(() => {
    setTableData(data);
  }, [packsize]);

  const addComponent = () => {
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
      .delete(url)
      .then((res) => {
        Alert("bottomRight", "success", "Deleted Successfully.");
        fetchPurchasePackData();
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const remove = (id, productId) => {
    if (id === undefined) {
      var filtered = tabledata.filter(function (el) {
        return el.id !== undefined;
      });
      setTableData(filtered);
    } else {
      deletePackSize(appUrls.PRODUCT_PACK_SIZES + id + "/");
    }
  };
  const updatePackData = (data) => {
    let copyPackSize = [...packsize];

    const index = copyPackSize.findIndex((x) => x.id === data.id);
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
    axios
      .post(url, packSizeObject)
      .then((res) => {
        if (res) {
          const copyPackSizeArray = [...packsize];
          copyPackSizeArray.push(res.data);
          setPackSize(copyPackSizeArray);
          props.save();
        }
      })
      .catch((err) => {
        if (err.res !== undefined) {
          Alert("bottomRight", "error", err.response);
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
    axios
      .put(url, packSizeObject)
      .then((res) => {
        if (res) {
          Alert("bottomRight", "success", "Product Updated");
          updatePackData(res.data);
          props.save();
        }
      })
      .catch((err) => {
        if (err.res !== undefined) {
          Alert("bottomRight", "error", err.response);
        }
      });
  };
  const save = (id, productId) => {
    const findRow = tabledata.find((sid) => sid.key === productId);
    if (id !== undefined) {
      putPackSize(appUrls.PRODUCT_PACK_SIZES + id + "/", findRow);
    } else {
      postPackSize(appUrls.PRODUCT_PACK_SIZES, findRow);
    }
  };
  const onChangePackSize = (value) => {
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
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div style={{ margin: "4px" }}>
            <Button onClick={() => save(row.id, row.key)} size="small">
              Save
            </Button>
          </div>
          <div style={{ margin: "4px" }}>
            <Button
              onClick={() => remove(row.id, row.product_id)}
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
