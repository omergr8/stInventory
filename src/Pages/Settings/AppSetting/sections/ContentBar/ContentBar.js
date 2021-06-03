import classes from "./ContentBar.module.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
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
    <Option key="20" value="shopify">
      Shopify
    </Option>
  </Select>
);
const syncProduct = (
  <Select placeholder="Sync Product Listing" onChange={handleChange} key="5">
    <Option key="21" value="shopify">
      Shopify
    </Option>
  </Select>
);
function handleMenuClick(e) {
  console.log("click", e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="23">Download sample</Menu.Item>
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
  const history = useHistory();

  if (props.incoming === "ProductListings") {
    extra = (
      <React.Fragment key="30">
        <Button key="1" onClick={() => exportCSV("ProductListings")}>
          Export
        </Button>
        <Button key="2">Import</Button>
        {syncInventory}
        {syncProduct}
        <Button key="3">Reset filters</Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="4"
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
      <React.Fragment key="31">
        <Button
          onClick={() => exportList(ProductCategoryUrl, "Product Category")}
          className={classes.margin}
          key="5"
        >
          Export
        </Button>
        <Dropdown.Button className={classes.margin} key="2" overlay={menu}>
          Import
        </Dropdown.Button>
        <Button
          onClick={() => props.addNew()}
          className={classes.margin}
          key="6"
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
      <React.Fragment key="29">
        <Button
          key="7"
          onClick={() => exportList(ProductCategoryUrl, "Pack Sizes")}
        >
          Export
        </Button>
        <Button key="8">Import</Button>
        <Button key="9">Reset</Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="10"
          type="primary"
        >
          Apply
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ArchievedProduct") {
    const ArchiveProductUrl =
      "https://inventory-dev-295903.appspot.com/products/?format=csv&is_archived=True&paginate=False";
    extra = (
      <React.Fragment key="32">
        <Button key="11">More Filters</Button>
        <Button
          key="12"
          onClick={() => exportList(ArchiveProductUrl, "Archieved Product")}
        >
          Export
        </Button>
        <Button key="13">Reset</Button>
        <Button
          onClick={() => props.archiveProductTableMethod_ref.current()}
          key="14"
          type="primary"
        >
          Apply
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "WarehouseLink") {
    extra = (
      <React.Fragment key="33">
        <Button
          onClick={() => {
            history.push("/dashboard/warehouselink/new");
          }}
          icon={<AiOutlinePlus />}
          key="23"
        >
          New Link
        </Button>
      </React.Fragment>
    );
  } else if (props.incoming === "ProductSizeEdit") {
    description = (
      <React.Fragment key="34">
        <Descriptions size="small" column={5}>
          <Descriptions.Item key="24" label={<h4>Created On</h4>}>
            <h5 style={{ marginTop: "2px" }}>
              {props.productSizeObject === undefined ||
              props.productSizeObject === null
                ? null
                : dateFormatter(props.productSizeObject.created)}
            </h5>
          </Descriptions.Item>
          <Descriptions.Item key="25" label={<h4>Updated On</h4>}>
            <h5 style={{ marginTop: "2px" }}>
              {props.productSizeObject === undefined ||
              props.productSizeObject === null
                ? null
                : dateFormatter(props.productSizeObject.updated)}
            </h5>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="small" column={12}>
          <Descriptions.Item key="26">
            <Link to={`/dashboard/stocklevel/`}>Stock Levels</Link>
          </Descriptions.Item>

          <Descriptions.Item key="27">
            <a>Inventory Log</a>
          </Descriptions.Item>

          <Descriptions.Item key="28">
            <a>Online Listings</a>
          </Descriptions.Item>
        </Descriptions>
      </React.Fragment>
    );
    extra = (
      <React.Fragment key="35">
        {props.requireSave ? null : <Button icon={<AiOutlineSave />} key="4" />}
        {props.isArchive ? (
          <Button
            type="danger"
            onClick={() => props.setArchive(false)}
            icon={<AiOutlineUndo />}
            key="15"
          >
            Undo Archieve
          </Button>
        ) : (
          <Button
            onClick={() => props.setArchive(true)}
            icon={<FaFileArchive />}
            key="16"
          >
            Archieve
          </Button>
        )}

        <Button onClick={props.delete} icon={<AiFillDelete />} key="17">
          Delete
        </Button>
        {props.requireSave ? (
          <Button
            style={{ backgroundColor: "#ffc107" }}
            icon={<CgDanger />}
            key="18"
            onClick={props.save}
          >
            Save
          </Button>
        ) : (
          <Button icon={<AiFillSave />} key="19" type="primary">
            Saved
          </Button>
        )}
      </React.Fragment>
    );
  }
  const title = () => {
    if (props.isArchive && !props.isBundle) {
      return (
        <Tag style={{ marginLeft: "20px" }} color="red">
          Archived
        </Tag>
      );
    } else if (props.isBundle && !props.isArchive) {
      return (
        <Tag style={{ marginLeft: "20px" }} color="red">
          Bundle
        </Tag>
      );
    } else if (props.isBundle && props.isArchive) {
      return (
        <React.Fragment>
          <Tag style={{ marginLeft: "20px" }} color="red">
            Bundle
          </Tag>
          <Tag style={{ marginLeft: "20px" }} color="red">
            Archived
          </Tag>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
  return (
    <div
      className="site-page-header-ghost-wrapper"
      style={{ marginBottom: "30px" }}
    >
      <PageHeader
        style={{ backgroundColor: "#F5F5F5" }}
        ghost={false}
        onBack={() => window.history.back()}
        title={
          <div>
            {props.title}
            {title()}
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
