import TaxTable from "./Components/TaxTable/TaxTable";
import ContentBar from "../../../ContentBar/ContentBar";
const TaxList = () => {
  return (
    <div>
      <div>
        <ContentBar title="Taxes List" />
      </div>
      <TaxTable />
    </div>
  );
};
export default TaxList;
