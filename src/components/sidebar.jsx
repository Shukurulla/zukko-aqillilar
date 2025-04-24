import { useState } from "react";
import { Computing, Logo, MoreSquare, Note, VideoHeaderIcon } from "../assets";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

const menuItems = [
  {
    title: "Video Kurs",
    icon: VideoHeaderIcon,
    path: "/dashboard",
  },
  {
    title: "Materiallar",
    icon: Note,
    path: "/dashboard/materials",
  },
  {
    title: "Flash Kartalar",
    icon: MoreSquare,
    path: "/flash-card",
  },
  {
    title: "Flash Anzan",
    icon: Computing,
    path: "/flash-anzan",
  },
];

const Sidebar = ({ active, onClose }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-full lg:w-auto min-h-[200px] lg:min-h-screen bg-white px-4 py-4 shadow-sm flex flex-col">
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between mb-6">
        <img src={Logo} alt="logo" className="w-[100px] lg:w-[130px]" />
        <button onClick={onClose} className="lg:hidden text-gray-600">
          <FiX size={24} />
        </button>
      </div>

      {/* Menu items */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium w-full text-left transition
              ${
                active === item.title
                  ? "bg-gray-100 text-[#1D2B53]"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-5 h-5 object-contain"
            />
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
