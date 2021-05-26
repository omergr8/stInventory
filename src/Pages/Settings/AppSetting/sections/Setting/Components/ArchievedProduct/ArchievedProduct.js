import ArchievedProductTable from "./Components/ArchievedProductTable/ArchievedProductTable";
import ArchievedProductFilter from "./Components/ArchievedProductFilter/ArchievedProductFilter";
import ContentBar from "../../../ContentBar/ContentBar";
import { Divider } from "antd";
const ArchievedProduct = () => {
  return (
    <div>
      <ContentBar incoming="ArchievedProduct" title="Archived Products List" />
      <div style={{ paddingTop: "20px" }}>
        <ArchievedProductFilter />
      </div>
      <Divider />
      <div>
        <ArchievedProductTable />
      </div>
    </div>
  );
};
export default ArchievedProduct;
