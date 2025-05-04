import { useState } from "react";
import {
  Computing,
  game,
  Logo,
  MoreSquare,
  Note,
  studentLogo,
  teacherLogo,
  VideoHeaderIcon,
} from "../assets";
import { useNavigate } from "react-router-dom";
import { FiX, FiHome, FiLogOut } from "react-icons/fi";
const role = localStorage.getItem("role");
const menuItems = [
  {
    title: "Video Darslar",
    path: "/dashboard",
    icon: VideoHeaderIcon,
  },

  {
    title: "Materiallar",
    icon: Note,
    path: "/dashboard/materials",
  },
  {
    title: "Flash Kartalar",
    icon: MoreSquare,
    path: "/dashboard/flash-card",
  },
  {
    title: "Flash Anzan",
    icon: Computing,
    path: "/dashboard/flash-anzan",
  },
  {
    title: "Memory Game",
    icon: game,
    path: "/dashboard/memory-game",
  },
];

const Sidebar = ({ active, onClose }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("flash-jwt");
    navigate("/");
    onClose();
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium mb-4">
              Profildan chiqmoqchimisiz?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full lg:w-auto min-h-[200px] lg:min-h-screen bg-white px-4 py-4 shadow-sm flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-6">
            <img
              src={role == "student" ? studentLogo : teacherLogo}
              alt="logo"
              className="w-[180px] lg:w-[180px]"
            />
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
                className={`flex ${
                  role == "teacher" && item.title == "Memory Game"
                    ? "hidden"
                    : ""
                }  ${
                  role == "student" && item.title == "Materiallar"
                    ? "hidden"
                    : ""
                } items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium w-full text-left transition
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
        </div>
        {/* Logo and Close Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium w-full text-left transition
                text-gray-500 hover:bg-gray-100 hover:text-gray-800 mt-auto`}
        >
          <FiLogOut size={18} color="" />
          <span>Chiqish</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
