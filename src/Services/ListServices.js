import axios from "axios";

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
  const headers = getToken();
  axios.get(url, { headers }).then((res) => {
    const csvData = res.data;
    download(csvData, fileName);
  });
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
  return queryParams;
};
