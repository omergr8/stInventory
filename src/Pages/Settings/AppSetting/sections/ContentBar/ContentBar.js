import classes from "./ContentBar.module.css";
import { PageHeader, Button, Descriptions } from "antd";
import { Select } from "antd";

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

const ContentBar = () => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Product Listings"
        extra={[
          <Button key="4">Export</Button>,
          <Button key="3">Import</Button>,
          syncInventory,
          syncProduct,
          <Button key="2">Reset filters</Button>,
          <Button key="1" type="primary">
            Apply
          </Button>,
        ]}
      ></PageHeader>
    </div>
  );
};
export default ContentBar;
