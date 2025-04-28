// dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Book, VideoHeaderIcon } from "../assets";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Materials Card */}
        <Link
          to="/dashboard/materials"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <img src={Book} alt="Materials" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">O'quv Materiallari</h2>
              <p className="text-gray-600">
                Foydali darsliklar va qo'llanmalar
              </p>
            </div>
          </div>
        </Link>

        {/* Videos Card */}
        <Link
          to="/videos"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <img src={VideoHeaderIcon} alt="Videos" className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Video Darslar</h2>
              <p className="text-gray-600">Interaktiv video darslar</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
