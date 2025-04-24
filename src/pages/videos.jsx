import axios from "../services/api";
import { FiCheck, FiClock, FiLock } from "react-icons/fi";
import React, { useState, useEffect } from "react";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/user/lessons");
      console.log(data.data);

      setVideos(data.data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const handleNextLesson = async () => {
    const currentIndex = videos.findIndex(
      (video) => video.id === currentVideoId
    );
    if (currentIndex < videos.length - 1) {
      const updatedVideos = [...videos];
      updatedVideos[currentIndex].complate = true;
      setVideos(updatedVideos);
      setCurrentVideoId(videos[currentIndex + 1].id);
    }
    const { data } = await axios.post(
      `/api/user/lesson/complate/${currentVideoId}`
    );
    console.log(data);
  };

  const currentVideo = videos.find((video) => video.id === currentVideoId);

  const statusVideo = (video) => {
    if (video.complate) return <FiCheck size={24} />;
    if (video.id === currentVideoId) return <FiClock size={24} />;
    return <FiLock size={24} />;
  };

  return (
    <div className="row min-h-screen w-[100%] bg-gray-100">
      {/* Main Content */}
      <div className="col-lg-9 col-md-9 col-sm-12 p-6 flex flex-col justify-between">
        <div>
          <div className="bg-white rounded-lg p-4 mb-4 flex justify-center items-center h-[600px]">
            {loading ? (
              ""
            ) : (
              <video controls className="w-100 h-100">
                <source src={currentVideo.link} />
              </video>
            )}
          </div>
          <h2 className="text-lg font-semibold">
            Video Kurs {currentVideo?.id}
          </h2>
          <p className="text-gray-600">{currentVideo?.description}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleNextLesson}
            disabled={currentVideoId === videos.length}
            className={`px-4 py-2 rounded-lg text-white ${
              currentVideoId === videos.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Keyingi darsga o'tish
          </button>
        </div>
      </div>
      {/* Sidebar */}
      <div className="col-lg-3 col-md-3 col-sm-12 bg-white h-[95vh] mt-4 rounded-lg p-4 overflow-y-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex 
 items-center justify-between p-4 mb-3 rounded-2xl cursor-pointer ${
   video.id === currentVideoId
     ? "border-[2px] border-blue-500"
     : video.complate || video.id === 1
     ? "bg-gray-50"
     : "bg-gray-50 opacity-50 cursor-not-allowed"
 }`}
            onClick={() => {
              if (video.complate || video.id === 1) {
                setCurrentVideoId(video.id);
              }
            }}
          >
            <div>
              <p className="text-lg  font-medium">Video Kurs {video.id}</p>
              <p className="text-sm text-gray-500">{video.title}</p>
            </div>
            <div className="w-7">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
                {statusVideo(video)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
