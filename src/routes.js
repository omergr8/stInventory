import AppSetting from "./Pages/Settings/AppSetting/AppSetting";
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
