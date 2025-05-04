import React, { useState } from "react";
import { Download } from "../assets";
import { FiFile } from "react-icons/fi";
import { materials } from "../constants";

const Materials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleViewClick = (item) => {
    if (item.type === "pptx") {
      setSelectedMaterial(item);
      setIsWarningModalOpen(true);
    } else {
      setSelectedMaterial(item);
      setIsModalOpen(true);
    }
  };

  const handleDownload = (item) => {
    const link = document.createElement("a");
    link.href = item.link;
    link.download = item.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsWarningModalOpen(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="row h-[100vh] container py-5">
      {materials.map((item, index) => (
        <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="p-4 px-3 sm:p-4 bg-white rounded-lg shadow-md">
            <div className="image flex items-center justify-center m-auto w-32 h-32 sm:w-40 sm:h-40">
              <FiFile size={100} color="#255ED6" />
            </div>
            <div className="text-2xl font-[600] text-[#444] p-2">
              {item.title}
            </div>
            <div className="grid gap-2 sm:gap-3 grid-cols-5">
              <div className="col-span-4 flex">
                <button
                  onClick={() => handleViewClick(item)}
                  className="w-full py-1.5 text-center sm:py-2 px-4 sm:px-8 text-sm sm:text-lg bg-[#255ED6] text-white rounded-full hover:bg-[#1e4bb7] transition-colors"
                >
                  Ko'rish
                </button>
              </div>
              <button
                onClick={() => handleDownload(item)}
                className="w-10 h-10 sm:w-12 sm:h-12 border-[2px] sm:border-[3px] flex items-center justify-center border-[#255ED6] rounded-full transition-colors"
              >
                <img
                  src={Download}
                  className="w-5 sm:w-6"
                  alt="Download icon"
                />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* PDF View Modal */}
      {isModalOpen && selectedMaterial && (
        <div className="fixed inset-0 bg-[#00000077] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[85%]  h-[100%] max-h-[1000px] p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#444]">
                {selectedMaterial.title}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(selectedMaterial)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#255ED6] text-white rounded-lg hover:bg-[#1e4bb7] transition-colors"
                >
                  <img src={Download} className="w-5" alt="Download icon" />
                  <span className="hidden sm:inline">Yuklab olish</span>
                </button>
                <button
                  onClick={closeModal}
                  className="text-2xl font-bold text-[#444] hover:text-[#255ED6] transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={selectedMaterial.link}
                className="w-full h-full"
                title={selectedMaterial.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* PPTX Warning Modal */}
      {isWarningModalOpen && selectedMaterial && (
        <div className="fixed inset-0 bg-[#00000077] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-[90%] shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-[#444]">
              Ogohlantirish
            </h2>
            <p className="mb-6 text-gray-600">
              PPTX fayllarni brauzerda ko'rish imkonsiz. Faylni yuklab olishni
              xohlaysizmi?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Yopish
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedMaterial);
                  closeModal();
                }}
                className="px-4 py-2 bg-[#255ED6] text-white rounded-lg hover:bg-[#1e4bb7] transition-colors"
              >
                Yuklab olish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
