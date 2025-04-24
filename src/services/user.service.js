import toast from "react-hot-toast";
import {
  getuserFailure,
  getUserStart,
  getUserSuccess,
} from "../slices/user.slice";
import axios from "./api";

const UserService = {
  async register(dispatch, userData, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.post("/api/user/sign", userData);
      if (data.data.token) {
        localStorage.setItem("flash-jwt", data.data.token);
      }
      dispatch(getUserSuccess(data.data.user));
      toast.success("Tizimga muaffaqiyatli kirildi");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getuserFailure());
    }
  },
  async login(dispatch, userData, navigate) {
    dispatch(getUserStart());
    try {
      const { data } = await axios.post("/api/user/login", userData);
      if (data.data.token) {
        localStorage.setItem("flash-jwt", data.data.token);
      }
      dispatch(getUserSuccess(data.data.user));
      toast.success("Tizimga muaffaqiyatli kirildi");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(getuserFailure());
    }
  },
};

export default UserService;
