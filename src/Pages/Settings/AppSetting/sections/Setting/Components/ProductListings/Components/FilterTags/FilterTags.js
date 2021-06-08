import { Tag } from "antd";
import { useLocation } from "react-router-dom";
const FilterTags = () => {
  const search = useLocation().search;
  return (
    <div style={{ marginLeft: "10px" }}>
      {new URLSearchParams(search).get("product") !== null ? (
        <Tag color="cyan">
          Product: {new URLSearchParams(search).get("product")}
        </Tag>
      ) : null}
      {new URLSearchParams(search).get("channel") !== null ? (
        <Tag color="cyan">
          Channel: {new URLSearchParams(search).get("channel")}
        </Tag>
      ) : null}
      {new URLSearchParams(search).get("has_inventory_sync") !== null ? (
        <Tag color="cyan">
          Inventory Sync:{" "}
          {new URLSearchParams(search).get("has_inventory_sync")}
        </Tag>
      ) : null}
      {new URLSearchParams(search).get("product_tracking_type") !== null ? (
        <Tag color="cyan">
          Inventory Tracking:{" "}
          {new URLSearchParams(search).get("product_tracking_type")}
        </Tag>
      ) : null}
      {new URLSearchParams(search).get("product_tracking_type") === null &&
      new URLSearchParams(search).get("product") === null &&
      new URLSearchParams(search).get("channel") === null &&
      new URLSearchParams(search).get("has_inventory_sync") === null ? (
        <Tag color="default">None</Tag>
      ) : null}
    </div>
  );
};
export default FilterTags;
