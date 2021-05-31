import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getToken,
  getLocalUom,
  getLocalTax,
  getCategory,
  getCategoryName,
  getCategoryId,
} from "../../../../../../../../../Services/ListServices";
import formReducer from "../../../../../../../../../Reducers/FormReducer";
import ContentBar from "../../../../../ContentBar/ContentBar";
import PurchaseinPackTable from "./Components/PurchaseinPackTable/PurchaseinPackTable";
import { Form, Input, Select, Button, Checkbox, Row, Col } from "antd";
var data = require("currency-codes/data");

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const initialFormState = {
  id: "",
  name: "",
  sku: "",
  printname: "",
  productuom: "",
  tax: "",
  category: "",
  inventorytracking: "",
  alertthreshold: "",
  isarchived: Boolean,
  isbundle: Boolean,
  imgurl: "",
  tags: "",
  suppliersku: "",
  purchaserate: "",
  purchasecurrency: "",
  moq: "",
  grade: "",
  ispurchasepack: Boolean,
};
const ProductSizeEdit = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { id } = useParams();
  const headers = getToken();
  const [requiresave, setRequireSave] = useState(false);
  const [productsizedata, setProductSizeData] = useState([]);
  const [ispurchasepack, setIsPurchasePack] = useState(Boolean);
  const [isarchived, setIsArchived] = useState(Boolean);

  const callDispatcher = (data, name) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: name,
      payload: data,
    });
  };
  const setStateData = (packSizeData) => {
    const data = packSizeData;
    const categoryName = getCategoryName(data.group1_id);
    let inventoryTrackingName;
    if (data.tracking_type === 2) {
      inventoryTrackingName = "Tracked";
    } else if (data.tracking_type === 5) {
      inventoryTrackingName = "Not Tracked";
    }
    callDispatcher(data.id, "id");
    callDispatcher(data.name, "name");
    callDispatcher(data.sku, "sku");
    callDispatcher(data.print_name, "printname");
    callDispatcher(data.uom, "productuom");
    callDispatcher(data.tax_id, "tax");
    callDispatcher(data.image_url, "imgurl");
    callDispatcher(categoryName, "category");
    callDispatcher(inventoryTrackingName, "inventorytracking");
    callDispatcher(data.alert_threshold, "alertthreshold");
    callDispatcher(data.tags, "tags");
    callDispatcher(data.supplier_sku, "suppliersku");
    callDispatcher(data.purchase_rate, "purchaserate");
    callDispatcher(data.currency, "purchasecurrency");
    callDispatcher(data.moq, "moq");
    callDispatcher(data.is_archived, "isarchived");
    callDispatcher(data.is_bundle, "isbundle");
    callDispatcher(data.grade, "grade");
    setIsPurchasePack(data.is_purchased_in_pack);
    //setIsArchived(data.is_archived);
    // setPackSize(data.size);
    //setUom(data.uom);
    //setSid(data.id);
  };
  const getProductSizeData = () => {
    // const url = `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=False&product=${id}`;
    const url = `https://inventory-dev-295903.appspot.com/products/${id}`;
    axios.get(url, { headers }).then((res) => {
      const packSizeData = res.data;
      setStateData(packSizeData);
      setProductSizeData(packSizeData);
    });
  };
  useEffect(() => {
    let unmounted = false;
    // const url = `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=False&product=${id}`;
    const url = `https://inventory-dev-295903.appspot.com/products/${id}`;
    axios.get(url, { headers }).then((res) => {
      const packSizeData = res.data;
      if (!unmounted) {
        console.log(packSizeData);
        setStateData(packSizeData);
        setProductSizeData(packSizeData);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);
  const setArchive = (archive) => {
    let url;
    if (archive) {
      url = `https://inventory-dev-295903.appspot.com/products/${id}/archive/`;
    } else {
      url = `https://inventory-dev-295903.appspot.com/products/${id}/undo-archive/`;
    }
    axios
      .put(url, "t", { headers })
      .then((res) => {
        if (res) {
          getProductSizeData();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const updateProduct = () => {
    const prodObj = {
      name: formState.name,
      print_name: formState.printname,
      sku: formState.sku,
      uom: formState.productuom,
      image_url: "",
      supplier_sku: formState.suppliersku,
      purchase_rate: formState.purchaserate,
      currency: formState.purchasecurrency,
      moq: formState.moq,
      is_purchased_in_pack: ispurchasepack,
      tracking_type: formState.inventorytracking === "Tracked" ? 2 : 5,
      grade: formState.grade,
      is_bundle: formState.is_bundle,
      is_archived: formState.isarchived,
      alert_threshold: formState.alertthreshold,
      group1_id: getCategoryId(formState.category),
      tax_id: formState.tax,
    };
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/products/${id}/`,
        prodObj,
        {
          headers,
        }
      )
      .then((res) => {
        if (res) {
          setRequireSave(false);
          getProductSizeData();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const deleteProduct = () => {
    axios
      .delete(`https://inventory-dev-295903.appspot.com/products/${id}/`, {
        headers,
      })
      .then((res) => {
        if (res) {
          window.history.back();
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  function onChange(e) {
    setIsPurchasePack(e.target.checked);
  }

  function valueChange(a, b) {
    if (!requiresave) {
      setRequireSave(true);
    }
  }

  const fields = [
    {
      name: ["name"],
      value: formState.name,
    },
    {
      name: ["sku"],
      value: formState.sku,
    },
    {
      name: ["printname"],
      value: formState.printname,
    },
    {
      name: ["productuom"],
      value: formState.productuom,
    },
    {
      name: ["tax"],
      value: formState.tax !== null ? formState.tax : "default",
    },
    {
      name: ["category"],
      value: formState.category,
    },
    {
      name: ["inventorytracking"],
      value: formState.inventorytracking,
    },
    {
      name: ["alertthreshold"],
      value: formState.alertthreshold,
    },
    {
      name: ["suppliersku"],
      value: formState.suppliersku,
    },
    {
      name: ["purchaserate"],
      value: formState.purchaserate,
    },
    {
      name: ["purchasecurrency"],
      value: formState.purchasecurrency,
    },
    {
      name: ["moq"],
      value: formState.moq,
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
  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  return (
    <React.Fragment>
      <ContentBar
        title={formState.name}
        incoming="ProductSizeEdit"
        productSizeObject={productsizedata}
        requireSave={requiresave}
        save={updateProduct}
        delete={deleteProduct}
        isArchive={formState.isarchived}
        isBundle={formState.isbundle}
        setArchive={(value) => setArchive(value)}
      />
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={16}>
          <Form
            {...layout}
            name="nest-messages"
            onValuesChange={valueChange}
            fields={fields}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
              label={customLabel("Name")}
            >
              <Input name="name" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
            <Form.Item
              name="sku"
              rules={[
                {
                  required: true,
                },
              ]}
              label={customLabel("SKU")}
            >
              <Input name="sku" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
            <Form.Item name="printname" label={customLabel("Print Name")}>
              <Input name="printname" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
            <Form.Item name="productuom" label={customLabel("UOM")}>
              <Select
                style={{ width: 150 }}
                onChange={(value) => handleSelectChange(value, "productuom")}
              >
                {getLocalUom().map((uom, index) => (
                  <Option key={index} value={uom}>
                    {uom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="tax" label={customLabel("Tax")}>
              <Select
                style={{ width: 150 }}
                onChange={(value) => handleSelectChange(value, "tax")}
              >
                <Option value="default">Select Tax</Option>
                {getLocalTax().map((uom, index) => (
                  <Option key={index} value={uom.id}>
                    {uom.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="category" label={customLabel("Category")}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={(value) => handleSelectChange(value, "category")}
              >
                {getCategory().map((cat, index) => (
                  <Option
                    disabled={
                      formState.category.length > 0
                        ? formState.category.includes(cat.name)
                          ? false
                          : true
                        : false
                    }
                    value={cat.name}
                    key={index}
                  >
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="inventorytracking"
              label={customLabel("Inventory Tracking")}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={(value) =>
                  handleSelectChange(value, "inventorytracking")
                }
              >
                <Option
                  disabled={
                    formState.inventorytracking.length > 0
                      ? formState.inventorytracking.includes("Tracked")
                        ? false
                        : true
                      : false
                  }
                  value="Tracked"
                  key={2}
                >
                  Tracked
                </Option>
                <Option
                  disabled={
                    formState.inventorytracking.length > 0
                      ? formState.inventorytracking.includes("Not Tracked")
                        ? false
                        : true
                      : false
                  }
                  value="Not Tracked"
                  key={5}
                >
                  Not Tracked
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="alertthreshold"
              label={customLabel("Alert Threshold")}
            >
              <Input
                name="alertthreshold"
                onChange={(e) => handleTextChange(e)}
              />
            </Form.Item>
            <Form.Item label={customLabel("Tags")}></Form.Item>
            <Form.Item>
              <h2>Purchase details</h2>
            </Form.Item>
            <Form.Item name="suppliersku" label={customLabel("Supplier SKU")}>
              <Input name="suppliersku" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
            <Form.Item name="purchaserate" label={customLabel("Purchase Rate")}>
              <Input
                name="purchaserate"
                onChange={(e) => handleTextChange(e)}
              />
            </Form.Item>
            <Form.Item
              name="purchasecurrency"
              label={customLabel("Purchase Currency")}
            >
              <Select
                onChange={(value) =>
                  handleSelectChange(value, "purchasecurrency")
                }
              >
                {data.map((currency, index) => (
                  <Option value={currency.code} key={index}>
                    {currency.code} ({currency.currency})
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="moq" label={customLabel("MOQ")}>
              <Input name="moq" onChange={(e) => handleTextChange(e)} />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          {formState.imgurl !== "" ? (
            <img alt="product_image" width="400px" src={formState.imgurl} />
          ) : null}
        </Col>
      </Row>
      <div>
        <label
          style={{ fontWeight: "600", marginLeft: "20px", marginRight: "20px" }}
        >
          Purchase in Packs:
        </label>
        <Checkbox checked={ispurchasepack} onChange={onChange} />
        {ispurchasepack ? (
          <PurchaseinPackTable
            productId={formState.id}
            productUom={formState.productuom}
            purchaseRate={formState.purchaserate}
            save={updateProduct}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default ProductSizeEdit;
