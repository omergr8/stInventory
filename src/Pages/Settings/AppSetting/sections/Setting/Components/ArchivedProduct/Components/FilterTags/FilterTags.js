import { Tag } from "antd";
import { useLocation } from "react-router-dom";
const FilterTags = () => {
  const search = useLocation().search;
  return (
    <div style={{ display: "flex" }}>
      <p>Filters Applied: </p>
      <div style={{ marginLeft: "10px" }}>
        {new URLSearchParams(search).get("id") !== null ? (
          <Tag color="cyan">
            Product: {new URLSearchParams(search).get("id")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("search") !== null ? (
          <Tag color="cyan">
            Search: {new URLSearchParams(search).get("search")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("is_bundle") !== null ? (
          <Tag color="cyan">
            isBundled: {new URLSearchParams(search).get("is_bundle")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("group1") !== null ? (
          <Tag color="cyan">
            Category Group: {new URLSearchParams(search).get("group1")}
          </Tag>
        ) : null}
        {new URLSearchParams(search).get("search") === null &&
        new URLSearchParams(search).get("id") === null &&
        new URLSearchParams(search).get("is_bundle") === null &&
        new URLSearchParams(search).get("group1") === null ? (
          <Tag color="default">None</Tag>
        ) : null}
      </div>
    </div>
  );
};
export default FilterTags;
