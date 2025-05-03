import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiLock, FiPlay } from "react-icons/fi";
import axios from "../services/api";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data } = await axios.get(`/api/${role}/lessons`);
      setVideos(data.data);
      setLoading(false);
    };
    fetchVideos();
  }, [user]);

  const statusVideo = (video) => {
    if (video.complate || video.id === 1) return <FiPlay size={24} />;
    return <FiLock size={24} />;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-gray-500 text-sm">Yuklanmoqda...</div>
        ) : (
          videos.map((video) => (
            <Link
              key={video.id}
              to={`/dashboard/videos/${video.id}`}
              className={`bg-white rounded-lg shadow-md p-6 transition-shadow ${
                video.complate || video.id === 1
                  ? "hover:shadow-lg"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (!video.complate && video.id !== 1) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <div className="w-8 h-8 flex items-center justify-center text-green-500">
                    {statusVideo(video)}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Video Kurs {video.id}
                  </h2>
                  <p className="text-gray-600">{video.title}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
