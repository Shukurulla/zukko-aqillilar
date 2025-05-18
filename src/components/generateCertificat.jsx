import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { FiDownload, FiEye, FiAward, FiAlertCircle } from "react-icons/fi";

const Certificate = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/student/certificate");
        setCertificate(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificate:", error);
        setError(
          error.response?.data?.message ||
            "Sertifikatni yuklashda xatolik yuz berdi"
        );
        setLoading(false);
      }
    };

    fetchCertificate();
  }, []);

  const handleDownload = () => {
    if (!certificate?.data?.downloadUrl) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = certificate.data.downloadUrl;
    link.download = "sertifikat.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Sertifikat yuklanyapti...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-red-800 text-xl font-semibold">Xatolik!</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-yellow-800 text-xl font-semibold">
            Ma'lumot topilmadi
          </h2>
          <p className="text-yellow-600">
            Sertifikat haqida ma'lumot topilmadi. Iltimos, keyinroq qayta urinib
            ko'ring.
          </p>
        </div>
      </div>
    );
  }

  // If certificate is available
  if (certificate.data?.available) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Mening Sertifikatim</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-blue-50 p-4 rounded-full">
              <FiAward className="text-blue-500 text-4xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Tabriklaymiz! Siz sertifikatga ega bo'ldingiz.
              </h2>
              <p className="text-gray-600 mb-4">
                {certificate.data.studentName} ismingiz bilan{" "}
                <span className="text-blue-600 font-medium">
                  {certificate.data.issueDate}
                </span>{" "}
                sanasida berilgan sertifikat.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Sertifikat ID: {certificate.data.certificateId}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FiDownload /> Yuklab olish
                </button>
                <button
                  onClick={togglePreview}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <FiEye /> Ko'rish
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Sertifikat</h3>
                <button
                  onClick={togglePreview}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={certificate.data.previewUrl}
                  className="w-full h-full"
                  title="Sertifikat"
                />
              </div>
              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={togglePreview}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // If certificate is not available yet
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mening Sertifikatim</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-yellow-50 p-4 rounded-full">
            <FiAlertCircle className="text-yellow-500 text-4xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Sertifikat hali mavjud emas
            </h2>
            <p className="text-gray-600 mb-4">{certificate.message}</p>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${certificate.data.completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {certificate.data.completedCount} /{" "}
                {certificate.data.totalVideos} darslar (
                {certificate.data.completionPercentage}%)
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Darslarni davom ettirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
