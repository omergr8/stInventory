import AppSetting from "./Pages/Settings/AppSetting/AppSetting";
import ProductList from "./Pages/Settings/AppSetting/sections/Setting/Components/ProductListings/ProductListing";
import DefaultSettings from "./Pages/Settings/AppSetting/sections/Setting/Components/DefaultSettings/DefaultSettings";
import Warehouses from "./Pages/Settings/AppSetting/sections/Setting/Components/Warehouses/Warehouses";
import WarehouseDetails from "./Pages/Settings/AppSetting/sections/Setting/Components/Warehouses/Components/WarehouseDetails/WarehouseDetails";
import WarehouseLinks from "./Pages/Settings/AppSetting/sections/Setting/Components/WarehouseLinks/WarehouseLinks";
import TaxList from "./Pages/Settings/AppSetting/sections/Setting/Components/TaxList/TaxList";
import ProductCategory from "./Pages/Settings/AppSetting/sections/Setting/Components/ProductCategory/ProductCategory";
import ProductPackSize from "./Pages/Settings/AppSetting/sections/Setting/Components/ProductPackSize/ProductPackSize";
import ArchievedProduct from "./Pages/Settings/AppSetting/sections/Setting/Components/ArchievedProduct/ArchievedProduct";
import User from "./Pages/Settings/User/User";
import Billing from "./Pages/Settings/ShopifyBilling/ShopifyBilling";
let adminDashboardRoutes = [];

adminDashboardRoutes = [
  {
    path: "/setting",
    name: "AppSetting",
    component: AppSetting,
    layout: "/dashboard",
  },
  {
    path: "/product-listing",
    name: "DataTable",
    component: ProductList,
    layout: "/dashboard",
  },
  {
    path: "/default-setting",
    name: "DefaultSettings",
    component: DefaultSettings,
    layout: "/dashboard",
  },
  {
    path: "/warehouses",
    name: "warehouses",
    component: Warehouses,
    layout: "/dashboard",
  },
  {
    path: "/warehouselinks",
    name: "warehouseLinks",
    component: WarehouseLinks,
    layout: "/dashboard",
  },
  {
    path: "/tax-list",
    name: "taxList",
    component: TaxList,
    layout: "/dashboard",
  },
  {
    path: "/product-category",
    name: "productcategory",
    component: ProductCategory,
    layout: "/dashboard",
  },
  {
    path: "/product-pack-size",
    name: "productpackpize",
    component: ProductPackSize,
    layout: "/dashboard",
  },
  {
    path: "/archieved-product",
    name: "archievedroduct",
    component: ArchievedProduct,
    layout: "/dashboard",
  },
  {
    path: "/warehouse/edit/:id",
    name: "warehousedetail",
    component: WarehouseDetails,
    layout: "/dashboard",
  },
  {
    path: "/user",
    name: "user",
    component: User,
    layout: "/dashboard",
  },
  {
    path: "/billing/shopify",
    name: "billingShopify",
    component: Billing,
    layout: "/dashboard",
  },
];

export default adminDashboardRoutes;
