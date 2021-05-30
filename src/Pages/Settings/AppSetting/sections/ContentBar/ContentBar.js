import classes from "./ContentBar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  exportList,
  dateFormatter,
} from "../../../../../Services/ListServices";
import {
  PageHeader,
  Button,
  Menu,
  Dropdown,
  Select,
  Descriptions,
  Tag,
} from "antd";
import {
  AiOutlinePlus,
  AiOutlineCopy,
  AiFillDelete,
  AiFillSave,
  AiOutlineSave,
  AiOutlineUndo,
} from "react-icons/ai";
import { FaFileArchive } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
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
  let description;
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
    const ProductCategoryUrl =
      "https://inventory-dev-295903.appspot.com/products/groups/1/?format=csv&is_archived=false&paginate=False";
    extra = (
      <React.Fragment>
        <Button
          onClick={() => exportList(ProductCategoryUrl, "Product Category")}
          className={classes.margin}
          key="3"
        >
          Export
        </Button>
        <Dropdown.Button className={classes.margin} key="2" overlay={menu}>
          Import
        </Dropdown.Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          className={classes.margin}
          key="1"
          type="primary"
        >
          Add New
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ProductPackSize") {
    const ProductCategoryUrl =
      "https://inventory-dev-295903.appspot.com/products/pack_sizes/?format=csv&paginate=False";
    extra = (
      <React.Fragment>
        <Button
          key="4"
          onClick={() => exportList(ProductCategoryUrl, "Pack Sizes")}
        >
          Export
        </Button>
        <Button key="3">Import</Button>
        <Button key="2">Reset</Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="1"
          type="primary"
        >
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
  } else if (props.incoming === "WarehouseLink") {
    extra = (
      <React.Fragment>
        <Button icon={<AiOutlinePlus />} key="1">
          New Link
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ProductSizeEdit") {
    description = (
      <React.Fragment>
        <Descriptions size="small" column={5}>
          <Descriptions.Item label={<h4>Created On</h4>}>
            <h5 style={{ marginTop: "2px" }}>
              {dateFormatter(props.productSizeObject.product.created)}
            </h5>
          </Descriptions.Item>
          <Descriptions.Item label={<h4>Updated On</h4>}>
            <h5 style={{ marginTop: "2px" }}>
              {dateFormatter(props.productSizeObject.product.updated)}
            </h5>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="small" column={12}>
          <Descriptions.Item>
            <Link to={`/dashboard/stocklevel/`}>Stock Levels</Link>
          </Descriptions.Item>

          <Descriptions.Item>
            <a>Inventory Log</a>
          </Descriptions.Item>

          <Descriptions.Item>
            <a>Online Listings</a>
          </Descriptions.Item>
        </Descriptions>
      </React.Fragment>
    );
    extra = (
      <React.Fragment>
        {props.requireSave ? null : <Button icon={<AiOutlineSave />} key="4" />}
        {props.isArchive ? (
          <Button
            type="danger"
            onClick={() => props.setArchive(false)}
            icon={<AiOutlineUndo />}
            key="3"
          >
            Undo Archieve
          </Button>
        ) : (
          <Button
            onClick={() => props.setArchive(true)}
            icon={<FaFileArchive />}
            key="3"
          >
            Archieve
          </Button>
        )}

        <Button onClick={props.delete} icon={<AiFillDelete />} key="2">
          Delete
        </Button>
        {props.requireSave ? (
          <Button
            style={{ backgroundColor: "#ffc107" }}
            icon={<CgDanger />}
            key="1"
            onClick={props.save}
          >
            Save
          </Button>
        ) : (
          <Button icon={<AiFillSave />} key="1" type="primary">
            Saved
          </Button>
        )}
      </React.Fragment>
    );
  }
  console.log(props.productSizeObject);
  return (
    <div
      className="site-page-header-ghost-wrapper"
      style={{ marginBottom: "30px" }}
    >
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={
          <div>
            {props.title}
            {props.isArchive ? (
              <Tag style={{ marginLeft: "20px" }} color="red">
                Archived
              </Tag>
            ) : null}
          </div>
        }
        extra={[extra]}
      >
        {description}
      </PageHeader>
    </div>
  );
};
export default ContentBar;
