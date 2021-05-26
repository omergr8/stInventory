import ProductCategoryTable from "./Components/ProductCategoryTable/ProductCategoryTable";
import ContentBar from "../../../ContentBar/ContentBar";
const ProductCategory = () => {
  return (
    <div>
      <ContentBar incoming="ProductCategory" title="Product Categories" />
      <ProductCategoryTable />
    </div>
  );
};
export default ProductCategory;
