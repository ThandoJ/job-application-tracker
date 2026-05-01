import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import PostJobModal from "../components/PostJobModal";
import { jobs as initialJobs } from "../data/jobs";

export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-6">
        {/* 🔝 Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {isAdmin ? "Admin Dashboard" : "Find Jobs"}
            </h1>
            <p className="text-sm text-gray-500">
              Logged in as {isAdmin ? "Recruiter" : "Applicant"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            Logout
          </button>
        </div>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full mb-6 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ➕ Admin Button */}
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Post Job
          </button>
        )}

        {/* 🧾 Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} isAdmin={isAdmin} />
            ))
          ) : (
            <p className="text-gray-500">No jobs found</p>
          )}
        </div>
      </div>

      {/* 🪟 Modal */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}