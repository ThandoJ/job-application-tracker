import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import CVPreviewModal from "../components/CVPreviewModal";

import {
  Search,
  Filter,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness
} from "lucide-react";

export default function Applications({
  jobs = [],
  applications = []
}) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedCV, setSelectedCV] =
    useState(null);

  const [selectedFileName, setSelectedFileName] =
    useState("");

  if (!user) {
    navigate("/");
    return null;
  }

  // FILTER APPLICATIONS
  let filtered = isAdmin
    ? applications
    : applications.filter(
        (app) => app.email === user.email
      );

  // SEARCH
  filtered = filtered.filter((app) => {
    const job = jobs.find(
      (j) => j.id === app.jobId
    );

    return (
      job?.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      app.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // STATUS FILTER
  if (statusFilter !== "all") {
    filtered = filtered.filter(
      (app) => app.status === statusFilter
    );
  }

  // STATUS ICON
  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return (
          <CheckCircle2
            size={16}
            className="text-green-400"
          />
        );

      case "rejected":
        return (
          <XCircle
            size={16}
            className="text-red-400"
          />
        );

      default:
        return (
          <Clock3
            size={16}
            className="text-blue-400"
          />
        );
    }
  };

  // STATUS COLOR
  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-400 border-green-500/20";

      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/20";

      case "interview":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20";

      case "reviewing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 relative overflow-y-auto">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl opacity-40" />

        <div className="relative z-10 p-4 md:p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {isAdmin
                  ? "All Applications"
                  : "My Applications"}
              </h1>

              <p className="text-gray-400 mt-2">
                Track and manage job applications
              </p>
            </div>

            {/* TOTAL */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 shadow-xl">
              <p className="text-sm text-gray-400">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {filtered.length}
              </h2>
            </div>

          </div>

          {/* SEARCH + FILTER */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4 mb-8">

            {/* SEARCH */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">

              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search applications..."
                className="bg-transparent outline-none w-full text-white placeholder:text-gray-500"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            {/* FILTER */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4">

              <Filter
                size={18}
                className="text-gray-400"
              />

              <select
                className="bg-transparent w-full py-3 outline-none text-white"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option
                  value="all"
                  className="bg-[#111827]"
                >
                  All
                </option>

                <option
                  value="applied"
                  className="bg-[#111827]"
                >
                  Applied
                </option>

                <option
                  value="reviewing"
                  className="bg-[#111827]"
                >
                  Reviewing
                </option>

                <option
                  value="interview"
                  className="bg-[#111827]"
                >
                  Interview
                </option>

                <option
                  value="accepted"
                  className="bg-[#111827]"
                >
                  Accepted
                </option>

                <option
                  value="rejected"
                  className="bg-[#111827]"
                >
                  Rejected
                </option>
              </select>
            </div>

          </div>

          {/* EMPTY STATE */}
          {filtered.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">

              <BriefcaseBusiness
                size={50}
                className="mx-auto text-gray-500 mb-4"
              />

              <h2 className="text-2xl font-semibold">
                No Applications Found
              </h2>

              <p className="text-gray-400 mt-2">
                Try changing your filters or search
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filtered.map((app, index) => {
                const job = jobs.find(
                  (j) => j.id === app.jobId
                );

                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:border-blue-500/30 transition-all duration-300"
                  >

                    {/* GLOW */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />

                    <div className="relative z-10">

                      {/* TITLE */}
                      <h2 className="text-xl font-bold text-white">
                        {job?.title}
                      </h2>

                      {/* COMPANY */}
                      <p className="text-gray-400 mt-1">
                        {job?.company}
                      </p>

                      {/* ADMIN INFO */}
                      {isAdmin && (
                        <div className="mt-4 bg-white/5 border border-white/5 rounded-2xl p-4">

                          <p className="font-medium text-white">
                            {app.name} {app.surname}
                          </p>

                          <p className="text-sm text-gray-400 mt-1">
                            {app.email}
                          </p>

                          <p className="text-sm text-gray-400">
                            {app.phone}
                          </p>
                        </div>
                      )}

                      {/* CV */}
                      <div className="mt-5">

                        {app.cvBase64 ? (
                          <button
                            onClick={() => {
                              setSelectedCV(
                                app.cvBase64
                              );

                              setSelectedFileName(
                                app.cv
                              );
                            }}
                            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                          >
                            <FileText size={18} />

                            <span className="underline">
                              View CV
                            </span>
                          </button>
                        ) : (
                          <p className="text-red-400 text-sm">
                            No CV uploaded
                          </p>
                        )}
                      </div>

                      {/* STATUS */}
                      <div className="mt-5 flex items-center justify-between">

                        <div
                          className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-sm ${getStatusStyle(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}

                          <span className="capitalize">
                            {app.status}
                          </span>
                        </div>

                        <span className="text-xs text-gray-500">
                          {new Date(
                            app.appliedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </div>
      </div>

      {/* CV MODAL */}
      <CVPreviewModal
        isOpen={!!selectedCV}
        cvBase64={selectedCV}
        fileName={selectedFileName}
        onClose={() => setSelectedCV(null)}
      />
    </div>
  );
}