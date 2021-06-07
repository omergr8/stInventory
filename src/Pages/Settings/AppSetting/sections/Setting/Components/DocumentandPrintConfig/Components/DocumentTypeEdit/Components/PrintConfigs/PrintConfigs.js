import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../../../../../../../../../Services/ListServices";
import {
  Form,
  notification,
  Input,
  Button,
  Checkbox,
  Divider,
  Row,
  Col,
} from "antd";
const { TextArea } = Input;
const { Search } = Input;

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};

const initialFormState = {
  id: Number,
  content_type_id: Number,
  name: "",
  is_default: true,
  print_config: {
    footer_terms: null,
    is_print_sku: true,
    is_print_uom: true,
    is_custom_footer: false,
    is_custom_header: false,
    is_amount_in_words: true,
    is_dispatch_address: false,
    is_print_description: true,
    is_print_tax_columns: false,
    is_print_supplier_sku: false,
    is_print_payment_terms: true,
    footer_height: 30,
    header_height: 100,
  },
  content_type: Number,
};

const PrintConfigs = (props) => {
  const [footerterms, setFooterTerms] = useState();
  const [checkedItems, setCheckedItems] = useState(initialFormState); //plain object as state
  const { id } = useParams();
  const headers = getToken();
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
  useEffect(() => {
    if (props.documentData.print_config !== null) {
      setCheckedItems(props.documentData);
      if (
        props.documentData.print_config.footer_terms !== null &&
        props.documentData.print_config.footer_terms !== undefined
      ) {
        setFooterTerms(
          Object.entries(props.documentData.print_config.footer_terms)
        );
      }
    } else {
      const copyObj = { ...checkedItems };
      const copyObj2 = props.documentData;
      copyObj2.print_config = copyObj.print_config;
      setCheckedItems(copyObj2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const customLabel = (value) => {
    return <label style={{ fontWeight: "600" }}>{value}</label>;
  };
  const addFooter = () => {
    const footerObj = [];
    if (footerterms === undefined) {
      setFooterTerms([footerObj]);
    } else {
      setFooterTerms([...footerterms, footerObj]);
    }
  };
  const remove = (id) => {
    const copyFooterTerms = [...footerterms];
    let filtered = [];
    for (let i = 0; i < copyFooterTerms.length; i++) {
      if (i !== id) {
        filtered.push(copyFooterTerms[i]);
      }
    }
    setFooterTerms(filtered);
  };
  const handleFooter = (event, index) => {
    const copyArray = [...footerterms];
    const arrayObj = copyArray[index];
    if (event.target.name === "key") {
      arrayObj[0] = event.target.value;
    } else if (event.target.name === "value") {
      arrayObj[1] = event.target.value;
    }
    copyArray[index] = arrayObj;
    setFooterTerms(copyArray);
  };
  const handleChange = (event) => {
    const copyObj = { ...checkedItems };
    copyObj.print_config[event.target.name] = event.target.checked;
    setCheckedItems(copyObj);
  };
  const handleInputChange = (event) => {
    if (event.target.name !== "name") {
      const copyObj = { ...checkedItems };
      copyObj.print_config[event.target.name] = event.target.value;
      setCheckedItems(copyObj);
    } else {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.value,
      });
    }
  };
  const save = () => {
    let arrayToObj;
    if (footerterms !== undefined) {
      arrayToObj = Object.fromEntries(footerterms);
    } else {
      arrayToObj = null;
    }
    const copyObj = { ...checkedItems };
    copyObj.print_config.footer_terms = arrayToObj;
    axios
      .put(
        `https://inventory-dev-295903.appspot.com/settings/documents/print/configs/${id}/`,
        copyObj,
        { headers }
      )
      .then((res) => {
        if (res) {
          Alert("bottomRight", "success", "Print Settings Saved");
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          Alert("bottomRight", "error", err.response);
        }
      });
  };
  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item label={customLabel("Name to Print")}>
              <Input
                value={checkedItems["name"]}
                onChange={handleInputChange}
                name="name"
              />
            </Form.Item>

            <Form.Item label={customLabel("Footer Terms")}>
              {footerterms !== undefined
                ? footerterms.map((data, index) => (
                    <div key={index}>
                      <div
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Search
                          placeholder="input search text"
                          enterButton="Delete"
                          size="large"
                          value={data[0]}
                          onSearch={() => remove(index)}
                          onChange={(e) => handleFooter(e, index)}
                          name="key"
                        />
                      </div>
                      <div style={{ paddingBottom: "10px" }}>
                        <TextArea
                          name="value"
                          onChange={(e) => handleFooter(e, index)}
                          value={data[1]}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))
                : null}

              <div>
                <Button onClick={addFooter}>Add Footer Terms</Button>
              </div>
            </Form.Item>
            <Form.Item></Form.Item>
            <Divider>
              <h4>Header & Footer</h4>
            </Divider>
            <Form.Item label={customLabel("Header Height")}>
              <Input
                value={checkedItems.print_config["header_height"]}
                onChange={handleInputChange}
                name="header_height"
              />
            </Form.Item>
            <Form.Item label={customLabel("Custom Header")} name="remember">
              <Checkbox
                name="is_custom_header"
                onChange={handleChange}
                checked={checkedItems.print_config["is_custom_header"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("Footer Height")}>
              <Input
                value={checkedItems.print_config["footer_height"]}
                onChange={handleInputChange}
                name="footer_height"
              />
            </Form.Item>
            <Form.Item label={customLabel("Custom Footer")} name="remember">
              <Checkbox
                name="is_custom_footer"
                onChange={handleChange}
                checked={checkedItems.print_config["is_custom_footer"]}
              />
            </Form.Item>
            <Divider>
              <h4>Print information</h4>
            </Divider>
            <Form.Item label={customLabel("Amount in Words")} name="remember">
              <Checkbox
                name="is_amount_in_words"
                onChange={handleChange}
                checked={checkedItems.print_config["is_amount_in_words"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("SKU")} name="remember">
              <Checkbox
                name="is_print_sku"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_sku"]}
              />
            </Form.Item>
            <Form.Item
              label={customLabel("Product Description")}
              name="remember"
            >
              <Checkbox
                name="is_print_description"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_description"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("UOM")} name="remember">
              <Checkbox
                name="is_print_uom"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_uom"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("Supplier SKU")} name="remember">
              <Checkbox
                name="is_print_supplier_sku"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_supplier_sku"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("Dispatch Address")} name="remember">
              <Checkbox
                name="is_dispatch_address"
                onChange={handleChange}
                checked={checkedItems.print_config["is_dispatch_address"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("Payment Terms")} name="remember">
              <Checkbox
                name="is_print_payment_terms"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_payment_terms"]}
              />
            </Form.Item>
            <Form.Item label={customLabel("Tax columns")} name="remember">
              <Checkbox
                name="is_print_tax_columns"
                onChange={handleChange}
                checked={checkedItems.print_config["is_print_tax_columns"]}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={2} xl={2}>
          {" "}
          <Button onClick={save} type="primary" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default PrintConfigs;
