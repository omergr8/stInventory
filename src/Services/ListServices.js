import axios from "../axiosSet";
import { notification } from "antd";
var moment = require("moment");

const Alert = (placement, type, error) => {
  if (type === "success") {
    notification.success({
      message: error,
      placement,
    });
  } else if (type === "error")
    notification.error({
      message: `Error Code: ${error.status} `,
      description: [JSON.stringify(error.data.errors)],
      placement,
    });
};
const download = (csvData, fileName) => {
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csvData]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = `${fileName}.csv`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
export function getToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  let userToken = "token";
  userToken += " ";
  userToken += token;
  const headers = {
    Authorization: userToken,
  };
  return headers;
}
export const exportList = (url, fileName) => {
  axios.get(url).then((res) => {
    const csvData = res.data;
    download(csvData, fileName);
  });
};
export const importList = (file, url) => {
  let inputFR = new FileReader();
  inputFR.readAsText(file);
  inputFR.onload = () => {
    let body = new Blob([inputFR.result], { type: "text/csv" });
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "text/csv",
          Authorization: `token ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        Alert("bottomRight", "success", "Imported Successfully");
      })
      .catch((err) => {
        Alert("bottomRight", "error", err.response);
      });
  };
};
export const getLocalUom = () => {
  const uom = JSON.parse(localStorage.getItem("meta-data"));
  return uom.uoms;
};
export const getLocalTax = () => {
  const tax = JSON.parse(localStorage.getItem("meta-data"));
  return tax.taxes;
};
export const getCategory = () => {
  const category = JSON.parse(localStorage.getItem("meta-data"));
  return category.group1s;
};
export const getCategoryName = (id) => {
  const metaData = JSON.parse(localStorage.getItem("meta-data"));
  const cat = metaData.group1s;
  const filteredCat = cat.filter((catId) => catId.id === id);
  return filteredCat[0].name;
};
export const getCategoryId = (name) => {
  const metaData = JSON.parse(localStorage.getItem("meta-data"));
  const cat = metaData.group1s;
  const filteredCat = cat.filter((catId) => catId.name === name.toString());
  return filteredCat[0].id;
};
export const dateFormatter = (value) => {
  var date = new Date(value);
  return moment(date).format("YYYY-DD-MM HH:mm");
};
export const getWarehouse = (value) => {
  const getMeta = JSON.parse(localStorage.getItem("meta-data"));
  const result = getMeta.warehouses.filter((obj) => obj.id === value);
  if (result[0] !== undefined) {
    return result[0].name;
  } else {
    return value;
  }
};
export const getAllWarehouses = () => {
  const getMeta = JSON.parse(localStorage.getItem("meta-data"));
  const result = getMeta.warehouses;
  return result;
};
export const getAllChannels = () => {
  const getMeta = JSON.parse(localStorage.getItem("meta-data"));
  const result = getMeta.channels;
  return result;
};
export const checkUserPermission = (permission, uid) => {
  const metaData = JSON.parse(localStorage.getItem("meta-data"));
  const users = metaData.users;
  const user = users.filter((user) => user.id === parseInt(uid));
  if (user[0].user_permissions !== undefined) {
    let random = user[0].user_permissions.some((per) => per === permission);
    return random;
  }
};

export const getDocumentPrefix = (value) => {
  const getMeta = JSON.parse(localStorage.getItem("meta-data"));
  const result = getMeta.document_types.filter(
    (obj) => obj.id === parseInt(value, 10)
  );

  return result[0].prefix;
};
export const queryParams = (props) => {
  let queryParams;
  if (
    props.productId !== undefined &&
    props.channelId === undefined &&
    props.trackingId === undefined &&
    props.inventorySync === undefined
  ) {
    queryParams = `&${props.productId}`;
  } else if (
    props.channelId !== undefined &&
    props.productId === undefined &&
    props.trackingId === undefined &&
    props.inventorySync === undefined
  ) {
    queryParams = `&${props.channelId}`;
  } else if (
    props.trackingId !== undefined &&
    props.productId === undefined &&
    props.channelId === undefined &&
    props.inventorySync === undefined
  ) {
    queryParams = `&${props.trackingId}`;
  } else if (
    props.inventorySync !== undefined &&
    props.productId === undefined &&
    props.trackingId === undefined &&
    props.channelId === undefined
  ) {
    queryParams = `&${props.inventorySync}`;
  } else if (
    props.productId !== undefined &&
    props.channelId !== undefined &&
    props.trackingId !== undefined &&
    props.inventorySync !== undefined
  ) {
    queryParams = `&${props.productId}&${props.channelId}&${props.trackingId}&${props.inventorySync}`;
  } else if (
    props.productId !== undefined &&
    props.channelId !== undefined &&
    props.trackingId !== undefined &&
    props.inventorySync === undefined
  ) {
    queryParams = `&${props.productId}&${props.channelId}&${props.trackingId}`;
  } else if (
    props.productId !== undefined &&
    props.channelId !== undefined &&
    props.inventorySync !== undefined &&
    props.trackingId === undefined
  ) {
    queryParams = `&${props.productId}&${props.channelId}&${props.inventorySync}`;
  } else if (
    props.productId !== undefined &&
    props.trackingId !== undefined &&
    props.inventorySync !== undefined &&
    props.channelId === undefined
  ) {
    queryParams = `&${props.productId}}&${props.trackingId}&${props.inventorySync}`;
  } else if (
    props.channelId !== undefined &&
    props.trackingId !== undefined &&
    props.inventorySync !== undefined &&
    props.productId === undefined
  ) {
    queryParams = `&${props.channelId}&${props.trackingId}&${props.inventorySync}`;
  } else if (props.productId !== undefined && props.channelId !== undefined) {
    queryParams = `&${props.productId}&${props.channelId}`;
  } else if (
    props.productId !== undefined &&
    props.inventorySync !== undefined
  ) {
    queryParams = `&${props.productId}&${props.inventorySync}`;
  } else if (
    props.trackingId !== undefined &&
    props.inventorySync !== undefined
  ) {
    queryParams = `&${props.trackingId}&${props.inventorySync}`;
  } else if (props.trackingId !== undefined && props.productId !== undefined) {
    queryParams = `&${props.trackingId}&${props.productId}`;
  } else if (props.channelId !== undefined && props.productId !== undefined) {
    queryParams = `&${props.channelId}&${props.productId}`;
  } else if (props.channelId !== undefined && props.trackingId !== undefined) {
    queryParams = `&${props.channelId}&${props.trackingId}`;
  } else if (
    props.channelId !== undefined &&
    props.inventorySync !== undefined
  ) {
    queryParams = `&${props.channelId}&${props.inventorySync}`;
  }

  if (queryParams === undefined) {
    queryParams = "";
  }
  return queryParams;
};
