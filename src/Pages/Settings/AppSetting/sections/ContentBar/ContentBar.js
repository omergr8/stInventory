import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { appUrls } from "../../../../../Constants/appUrls";
import { appRoutes } from "../../../../../Constants/appRoutes";
import {
  exportList,
  importList,
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
  Upload,
  Space,
} from "antd";
import {
  AiOutlinePlus,
  AiFillSave,
  AiOutlineSave,
  AiOutlineUndo,
} from "react-icons/ai";
import { FaFileArchive } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
const { Option } = Select;

function handleMenuClick(e) {}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="23">Download sample</Menu.Item>
  </Menu>
);

const exportCSV = (incoming) => {
  if (incoming === "ProductListings") {
    const url = `${appUrls.PRODUCT_LINKS}?paginate=False&format=csv&is_archived=False`;
    exportList(url, "Product Listing");
  }
};

const ContentBar = (props) => {
  let extra;
  let description;
  const history = useHistory();
  const [allchannels, setAllChannels] = useState(props.channels);

  const customRequestPackSize = (file) => {
    props.import_ref.current(file.file);
  };
  const customRequestCategory = (file) => {
    props.categoryImport(file.file);
  };
  function handleChange(value, type) {
    props.sync(value, type);
  }

  useEffect(() => {
    if (props.incoming === "ProductListings") {
      setAllChannels(props.channels);
    }
  }, [props.allchannel]);
  const syncInventory = (
    <Select
      placeholder="Sync all Inventory"
      onSelect={(value) => handleChange(value, "inventory")}
      style={{ width: 160 }}
      key="6"
      value={"Sync all Inventory"}
    >
      {allchannels !== undefined
        ? allchannels.map((value, index) => (
            <Option key={index} value={value.id}>
              {value.name}
            </Option>
          ))
        : null}
    </Select>
  );
  const syncProduct = (
    <Select
      placeholder="Sync Product Listing"
      style={{ width: 180 }}
      value="Sync Product Listing"
      onSelect={(value) => handleChange(value, "product")}
      key="5"
    >
      {allchannels !== undefined
        ? allchannels.map((value, index) => (
            <Option key={index} value={value.id}>
              {value.name}
            </Option>
          ))
        : null}
    </Select>
  );
  if (props.incoming === "user") {
    description = (
      <Space key="34">
        <Descriptions size="small" column={24}>
          <Descriptions.Item>
            <h4>Email: </h4> &nbsp; <label> {props.user.email}</label>
          </Descriptions.Item>
        </Descriptions>
      </Space>
    );
  } else if (props.incoming === "ProductListings") {
    extra = (
      <Space key="30">
        <Button key="1" onClick={() => exportCSV("ProductListings")}>
          Export
        </Button>
        <Upload
          customRequest={(file) =>
            importList(file.file, appUrls.PRODUCT_LINKS_IMPORT)
          }
          showUploadList={false}
        >
          <Button key="2">Import</Button>
        </Upload>
        {syncInventory}
        {syncProduct}
        <Button onClick={() => props.reset_ref.current()} key="3">
          Reset filters
        </Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="4"
          type="primary"
        >
          Apply
        </Button>
      </Space>
    );
  } else if (props.incoming === "ProductCategory") {
    const ProductCategoryUrl = `${appUrls.PRODUCT_GROUP1}?format=csv&is_archived=false&paginate=False`;
    extra = (
      <Space key="31">
        <Button
          onClick={() => exportList(ProductCategoryUrl, "Product Category")}
          key="5"
        >
          Export
        </Button>
        <Upload customRequest={customRequestCategory} showUploadList={false}>
          <Dropdown.Button key="2" overlay={menu}>
            Import
          </Dropdown.Button>
        </Upload>
        <Button onClick={() => props.addNew()} key="6" type="primary">
          Add New
        </Button>
      </Space>
    );
  } else if (props.incoming === "ProductPackSize") {
    const ProductCategoryUrl = `${appUrls.PRODUCT_PACK_SIZES}?format=csv&paginate=False`;
    extra = (
      <Space key="29">
        <Button
          key="7"
          onClick={() => exportList(ProductCategoryUrl, "Pack Sizes")}
        >
          Export
        </Button>
        <Upload customRequest={customRequestPackSize} showUploadList={false}>
          <Button key="8">Import</Button>
        </Upload>
        <Button onClick={() => props.reset_ref.current()} key="9">
          Reset
        </Button>
        <Button
          onClick={() => props.productTableMethod_ref.current()}
          key="10"
          type="primary"
        >
          Apply
        </Button>
      </Space>
    );
  } else if (props.incoming === "ArchivedProduct") {
    const ArchiveProductUrl = `${appUrls.PRODUCTS}?format=csv&is_archived=True&paginate=False`;
    extra = (
      <Space key="32">
        <Button
          onClick={() => props.more_ref.current()}
          icon={<AiOutlinePlus />}
        >
          More Filters
        </Button>
        <Button
          key="12"
          onClick={() => exportList(ArchiveProductUrl, "Archived Product")}
        >
          Export
        </Button>
        <Button onClick={() => props.reset_ref.current()} key="13">
          Reset
        </Button>
        <Button
          onClick={() => props.archiveProductTableMethod_ref.current()}
          key="14"
          type="primary"
        >
          Apply
        </Button>
      </Space>
    );
  } else if (props.incoming === "Warehouses") {
    extra = (
      <Space key="33">
        <Button onClick={props.addWarehouse} icon={<AiOutlinePlus />} key="23">
          Add Warehouse
        </Button>
      </Space>
    );
  } else if (props.incoming === "WarehouseLink") {
    extra = (
      <Space key="33">
        <Button
          onClick={() => {
            history.push(appRoutes.WAREHOUSE_LINK_NEW);
          }}
          icon={<AiOutlinePlus />}
          key="23"
        >
          New Link
        </Button>
      </Space>
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
            Undo Archive
          </Button>
        ) : (
          <Button
            onClick={() => props.setArchive(true)}
            icon={<FaFileArchive />}
            key="16"
          >
            Archive
          </Button>
        )}

        <Button onClick={props.delete} icon={<RiDeleteBin6Line />} key="17">
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
    if (props.incoming === "user") {
      if (props.user.is_admin) {
        return (
          <Tag style={{ marginLeft: "20px" }} color="blue">
            Admin
          </Tag>
        );
      } else if (!props.user.is_admin) {
        return (
          <Tag style={{ marginLeft: "20px" }} color="blue">
            User
          </Tag>
        );
      }
    } else if (props.isArchive && !props.isBundle) {
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
        <Space>
          <Tag style={{ marginLeft: "20px" }} color="red">
            Bundle
          </Tag>
          <Tag style={{ marginLeft: "20px" }} color="red">
            Archived
          </Tag>
        </Space>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        style={{ backgroundColor: "#F5F5F5" }}
        ghost={false}
        onBack={() => window.history.back()}
        title={
          <div
            style={{
              width: "700px",
              wordWrap: "break-word",
              textOverflow: "clip",
              whiteSpace: "normal",
            }}
          >
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
