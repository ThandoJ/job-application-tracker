import ApplyModal from "../components/ApplyModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import PostJobModal from "../components/PostJobModal";

export default function Dashboard({
  jobs = [],
  setJobs,
  applications = [],
  setApplications
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  APPLY MODAL STATE
  const [selectedJob, setSelectedJob] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  //  OPEN APPLY MODAL
  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  //  SUBMIT APPLICATION WITH FORM DATA
  const handleSubmitApplication = (formData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const newApplication = {
      jobId: selectedJob.id,
      email: user?.email,
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      cv: formData.cv?.name, // store filename
      cvBase64: formData.cvBase64,
      status: "applied",
      appliedAt: new Date().toISOString()
    };

    setApplications([newApplication, ...applications]);
    setSelectedJob(null);
  };

  // STATUS UPDATE 
  const handleStatusChange = (jobId, newStatus) => {
    const updated = applications.map((app) =>
      app.jobId === jobId ? { ...app, status: newStatus } : app
    );

    setApplications(updated);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {isAdmin ? "Admin Dashboard" : "Find Jobs"}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full mb-6 p-3 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
          >
            + Post Job
          </button>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isAdmin={isAdmin}
              applications={applications}
              onApply={() => handleApplyClick(job)} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>

      {/* APPLY MODAL */}
      <ApplyModal
        isOpen={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onSubmit={handleSubmitApplication}
      />

      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}