import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Applications({ jobs = [], applications = [] }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!user) {
    navigate("/");
    return null;
  }

  // 🆕 FILTER USER/APPLICATIONS
  let filtered = isAdmin
    ? applications
    : applications.filter((app) => app.email === user.email);

  // 🆕 SEARCH (by job title or name)
  filtered = filtered.filter((app) => {
    const job = jobs.find((j) => j.id === app.jobId);

    return (
      job?.title.toLowerCase().includes(search.toLowerCase()) ||
      app.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  // 🆕 STATUS FILTER
  if (statusFilter !== "all") {
    filtered = filtered.filter((app) => app.status === statusFilter);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        {isAdmin ? "All Applications" : "My Applications"}
      </h1>

      {/* 🆕 SEARCH + FILTER UI */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="reviewing">Reviewing</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No applications found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((app, index) => {
            const job = jobs.find((j) => j.id === app.jobId);

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow"
              >
                <h2 className="font-bold">{job?.title}</h2>

                {isAdmin && (
                  <>
                    <p>
                      {app.name} {app.surname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {app.email}
                    </p>
                  </>
                )}

                {/* 🆕 VIEW CV (BASE64) */}
                <a
                  href={app.cvBase64}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View CV
                </a>

                <p className="mt-2">
                  Status:{" "}
                  <span className="font-semibold text-green-600">
                    {app.status}
                  </span>
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}