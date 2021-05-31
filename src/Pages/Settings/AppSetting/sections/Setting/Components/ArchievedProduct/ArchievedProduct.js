import ArchievedProductFilter from "./Components/ArchievedProductFilter/ArchievedProductFilter";
import { Divider } from "antd";
const ArchievedProduct = () => {
  return (
    <div>
      <div style={{ paddingTop: "20px" }}>
        <ArchievedProductFilter />
      </div>
      <Divider />
    </div>
  );
};
export default ArchievedProduct;
