import axios from "../services/api";
import { FiCheck, FiClock, FiLock, FiList, FiX } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingVideo, setCompletingVideo] = useState(false);
  const [isVideoListOpen, setIsVideoListOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const role = localStorage.getItem("role");
  const { id } = useParams();
  const navigate = useNavigate();
  const currentVideoId = parseInt(id, 10) || 1;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/${role}/lessons`);
        setVideos(data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Videolarni yuklashda xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [role]);

  const handleNextLesson = async () => {
    try {
      setCompletingVideo(true);

      // First, mark the current video as completed
      await axios.post(`/api/${role}/lesson/complate/${currentVideoId}`);

      // Update the local state to show the video as completed
      const updatedVideos = videos.map((video) =>
        video.id === currentVideoId ? { ...video, complate: true } : video
      );
      setVideos(updatedVideos);

      // Find the current video's index
      const currentIndex = videos.findIndex(
        (video) => video.id === currentVideoId
      );

      // If there's a next video, navigate to it without page reload
      if (currentIndex < videos.length - 1) {
        toast.success("Dars muvaffaqiyatli yakunlandi!");
        navigate(`/dashboard/videos/${videos[currentIndex + 1].id}`, {
          replace: true,

        });
        
      }
      setTimeout(() => {
        window.location.reload()
      }, 100)
      setCompletingVideo(false);
    } catch (error) {
      console.error("Error completing lesson:", error);
      toast.error("Darsni yakunlashda xatolik");
      setCompletingVideo(false);
    }
  };

  // Handle course completion - show when user is on the last video
  const handleCompleteCourse = async () => {
    try {
      setCompletingVideo(true);

      // Mark the final video as complete
      const response = await axios.post(
        `/api/${role}/lesson/complate/${currentVideoId}`
      );

      // Update the local state
      const updatedVideos = videos.map((video) =>
        video.id === currentVideoId ? { ...video, complate: true } : video
      );
      setVideos(updatedVideos);

      // Show success message
      toast.success("Tabriklaymiz! Siz kursni muvaffaqiyatli yakunladingiz!");

      // Navigate to certificate page for students or dashboard for teachers
      if (role === "student") {
        navigate("/dashboard/certificate");
      } else {
        navigate("/dashboard");
      }

      setCompletingVideo(false);
    } catch (error) {
      console.error("Error completing course:", error);
      toast.error("Kursni yakunlashda xatolik");
      setCompletingVideo(false);
    }
  };

  const currentVideo = videos.find((video) => video.id === currentVideoId);
  const isLastVideo = currentVideoId === videos.length;

  const statusVideo = (video) => {
    if (video.complate) return <FiCheck size={16} />;
    if (video.id === currentVideoId) return <FiClock size={16} />;
    return <FiLock size={16} />;
  };

  return (
    <div className="w-full pr-10 min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-x-hidden">
      {/* Main Content */}
      <div className="flex-1 p-3 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold">
            Video Kurs {currentVideo?.id}
          </h2>
          <button
            onClick={() => setIsVideoListOpen(!isVideoListOpen)}
            className="lg:hidden p-1 rounded-full bg-blue-500 text-white"
          >
            <FiList size={16} />
          </button>
        </div>
        <div className="bg-white rounded-lg p-2 mb-2 flex justify-center items-center h-[200px] lg:h-[450px]">
          {loading ? (
            <div className="text-gray-500 text-sm">Yuklanmoqda...</div>
          ) : currentVideo ? (
            <video controls className="w-full h-full object-contain">
              <source src={currentVideo?.link} />
            </video>
          ) : (
            <div className="text-gray-500 text-sm">Video topilmadi</div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-2">
          {currentVideo?.description}
        </p>
        <div className="flex justify-end mt-auto">
          {isLastVideo ? (
            // Show "Complete Course" button for the last video
            <button
              onClick={handleCompleteCourse}
              disabled={completingVideo}
              className={`px-3 py-1 rounded-lg text-sm text-white ${
                completingVideo
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {completingVideo ? "Yakunlanmoqda..." : "Kursni yakunlash"}
            </button>
          ) : (
            // Show "Next Lesson" button for other videos
            <button
              onClick={handleNextLesson}
              disabled={completingVideo}
              className={`px-3 py-1 rounded-lg text-sm text-white ${
                completingVideo
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {completingVideo ? "Saqlanmoqda..." : "Keyingi darsga o'tish"}
            </button>
          )}
        </div>
      </div>

      {/* Video List (Toggleable on Mobile, Fixed on Desktop) */}
      <div
        className={`${
          isVideoListOpen ? "block" : "hidden"
        } lg:block lg:w-60 bg-white h-auto lg:h-[95vh] mt-0 lg:mt-3 rounded-lg p-3 overflow-y-auto absolute lg:static w-3/4 lg:w- top-0 right-0 z-10 shadow-lg lg:shadow-none transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-2 lg:hidden">
          <h3 className="text-base font-semibold">Video Darslar</h3>
          <button
            onClick={() => setIsVideoListOpen(false)}
            className="p-1 rounded-full bg-gray-200"
          >
            <FiX size={16} />
          </button>
        </div>
        {videos.map((video) => (
          <div
            key={video.id}
            className={`flex items-center justify-between p-2 mb-2 rounded-xl cursor-pointer ${
              video.id === currentVideoId
                ? "border-[1px] border-blue-500"
                : video.complate || video.id === 1
                ? "bg-gray-50"
                : "bg-gray-50 opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (video.complate || video.id === 1) {
                navigate(`/dashboard/videos/${video.id}`);
                setIsVideoListOpen(false);
              }
            }}
          >
            <div>
              <p className="text-sm font-medium">Video Kurs {video.id}</p>
              <p className="text-xs text-gray-500">{video.title}</p>
            </div>
            <div className="w-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
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
