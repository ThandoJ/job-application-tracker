import ApplyModal from "../components/ApplyModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import PostJobModal from "../components/PostJobModal";
import Charts from "../components/Charts";

import {
  Briefcase,
  FileText,
  Users,
  CheckCircle,
  Bell,
  Search,
  TrendingUp
} from "lucide-react";

export default function Dashboard({
  jobs = [],
  setJobs,
  applications = [],
  setApplications
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [notifications, setNotifications] = useState([
    "Welcome back 👋",
    "New applications received",
  ]);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ADD JOB
  const handleAddJob = (newJob) => {
    setJobs([newJob, ...jobs]);

    setNotifications((prev) => [
      `New job posted: ${newJob.title}`,
      ...prev
    ]);
  };

  // OPEN APPLY MODAL
  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  // SUBMIT APPLICATION
  const handleSubmitApplication = (formData) => {
    const newApplication = {
      jobId: selectedJob.id,
      email: user?.email,
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      cv: formData.cv,
      cvBase64: formData.cvBase64,
      status: "applied",
      appliedAt: new Date().toISOString()
    };

    setApplications([newApplication, ...applications]);

    setNotifications((prev) => [
      `Application submitted for ${selectedJob.title}`,
      ...prev
    ]);

    setSelectedJob(null);
  };

  // STATUS CHANGE
  const handleStatusChange = (jobId, newStatus) => {
    const updated = applications.map((app) =>
      app.jobId === jobId
        ? { ...app, status: newStatus }
        : app
    );

    setApplications(updated);

    setNotifications((prev) => [
      `Application moved to ${newStatus}`,
      ...prev
    ]);
  };

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  // STATS
  const totalJobs = jobs.length;
  const totalApps = applications.length;
  const interviews = applications.filter(
    (a) => a.status === "interview"
  ).length;

  const accepted = applications.filter(
    (a) => a.status === "accepted"
  ).length;

  // DYNAMIC %
  const applicationRate = useMemo(() => {
    if (totalJobs === 0) return 0;
    return Math.round((totalApps / totalJobs) * 100);
  }, [totalApps, totalJobs]);

  const interviewRate = useMemo(() => {
    if (totalApps === 0) return 0;
    return Math.round((interviews / totalApps) * 100);
  }, [interviews, totalApps]);

  const acceptedRate = useMemo(() => {
    if (totalApps === 0) return 0;
    return Math.round((accepted / totalApps) * 100);
  }, [accepted, totalApps]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {isAdmin
                ? "Recruiter Dashboard"
                : "Find Your Dream Job"}
            </h1>

            <p className="text-slate-400 mt-2">
              Track jobs, applications and recruitment activity
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* NOTIFICATIONS */}
            <div className="relative">
              <button className="bg-white/10 backdrop-blur-lg border border-white/10 p-3 rounded-2xl hover:bg-white/20 transition">
                <Bell size={20} />
              </button>

              <div className="absolute -top-1 -right-1 bg-blue-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.length}
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl transition font-medium shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {/* TOTAL JOBS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-blue-500/20 p-3 rounded-2xl">
                <Briefcase className="text-blue-400" />
              </div>

              <span className="text-green-400 text-sm flex items-center gap-1">
                <TrendingUp size={14} />
                +12%
              </span>
            </div>

            <h2 className="text-slate-400 text-sm">
              Total Jobs
            </h2>

            <p className="text-3xl font-bold mt-1">
              {totalJobs}
            </p>
          </div>

          {/* APPLICATIONS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-purple-500/20 p-3 rounded-2xl">
                <FileText className="text-purple-400" />
              </div>

              <span className="text-green-400 text-sm">
                {applicationRate}%
              </span>
            </div>

            <h2 className="text-slate-400 text-sm">
              Applications
            </h2>

            <p className="text-3xl font-bold mt-1">
              {totalApps}
            </p>
          </div>

          {/* INTERVIEWS */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-yellow-500/20 p-3 rounded-2xl">
                <Users className="text-yellow-400" />
              </div>

              <span className="text-green-400 text-sm">
                {interviewRate}%
              </span>
            </div>

            <h2 className="text-slate-400 text-sm">
              Interviews
            </h2>

            <p className="text-3xl font-bold mt-1">
              {interviews}
            </p>
          </div>

          {/* ACCEPTED */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-green-500/20 p-3 rounded-2xl">
                <CheckCircle className="text-green-400" />
              </div>

              <span className="text-green-400 text-sm">
                {acceptedRate}%
              </span>
            </div>

            <h2 className="text-slate-400 text-sm">
              Accepted
            </h2>

            <p className="text-3xl font-bold mt-1">
              {accepted}
            </p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="mb-8">
          <Charts applications={applications} />
        </div>

        {/* SEARCH + POST */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* POST JOB */}
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-2xl font-semibold shadow-xl hover:scale-[1.02] transition"
            >
              + Post Job
            </button>
          )}
        </div>

        {/* JOB GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

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

        {/* EMPTY */}
        {filteredJobs.length === 0 && (
          <div className="bg-white/10 border border-white/10 rounded-3xl p-10 text-center mt-10">
            <h2 className="text-xl font-semibold mb-2">
              No jobs found
            </h2>

            <p className="text-slate-400">
              Try searching for another role
            </p>
          </div>
        )}
      </div>

      {/* APPLY MODAL */}
      <ApplyModal
        isOpen={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onSubmit={handleSubmitApplication}
      />

      {/* POST JOB MODAL */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}