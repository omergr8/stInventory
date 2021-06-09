/**
 * Created by ankit on 14/12/13.
 */
export const appUrls = {
  //USERS
  LOGIN: "/users/login/",
  STAFF_LOGIN: "users/login/staff/",
  LOGOUT: "users/logout/",
  FORGOT_PASSWORD_LINK: "users/password/forgot/",
  RESET_PASSWORD: "users/password/reset/",
  USERS: "/users/",
  USER_INVITATIONS: "users/invitations/",
  SEND_USER_INVITATION: "users/send/invitation/",
  RESEND_USER_INVITATION: "users/invitations/resend/",
  ACCEPT_USER_INVITATION: "users/accept/invitation/",

  //SETTINGS
  METADATA: "/settings/metadata/",
  TAXES: "/settings/taxes/",
  PAYMENT_MODES: "settings/payment_modes/",
  SET_USER_SETTING: "settings/set/",
  DEFAULT_SETTINGS: "/settings/defaults/",
  WAREHOUSES: "/settings/warehouses/",
  DOCUMENT_TYPES: "/settings/documents/types/",
  PRINT_CONFIG: "/settings/documents/print/configs/",
  DOCUMENT_NUMBER: "settings/documents/types/edit_number/",
  CLIENT_SETTINGS: "settings/client/settings/",
  CREDENTIALS: "settings/credentials/",
  GET_SETTINGS: "settings/client/settings/",
  SET_SETTINGS: "settings/client/settings/set/",

  //PRODUCTS
  PRODUCTS: "/products/",
  PRODUCT_TAGS: "products/tags/",
  BULK_UPDATE_PRODUCTS: "products/bulk/update/",
  BULK_ARCHIVE_PRODUCTS: "products/bulk/archive/",
  BULK_UNDO_ARCHIVE_PRODUCTS: "/products/bulk/undo-archive/",
  BULK_DELETE_PRODUCTS: "/products/bulk/delete/",
  ALIVE_PRODUCTS: "products/?paginate=False&is_archived=False",
  PRODUCT_GROUP1: "/products/groups/1/",
  PRODUCT_GROUP1_IMPORT: "/products/groups/1/import/",
  BUNDLES: "products/bundles/",
  BUNDLE_LINES: "products/bundles/lines/",
  BUNDLES_IMPORT: "products/bundles/import/",
  BUNDLES_STOCK_REPORT: "products/reports/bundles/stock/",
  PRODUCT_PACK_SIZES: "/products/pack_sizes/",
  PRODUCT_COUNTS: "products/reports/counts/",

  //CONTACTS
  CONTACTS: "contacts/",
  ADDRESSES: "/contacts/addresses/",

  WRITE_OFF_TYPES: "operations/stock/write/offs/types/",
  ADDITION_TYPES: "operations/stock/additions/types/",
  PURCHASE_ORDER: "purchases/orders/",
  PURCHASE_RETURN: "purchases/returns/",
  GRN: "purchases/grns/",
  PERFORM_ACTION: "perform_action/",
  PERFORM_BULK_ACTION: "perform_action/bulk/",

  // operations
  WRITE_OFF: "operations/stock/write/offs/",
  WRITE_OFF_IMPORT: "operations/import/write_off/",
  WRITE_OFF_LINES: "operations/stock/write/offs/lines/",
  ADDITION: "operations/stock/additions/",
  ADDITION_IMPORT: "operations/import/addition/",
  ADDITION_LINES: "operations/stock/additions/lines/",
  SET_STOCK: "operations/set_stocks/",
  SET_STOCK_IMPORT: "operations/import/set_stock/",
  SET_STOCK_LINES: "operations/set_stocks/lines/",
  STOCK_TRANSFER: "operations/stock/transfers/",
  STOCK_TRANSFER_IMPORT: "operations/import/stock_transfer/",
  STOCK_TRANSFER_LINES: "operations/stock/transfers/lines/",
  STOCK_LEVELS: "stock/levels/",
  EMAIL_STOCK_LEVELS: "stock/levels/email/",
  STOCK_LOGS: "stock/logs/",
  STOCK_SNAPSHOT: "stock/logs/snapshot/",
  UNDO_ARCHIVE: "undo-archive/",
  IMPORT_STOCK_FROM_SHOPIFY: "ecom/settings/channels/shopify/set_inventory/",

  // REPORTS
  DASHBOARD_SUMMARY: "dashboard/daily/summary/",
  STOCK_OUTS: "stock/outs/",
  STOCK_LEVELS_REPORT: "stock/reports/levels/",
  SALES_REPORT: "sales/reports/",
  PURCHASES_REPORT: "purchases/reports/",
  PO_VS_GRN_REPORT: "purchases/reports/grns/compare_po_rates/",
  CHANGE_PASSWORD: "users/password/change/",
  SET_WAREHOUSE_LIST: "users/set/warehouse_list/",
  IMPORT: "import/",

  // ECOM URLS
  //settings
  FULFILLMENT_RULES: "ecom/settings/fulfillment/rules/",
  FULFILLMENT_RULES_DELETE: "ecom/settings/fulfillment/rules/bulk/delete/",
  CHANNELS: "ecom/settings/channels/",
  HARD_REFRESH_INVENTORY: "/ecom/settings/channels/hard_refresh_inventory/",
  SYNC_PRODUCTS: "/ecom/settings/channels/sync_products/",
  PRODUCT_LINKS: "/ecom/settings/channels/products/links/",
  PRODUCT_LINKS_IMPORT: "/ecom/settings/channels/products/links/import/",
  WAREHOUSE_LINKS: "/ecom/settings/channels/warehouses/links/",
  SHIPMENT_CARRIERS: "carriers/",
  INVENTORY_RULES: "ecom/settings/inventory/rules/",
  EBAY_AUTH_URL: "ecom/settings/channels/ebay/auth/get_auth_url/",
  ETSY_AUTH_URL: "ecom/settings/channels/etsy/auth/get_auth_url/",
  WOOCOMMERCE_AUTH_URL: "ecom/settings/channels/woocommerce/auth/get_auth_url/",
  //billing
  BILLING_PLANS: "/settings/billing/plans/",
  SUBSCRIPTION: "settings/billing/subscription/",
  CREATE_RECURRING_CHARGE:
    "ecom/settings/channels/shopify/billing/recurring_charges/create/",
  CANCEL_RECURRING_CHARGE:
    "ecom/settings/channels/shopify/billing/recurring_charges/cancel/",
  CURRENT_RECURRING_CHARGE:
    "ecom/settings/channels/shopify/billing/recurring_charges/current/",
  CREATE_USAGE_CHARGE:
    "ecom/settings/channels/shopify/billing/recurring_charges/create/usage_charge/",
  LIST_USAGE_CHARGE: "ecom/settings/channels/shopify/billing/usage_charges/",
  CREDIT_BALANCE: "ecom/settings/credit_balance/",
  //shopify
  SHOPIFY_LOCATIONS: "/ecom/settings/channels/shopify/locations/",
  SHOPIFY_CONNECT: "ecom/settings/channels/shopify/connect/",
  // ebay
  EBAY_INVENTORY_ITEM_UPDATE:
    "ecom/settings/channels/ebay/inventory_item/update/",
  EBAY_INVENTORY_OFFER_UPDATE:
    "ecom/settings/channels/ebay/inventory_item/offer/update/",
  //bulk
  REFRESH_PRODUCT_LINKS: "ecom/orders/refresh_product_links/",
  //orders
  ORDERS: "ecom/orders/",
  ORDERLINES: "ecom/orders/lines/",
  CHANNEL_ACTIONS_URL: "ecom/settings/channels/",
  CREATE_FULFILLMENT_ORDER: "ecom/orders/create_fulfillment_order/",
  //fulfillment
  FULFILLMENT_ORDER: "ecom/fulfillment/orders/",
  //ecom reports
  ORDERS_DAILY_SUMMARY: "ecom/reports/daily/summary/",
  PRODUCTS_DAILY_SUMMARY: "products/reports/summary/",
  ORDERLINES_REPORT: "ecom/reports/orders/lines/",
  ORDER_STATUS_REPORT: "ecom/reports/orders/status/",
  BUNDLE_COMPONENT_SALES: "ecom/reports/fo/components/lines/",
  MONTHLY_STOCK_REPORT: "stock/reports/files/",
  PRODUCT_SALES_REPORT: "ecom/reports/products/sales/",
};
