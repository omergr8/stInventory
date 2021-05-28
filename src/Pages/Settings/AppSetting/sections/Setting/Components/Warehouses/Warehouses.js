import WarehouseTable from "./Components/WarehouseTable/WarehouseTable";
import ContentBar from "../../../ContentBar/ContentBar";
const Warehouses = () => {
  return (
    <div>
      <ContentBar title="Warehouse List" />
      <WarehouseTable />
    </div>
  );
};
export default Warehouses;
