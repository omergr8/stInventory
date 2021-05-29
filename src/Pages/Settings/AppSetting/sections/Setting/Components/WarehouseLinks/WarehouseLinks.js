import WarehouseTable from "./Components/WarehouseTable/WarehouseLinksTable";
import ContentBar from "../../../ContentBar/ContentBar";

const WarehouseLink = () => {
  return (
    <div>
      <div>
        <ContentBar title="Warehouse Links" incoming="WarehouseLink" />
      </div>
      <WarehouseTable />
    </div>
  );
};
export default WarehouseLink;
