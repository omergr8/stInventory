import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../../../../../axiosSet";
import { appUrls } from "../../../../../../../../../Constants/appUrls";
import { Constants } from "../../../../../../../../../Constants/Constants";
import {
  getLocalUom,
  getLocalTax,
  getCategory,
  getCategoryName,
  getCategoryId,
} from "../../../../../../../../../Services/ListServices";
import formReducer from "../../../../../../../../../Reducers/FormReducer";
import ContentBar from "../../../../../ContentBar/ContentBar";
import PurchaseinPackTable from "./Components/PurchaseinPackTable/PurchaseinPackTable";
import { Form, Input, Select, notification, Checkbox, Row, Col } from "antd";
var data = require("currency-codes/data");

const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 15,
  },
};

const initialFormState = {
  id: "",
  name: "",
  sku: "",
  printname: "",
  productuom: "",
  tax: "",
  category: [],
  inventorytracking: [],
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
  const [requiresave, setRequireSave] = useState(false);
  const [productsizedata, setProductSizeData] = useState([]);
  const [ispurchasepack, setIsPurchasePack] = useState(Boolean);

  const Alert = (placement, type, error) => {
    if (type === "success") {
      notification.success({
        message: error,
        placement,
      });
    } else if (type === "error" && error !== undefined)
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
  const callDispatcher2 = (data, name) => {
    dispatch({
      type: "HANDLE SELECT",
      field: name,
      payload: data,
    });
  };
  const setStateData = (packSizeData) => {
    const data = packSizeData;
    const categoryName = getCategoryName(data.group1_id);
    let inventoryTrackingName;
    if (data.tracking_type === Constants.TRACKING_TYPE.TRACKED) {
      inventoryTrackingName = "Tracked";
    } else if (data.tracking_type === Constants.TRACKING_TYPE.NOT_TRACKED) {
      inventoryTrackingName = "Not Tracked";
    }
    callDispatcher(data.id, "id");
    callDispatcher(data.name, "name");
    callDispatcher(data.sku, "sku");
    callDispatcher(data.print_name, "printname");
    callDispatcher(data.uom, "productuom");
    callDispatcher(data.tax_id, "tax");
    callDispatcher(data.image_url, "imgurl");
    callDispatcher2(categoryName, "category");
    callDispatcher2(inventoryTrackingName, "inventorytracking");
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
  };
  const getProductSizeData = () => {
    const url = appUrls.PRODUCTS + id;
    axios
      .get(url)
      .then((res) => {
        const packSizeData = res.data;
        setStateData(packSizeData);
        setProductSizeData(packSizeData);
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  useEffect(() => {
    let unmounted = false;
    const url = appUrls.PRODUCTS + id;
    axios
      .get(url)
      .then((res) => {
        const packSizeData = res.data;
        if (!unmounted) {
          setStateData(packSizeData);
          setProductSizeData(packSizeData);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
    return () => {
      unmounted = true;
    };
  }, []);
  const setArchive = (archive) => {
    let url;
    let arch;
    if (archive) {
      url = appUrls.PRODUCTS + id + "/archive/";
      arch = "Product Archived";
    } else {
      url = appUrls.PRODUCTS + id + "/undo-archive/";
      arch = "Product Un-Archived";
    }
    axios
      .put(url, "t")
      .then((res) => {
        if (res) {
          getProductSizeData();
          Alert("bottomRight", "success", arch);
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
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
      tracking_type:
        formState.inventorytracking === "Tracked"
          ? Constants.TRACKING_TYPE.TRACKED
          : Constants.TRACKING_TYPE.NOT_TRACKED,
      grade: formState.grade,
      is_bundle: formState.is_bundle,
      is_archived: formState.isarchived,
      alert_threshold: formState.alertthreshold,
      group1_id: getCategoryId(formState.category),
      tax_id: formState.tax,
    };
    axios
      .put(appUrls.PRODUCTS + id + "/", prodObj)
      .then((res) => {
        if (res) {
          Alert("bottomRight", "success", "Saved");
          setRequireSave(false);
          getProductSizeData();
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
  const deleteProduct = () => {
    axios
      .delete(appUrls.PRODUCTS + id + "/")
      .then((res) => {
        if (res) {
          Alert("bottomRight", "success", "Deleted Successfully");
          window.history.back();
        }
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
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
    return <label>{value}</label>;
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
            style={{ marginTop: "25px" }}
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
          style={{
            fontWeight: "600",
            fontSize: "16px",
            marginLeft: "20px",
            marginRight: "10px",
          }}
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
