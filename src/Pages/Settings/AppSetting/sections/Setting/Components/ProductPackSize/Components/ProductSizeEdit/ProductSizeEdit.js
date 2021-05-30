import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  getToken,
  getLocalUom,
  getLocalTax,
  getCategory,
  getCategoryName,
  getCategoryId,
} from "../../../../../../../../../Services/ListServices";
import ContentBar from "../../../../../ContentBar/ContentBar";
import PurchaseinPackTable from "./Components/PurchaseinPackTable/PurchaseinPackTable";
import { Form, Input, Select, Button, Checkbox, Table } from "antd";
var data = require("currency-codes/data");

const { Option } = Select;
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};
function handleChange(value) {
  console.log(`selected ${value}`);
}

const ProductSizeEdit = () => {
  // console.log("rendering");
  const { id } = useParams();
  //   const localUom = getLocalUom();
  //   const localTax = getLocalTax();
  //   console.log(localUom);
  const headers = getToken();
  const [showtable, setShowTable] = useState(false);
  const [requiresave, setRequireSave] = useState(false);
  const [productsizedata, setProductSizeData] = useState([]);
  const [sid, setSid] = useState();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [printname, setPrintName] = useState("");
  const [productuom, setProductUom] = useState([]);
  const [uom, setUom] = useState("");
  const [ispurchasepack, setIsPurchasePack] = useState(Boolean);
  const [tax, setTax] = useState([]);
  const [category, setCategory] = useState([]);
  const [inventorytracking, setInventoryTracking] = useState([]);
  const [alertthreshold, setAlertThreshold] = useState("");
  const [tags, setTags] = useState([]);
  const [suppliersku, setSupplierSku] = useState("");
  const [purchaserate, setPurchaseRate] = useState("");
  const [purchasecurrency, setPurchaseCurrency] = useState([]);
  const [moq, setMoq] = useState("");
  const [packsize, setPackSize] = useState("");
  const [isarchived, setIsArchived] = useState(Boolean);
  const setStateData = (arrayData) => {
    const data = arrayData[0];
    const categoryName = getCategoryName(data.product.group1_id);
    let inventoryTrackingName;
    if (data.product.tracking_type === 2) {
      inventoryTrackingName = "Tracked";
    } else if (data.product.tracking_type === 5) {
      inventoryTrackingName = "Not Tracked";
    }
    setSid(data.id);
    setName(data.product.name);
    setSku(data.product.sku);
    setPrintName(data.product.print_name);
    setProductUom(data.product.uom);
    setUom(data.uom);
    setTax(data.product.tax_id);
    setCategory(categoryName);
    setInventoryTracking(inventoryTrackingName);
    setAlertThreshold(data.product.alert_threshold);
    setTags(data.product.tags);
    setSupplierSku(data.product.supplier_sku);
    setPurchaseRate(data.purchase_rate);
    setPurchaseCurrency(data.product.currency);
    setMoq(data.product.moq);
    setIsPurchasePack(data.product.is_purchased_in_pack);
    setPackSize(data.size);
    setIsArchived(data.product.is_archived);
  };
  const getProductSizeData = () => {
    const url = `https://inventory-dev-295903.appspot.com/products/pack_sizes/?paginate=False&product=${id}`;
    axios.get(url, { headers }).then((res) => {
      const packSizeData = res.data;
      setStateData(packSizeData);
      setProductSizeData(packSizeData[0]);
      console.log(packSizeData);
    });
  };
  useEffect(() => {
    getProductSizeData();
  }, []);
  const setArchive = (archive) => {
    console.log(archive);
    let url;
    if (archive) {
      url = `https://inventory-dev-295903.appspot.com/products/${id}/archive/`;
    } else {
      url = `https://inventory-dev-295903.appspot.com/products/${id}/undo-archive/`;
    }
    axios
      .put(url, "t", { headers })
      .then((res) => {
        console.log(res);
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
      name: name,
      print_name: printname,
      sku: sku,
      uom: productuom,
      image_url: "",
      supplier_sku: suppliersku,
      purchase_rate: purchaserate,
      currency: purchasecurrency,
      moq: moq,
      is_purchased_in_pack: ispurchasepack,
      tracking_type: inventorytracking === "Tracked" ? 2 : 5,
      grade: productsizedata.product.grade,
      is_bundle: productsizedata.product.is_bundle,
      is_archived: isarchived,
      alert_threshold: alertthreshold,
      group1_id: getCategoryId(category),
      tax_id: tax,
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
    console.log(id);
    axios
      .delete(`https://inventory-dev-295903.appspot.com/products/${id}/`, {
        headers,
      })
      .then((res) => {
        if (res) {
          getProductSizeData();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const onFinish = (values) => {
    console.log(values);
  };
  function onChange(e) {
    // setShowTable(e.target.checked);
    setIsPurchasePack(e.target.checked);
  }
  function handleCategoryChange(value) {
    console.log(value);
    setCategory(value);
  }
  function handleInventoryChange(value, key) {
    console.log(value);

    setInventoryTracking(value);
  }

  function valueChange(a, b) {
    console.log("hello2");
    if (!requiresave) {
      setRequireSave(true);
    }
  }

  const fields = [
    {
      name: ["name"],
      value: name,
    },
    {
      name: ["sku"],
      value: sku,
    },
    {
      name: ["printname"],
      value: printname,
    },
    {
      name: ["productuom"],
      value: productuom,
    },
    {
      name: ["tax"],
      value: tax !== null ? tax : "default",
    },
    {
      name: ["category"],
      value: category,
    },
    {
      name: ["inventorytracking"],
      value: inventorytracking,
    },
    {
      name: ["alertthreshold"],
      value: alertthreshold,
    },
    {
      name: ["suppliersku"],
      value: suppliersku,
    },
    {
      name: ["purchaserate"],
      value: purchaserate,
    },
    {
      name: ["purchasecurrency"],
      value: purchasecurrency,
    },
    {
      name: ["moq"],
      value: moq,
    },
  ];
  return (
    <React.Fragment>
      <ContentBar
        title={name}
        incoming="ProductSizeEdit"
        productSizeObject={productsizedata}
        requireSave={requiresave}
        save={updateProduct}
        delete={deleteProduct}
        isArchive={isarchived}
        setArchive={(value) => setArchive(value)}
      />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
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
          label="Name"
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="sku"
          rules={[
            {
              required: true,
            },
          ]}
          label="SKU"
        >
          <Input onChange={(e) => setSku(e.target.value)} />
        </Form.Item>
        <Form.Item name="printname" label="Print Name">
          <Input onChange={(e) => setPrintName(e.target.value)} />
        </Form.Item>
        <Form.Item name="productuom" label="UOM">
          <Select
            style={{ width: 150 }}
            onChange={(value) => setProductUom(value)}
          >
            {getLocalUom().map((uom, index) => (
              <Option key={index} value={uom}>
                {uom}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="tax" label="Tax">
          <Select style={{ width: 150 }} onChange={(value) => setTax(value)}>
            <Option value="default">Select Tax</Option>
            {getLocalTax().map((uom, index) => (
              <Option key={index} value={uom.name}>
                {uom.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleCategoryChange}
          >
            {getCategory().map((cat, index) => (
              <Option
                disabled={
                  category.length > 0
                    ? category.includes(cat.name)
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
        <Form.Item name="inventorytracking" label="Inventory Tracking">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleInventoryChange}
          >
            <Option
              disabled={
                inventorytracking.length > 0
                  ? inventorytracking.includes("Tracked")
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
                inventorytracking.length > 0
                  ? inventorytracking.includes("Not Tracked")
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
        <Form.Item name="alertthreshold" label="Alert Threshold">
          <Input onChange={(e) => setAlertThreshold(e.target.value)} />
        </Form.Item>
        <Form.Item label="Tags"></Form.Item>
        <Form.Item>
          <h2>Purchase details</h2>
        </Form.Item>

        <Form.Item name="suppliersku" label="Supplier SKU">
          <Input onChange={(e) => setSupplierSku(e.target.value)} />
        </Form.Item>
        <Form.Item name="purchaserate" label="Purchase Rate">
          <Input onChange={(e) => setPurchaseRate(e.target.value)} />
        </Form.Item>
        <Form.Item name="purchasecurrency" label="Purchase Currency">
          <Select
            defaultValue="lucy"
            onChange={(value) => setPurchaseCurrency(value)}
          >
            {data.map((currency, index) => (
              <Option value={currency.code} key={index}>
                {currency.code} ({currency.currency})
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="moq" label="MOQ">
          <Input onChange={(e) => setMoq(e.target.value)} />
        </Form.Item>
        <Form.Item label="Purchased in Packs">
          <Checkbox checked={ispurchasepack} onChange={onChange} />
          {ispurchasepack ? (
            <PurchaseinPackTable
              productId={id}
              id={sid}
              packSize={packsize}
              productUom={productuom}
              uom={uom}
              purchaseRate={purchaserate}
              save={updateProduct}
            />
          ) : null}
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
export default ProductSizeEdit;
