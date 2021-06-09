import axios from "axios";
import { apiURL } from "./config";

axios.defaults.baseURL = apiURL;

if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] =
    "token " + JSON.parse(localStorage.getItem("token"));
}

export default axios;
