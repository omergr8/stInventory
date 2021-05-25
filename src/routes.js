import AppSetting from "./Pages/Settings/AppSetting/AppSetting";
import ProductList from "./Pages/Settings/AppSetting/sections/Setting/Components/ProductListings/ProductListing";
import DefaultSettings from "./Pages/Settings/AppSetting/sections/Setting/Components/DefaultSettings/DefaultSettings";
import Warehouses from "./Pages/Settings/AppSetting/sections/Setting/Components/Warehouses/Warehouses";
import WarehouseLinks from "./Pages/Settings/AppSetting/sections/Setting/Components/WarehouseLinks/WarehouseLinks";
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
    name: "Warehouses",
    component: Warehouses,
    layout: "/dashboard",
  },
  {
    path: "/warehouselinks",
    name: "WarehouseLinks",
    component: WarehouseLinks,
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
