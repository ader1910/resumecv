import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = ({ onResumeCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle Create Resume
  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Silakan masukkan judul resume");
      return;
    }

    setError("");
    setIsLoading(true);

    //Create Resume API Call
    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if (response.data?._id) {
        // Close modal first
        onClose && onClose();

        // Refresh the resume list in parent component
        onResumeCreated && onResumeCreated();

        // Navigate to the new resume
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Ada yang salah. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[70vh] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Tambahkan Resume Baru
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Berikan judul pada resume Anda untuk memulai. Anda dapat mengedit semua
        detail nanti.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Judul Resume"
          placeholder="Contoh: Akbar Juliandi"
          type="text"
          disabled={isLoading}
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Membuat..." : "Tambahkan Resume"}
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
