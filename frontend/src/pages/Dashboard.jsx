
import ApplyModal from "../components/ApplyModal";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import PostJobModal from "../components/PostJobModal";
import Charts from "../components/Charts";
import NotificationBell from "../components/NotificationBell";

import {
  Briefcase,
  FileText,
  Users,
  CheckCircle,
  TrendingUp
} from "lucide-react";

import {
  createJob,
  deleteJob,
  editJob
} from "../api/jobApi";

import {
  createApplication,
  updateApplicationStatus
} from "../api/applicationApi";

export default function Dashboard({
  jobs = [],
  setJobs,
  applications = [],
  setApplications
}) {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState(null);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  const isAdmin =
    user?.role === "admin";

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  // ADD JOB
  const handleAddJob = async (
    newJob
  ) => {

    try {

      const createdJob =
        await createJob(
          newJob,
          token
        );

      setJobs([
        createdJob,
        ...jobs
      ]);

      setIsModalOpen(false);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create job"
      );
    }
  };

  // OPEN APPLY MODAL
  const handleApplyClick = (
    job
  ) => {
    setSelectedJob(job);
  };

  // SUBMIT APPLICATION
  const handleSubmitApplication =
    async (formData) => {

      try {

        const currentUser =
          JSON.parse(
            localStorage.getItem("user")
          );

        const newApplication = {
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          company: selectedJob.company,
          email: currentUser?.email,
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          cv: formData.cv,
          cvBase64:
            formData.cvBase64,
          status: "applied",
          appliedAt:
            new Date().toISOString()
        };

        const createdApplication =
          await createApplication(
            newApplication,
            token
          );

        setApplications([
          createdApplication,
          ...applications
        ]);

        setSelectedJob(null);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to submit application"
        );
      }
    };

  // STATUS CHANGE
  const handleStatusChange =
    async (
      applicationId,
      newStatus
    ) => {

      try {

        let interviewDate =
          null;

        if (
          newStatus ===
          "interview"
        ) {

          const date =
            new Date();

          date.setDate(
            date.getDate() + 3
          );

          date.setHours(10);
          date.setMinutes(0);

          interviewDate =
            date.toISOString();
        }

        const updatedApplication =
          await updateApplicationStatus(
            applicationId,
            {
              status:
                newStatus,
              interviewDate
            },
            token
          );

        const updated =
          applications.map(
            (app) =>
              app.id ===
              applicationId
                ? updatedApplication
                : app
          );

        setApplications(updated);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update status"
        );
      }
    };

  // DELETE JOB
  const handleDeleteJob =
    async (id) => {

      try {

        await deleteJob(
          id,
          token
        );

        const filtered =
          jobs.filter(
            (job) =>
              job.id !== id
          );

        setJobs(filtered);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete job"
        );
      }
    };

  // EDIT JOB
  const handleEditJob =
    async (
      id,
      updatedData
    ) => {

      try {

        const updatedJob =
          await editJob(
            id,
            updatedData,
            token
          );

        const updated =
          jobs.map((job) =>
            job.id === id
              ? updatedJob
              : job
          );

        setJobs(updated);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to edit job"
        );
      }
    };

  // FILTER JOBS
  const filteredJobs =
    useMemo(() => {

      return jobs.filter(
        (job) =>
          job.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [jobs, search]);

  // STATS
  const totalJobs =
    jobs.length;

  const totalApps =
    applications.length;

  const interviews =
    applications.filter(
      (a) =>
        a.status ===
        "interview"
    ).length;

  const accepted =
    applications.filter(
      (a) =>
        a.status ===
        "accepted"
    ).length;

  const applicationRate =
    totalJobs > 0
      ? Math.round(
          (totalApps /
            totalJobs) *
            100
        )
      : 0;

  const interviewRate =
    totalApps > 0
      ? Math.round(
          (interviews /
            totalApps) *
            100
        )
      : 0;

  const acceptedRate =
    totalApps > 0
      ? Math.round(
          (accepted /
            totalApps) *
            100
        )
      : 0;

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
                : "Job Dashboard"}
            </h1>

            <p className="text-slate-400 mt-2">
              Welcome back,
              {" "}
              {user?.email}
            </p>

          </div>

          <div className="flex items-center gap-3">

            <NotificationBell
              applications={
                applications
              }
            />

            <button
              onClick={
                handleLogout
              }
              className="bg-red-500/20 border border-red-500/30 hover:bg-red-500 px-5 py-3 rounded-2xl transition font-medium"
            >
              Logout
            </button>

          </div>

        </div>

        {/* SEARCH */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-400 outline-none"
            />

            {isAdmin && (
              <button
                onClick={() =>
                  setIsModalOpen(
                    true
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-2xl font-semibold transition whitespace-nowrap"
              >
                + Post Job
              </button>
            )}

          </div>

        </div>

        {/* ADMIN */}
        {isAdmin && (

          <>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              {/* JOBS */}
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
              <Charts
                applications={
                  applications
                }
              />
            </div>

          </>
        )}

        {/* JOBS */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

          {filteredJobs.map(
            (job) => (

              <JobCard
                key={job.id}
                job={job}
                isAdmin={
                  isAdmin
                }
                applications={
                  applications
                }
                onApply={() =>
                  handleApplyClick(
                    job
                  )
                }
                onStatusChange={
                  handleStatusChange
                }
                onDelete={
                  handleDeleteJob
                }
                onEdit={
                  handleEditJob
                }
              />

            )
          )}

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
        isOpen={
          !!selectedJob
        }
        job={selectedJob}
        onClose={() =>
          setSelectedJob(
            null
          )
        }
        onSubmit={
          handleSubmitApplication
        }
      />

      {/* POST JOB MODAL */}
      <PostJobModal
        isOpen={
          isModalOpen
        }
        onClose={() =>
          setIsModalOpen(
            false
          )
        }
        onAddJob={
          handleAddJob
        }
      />

    </div>
  );
}

