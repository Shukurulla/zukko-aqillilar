import axios from "axios";

axios.defaults.baseURL = "https://zukko-server.vercel.app/";
axios.interceptors.request.use((option) => {
  const token = localStorage.getItem("flash-jwt")
    ? localStorage.getItem("flash-jwt")
    : "";
  option.headers.Authorization = `Bearer ${token}`;
  return option;
});
export default axios;
