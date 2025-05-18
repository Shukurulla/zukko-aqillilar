import axios from "axios";

axios.defaults.baseURL = "http://localhost:7777";
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("flash-jwt")
    ? localStorage.getItem("flash-jwt")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
