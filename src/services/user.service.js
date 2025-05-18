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
      // Determine the endpoint based on user type
      const endpoint =
        userData.type === "student" ? "/api/student/sign" : "/api/teacher/sign";

      const { data } = await axios.post(endpoint, userData);

      if (data.data.token) {
        localStorage.setItem("flash-jwt", data.data.token);
        localStorage.setItem("role", data.data.user.role);
      }

      dispatch(getUserSuccess(data.data.user));
      toast.success("Ro'yxatdan muvaffaqiyatli o'tildi");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
      dispatch(getuserFailure());
    }
  },

  async login(dispatch, userData, navigate) {
    dispatch(getUserStart());
    try {
      // For login, we can use a single endpoint that handles both types
      const { data } = await axios.post("/api/user/login", userData);
      console.log(data);
      if (data.data.token) {
        localStorage.setItem("flash-jwt", data.data.token);
        localStorage.setItem("role", data.data.user.role);
      }

      dispatch(getUserSuccess(data.data.user));
      toast.success("Tizimga muaffaqiyatli kirildi");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
      dispatch(getuserFailure());
    }
  },
  async profile(dispatch, role, navigate) {
    dispatch(getUserStart());
    try {
      // For login, we can use a single endpoint that handles both types
      const { data } = await axios.get(`/api/${role}/profile`);

      dispatch(getUserSuccess(data.data.user));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
      navigate("/auth/login");
      dispatch(getuserFailure());
    }
  },
};

export default UserService;
