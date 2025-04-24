import React, { useState } from "react";
import { Logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const { isLoading } = useSelector((state) => state.user);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [level, setLevel] = useState("");
  const [school, setSchool] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = () => {
    UserService.register(
      dispatch,
      {
        firstname,
        lastname,
        level,
        school,
        login,
        password,
      },
      navigate
    );
  };

  return (
    <div>
      <header className="py-4 container">
        <img src={Logo} alt="" />
      </header>
      <main className="w-100 flex justify-center py-5">
        <div className="bg-[#fff] border-[2px] border-[#E5E7EB] p-6 rounded-lg w-full max-w-md">
          {/* Ism */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Ism*</label>
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Familiya */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">
              Familiya*
            </label>
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Nechinchi klass */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">
              Nechinchi klass*
            </label>
            <input
              type="text"
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Qaysi maktab */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">
              Qaysi maktab*
            </label>
            <input
              type="text"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Login */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Login*</label>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Parol */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2 block">Parol*</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white text-gray-800 p-2 px-3 rounded-md border border-[#E5E7EB] focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Link */}
          <Link to={"/auth/login"} className="text-blue-500">
            Sizda account bormi?
          </Link>
          {/* Registratsiya button */}
          <button
            onClick={() => registerHandler()}
            disabled={isLoading}
            className="w-full mt-3 bg-blue-600 text-white text-lg font-semibold py-2 rounded-full hover:bg-blue-700 transition"
          >
            {isLoading ? "Yuborilmoqda" : "Registratsiya"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Register;
