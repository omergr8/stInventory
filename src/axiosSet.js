import axios from "axios";
import { apiURL } from "./config";

axios.defaults.baseURL = apiURL;
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] =
    "token " + JSON.parse(localStorage.getItem("token"));
}
axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use((res) => {
  if (res.data && res.data.token) {
    axios.defaults.headers.common["Authorization"] = "token " + res.data.token;
  }
  return res;
});
export default axios;
