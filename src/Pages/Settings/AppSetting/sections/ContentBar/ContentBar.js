import classes from "./ContentBar.module.css";
import React from "react";
import { exportList } from "../../../../../Services/ListServices";
import { PageHeader, Button, Menu, Dropdown, Select } from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
const syncInventory = (
  <Select placeholder="Sync all Inventory" onChange={handleChange} key="6">
    <Option value="shopify">Shopify</Option>
  </Select>
);
const syncProduct = (
  <Select placeholder="Sync Product Listing" onChange={handleChange} key="5">
    <Option value="shopify">Shopify</Option>
  </Select>
);
function handleMenuClick(e) {
  console.log("click", e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Download sample</Menu.Item>
  </Menu>
);
const exportCSV = (incoming) => {
  if (incoming === "ProductListings") {
    const url =
      "https://inventory-dev-295903.appspot.com/ecom/settings/channels/products/links/?paginate=False&format=csv&is_archieved=False";
    exportList(url, "Product Listing");
  }
};
const ContentBar = (props) => {
  let extra;

  if (props.incoming === "ProductListings") {
    extra = (
      <React.Fragment>
        <Button key="4" onClick={() => exportCSV("ProductListings")}>
          Export
        </Button>
        <Button key="3">Import</Button>
        {syncInventory}
        {syncProduct}
        <Button key="2">Reset filters</Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="1"
          type="primary"
        >
          Apply
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ProductCategory") {
    extra = (
      <React.Fragment>
        <Button className={classes.margin} key="3">
          Export
        </Button>
        <Dropdown.Button className={classes.margin} key="2" overlay={menu}>
          Import
        </Dropdown.Button>
        <Button className={classes.margin} key="1" type="primary">
          Add New
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ProductPackSize") {
    extra = (
      <React.Fragment>
        <Button key="4">Export</Button>
        <Button key="3">Import</Button>
        <Button key="2">Reset</Button>
        <Button key="1" type="primary">
          Apply
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ArchievedProduct") {
    extra = (
      <React.Fragment>
        <Button key="4">More Filters</Button>
        <Button key="3">Export</Button>
        <Button key="2">Reset</Button>
        <Button key="1" type="primary">
          Apply
        </Button>
      </React.Fragment>
    );
  }
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={props.title}
        extra={[extra]}
      ></PageHeader>
    </div>
  );
};
export default ContentBar;
