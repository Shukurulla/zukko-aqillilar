import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import UserService from "../services/user.service";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ activePage, page }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("flash-jwt");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/auth/login");
    }
    if (token) {
      UserService.profile(dispatch, role, navigate);
    }
  }, [activePage, page]);

  return (
    <div className="w-full h-[100vh]  overflow-hidden flex flex-col lg:flex-row">
      {/* Menu Button for Mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600"
        >
          <FiMenu size={24} />
        </button>
        <div className="text-lg font-semibold text-gray-800">{page}</div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block col-lg-2 col-md-4 col-sm-12  m-0 p-0 h-auto lg:h-full overflow-y-auto bg-white z-10 absolute lg:static  transition-all duration-300`}
      >
        <Sidebar active={page} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="col-lg-11 col-md-8 col-sm-12 h-[calc(100vh-64px)] lg:h-full overflow-y-auto pr-14">
        {activePage}
      </div>
    </div>
  );
};

export default Layout;
