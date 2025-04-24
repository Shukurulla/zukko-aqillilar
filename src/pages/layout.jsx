import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";

const Layout = ({ activePage, page }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("flash-jwt");
    if (!token) {
      navigate("/auth/login");
    }
  }, [activePage, page]);
  return (
    <div className="w-100 h-[100vh] overflow-hidden">
      <div className="row">
        <div className="col-lg-2 col-md-4 col-sm-12">
          <Sidebar active={page} />
        </div>
        <div className="col-lg-10 col-md-8 col-sm-12">{activePage}</div>
      </div>
    </div>
  );
};

export default Layout;
