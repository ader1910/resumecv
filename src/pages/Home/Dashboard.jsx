import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { CirclePlus } from "lucide-react";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const handleResumeCreated = () => {
    // Refresh the resume list when a new resume is created
    fetchAllResumes();
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-purple-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/50 hover:bg-purple-50/5 cursor-pointer transition-all duration-300 group"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 dark:bg-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
            <CirclePlus className="text-xl text-purple-600 dark:text-purple-400" />
          </div>

          <h3 className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Tambahkan Resume Baru</h3>
        </div>

        {allResumes?.map((resume, index) => (
          <ResumeSummaryCard
            key={resume?._id || `resume-${index}`}
            imgUrl={resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume?.updatedAt
                ? moment(resume.updatedAt).format("Do MMM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div>

      <Modal isOpen={openCreateModal} onClose={handleCloseModal} hideHeader>
        <div>
          <CreateResumeForm
            onResumeCreated={handleResumeCreated}
            onClose={handleCloseModal}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
