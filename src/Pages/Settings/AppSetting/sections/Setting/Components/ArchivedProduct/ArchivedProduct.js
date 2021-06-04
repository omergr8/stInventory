import ArchivedProductFilter from "./Components/ArchivedProductFilter/ArchivedProductFilter";
import { Divider } from "antd";
const ArchivedProduct = () => {
  return (
    <div>
      <div style={{ paddingTop: "20px" }}>
        <ArchivedProductFilter />
      </div>
      <Divider />
    </div>
  );
};
export default ArchivedProduct;
