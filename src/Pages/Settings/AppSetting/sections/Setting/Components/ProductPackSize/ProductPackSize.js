import ProductSizeTable from "./Components/ProductSizeTable/ProductSizeTable";
import ContentBar from "../../../ContentBar/ContentBar";
import ProductSizeFilter from "./Components/ProductSizeFilter/ProductSizeFilter";
import { Divider } from "antd";
const ProductPackSize = () => {
  return (
    <div>
      <ContentBar incoming="ProductPackSize" title="Pack Size List" />
      <div style={{ marginTop: "10px" }}>
        <ProductSizeFilter />
      </div>
      <Divider />
      <ProductSizeTable />
    </div>
  );
};
export default ProductPackSize;
