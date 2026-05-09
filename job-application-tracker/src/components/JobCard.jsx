import {
  Briefcase,
  MapPin,
  Building2,
  Clock3,
  Users
} from "lucide-react";

function getDaysAgo(date) {
  const now = new Date();
  const jobDate = new Date(date);

  const diffDays = Math.floor(
    (now - jobDate) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";

  return `${diffDays} days ago`;
}

export default function JobCard({
  job,
  isAdmin,
  applications = [],
  onApply,
  onStatusChange,
  onDelete,
  onEdit
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  // JOB APPLICATIONS
  const jobApplications = applications.filter(
    (app) => app.jobId === job.id
  );

  // MY APPLICATION
  const myApplication = jobApplications.find(
    (app) => app.email === user?.email
  );

  return (
    <div className="group relative overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:border-blue-500/30 transition-all duration-300">

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />

      {/* HEADER */}
      <div className="relative z-10 flex items-start justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            {job.title}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-gray-300 text-sm">
            <Building2 size={15} />
            <span>{job.company}</span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
            <MapPin size={15} />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="bg-blue-500/20 p-3 rounded-2xl">
          <Briefcase className="text-blue-400" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="relative z-10 mt-5 text-sm text-gray-300 line-clamp-3">
        {job.description}
      </p>

      {/* FOOTER */}
      <div className="relative z-10 mt-6">

        {/* ADMIN VIEW */}
        {isAdmin ? (
          <div>

            {/* APPLICANTS */}
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <Users size={16} />
              <span>
                {jobApplications.length} Applicants
              </span>
            </div>

            {jobApplications.length > 0 ? (
              <div className="space-y-3 max-h-40 overflow-y-auto pr-1">

                {jobApplications.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/5 rounded-2xl p-3"
                  >
                    <p className="text-white font-medium text-sm">
                      {app.name} {app.surname}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {app.email}
                    </p>

                    <p className="text-xs text-blue-400 mt-1">
                      CV: {app.cv}
                    </p>

                    <select
                      value={app.status}
                      onChange={(e) =>
                        onStatusChange(
                          job.id,
                          e.target.value
                        )
                      }
                      className="mt-3 w-full bg-[#111827] border border-white/10 text-white rounded-xl p-2 text-sm"
                    >
                      <option value="applied">
                        Applied
                      </option>

                      <option value="reviewing">
                        Reviewing
                      </option>

                      <option value="interview">
                        Interview
                      </option>

                      <option value="accepted">
                        Accepted
                      </option>

                      <option value="rejected">
                        Rejected
                      </option>
                    </select>
                  </div>
                ))}

              </div>
           ) : (
  <div className="bg-white/5 rounded-2xl p-4 text-center text-gray-400 text-sm">
    No applicants yet
  </div>
)}

{/* ADMIN ACTIONS */}
<div className="flex gap-3 mt-4">

  <button
    onClick={() => {
      const newTitle = prompt(
        "Edit job title",
        job.title
      );

      if (!newTitle) return;

      onEdit({
        ...job,
        title: newTitle
      });
    }}

     className=" flex-1 bg-blue-600/30 border border-blue-500/30 hover:bg-blue-500 px-4 py-2 rounded-xl transition font-medium"
            
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(job.id)}
   className=" flex-1 bg-red-600/30 border border-red-500/30 hover:bg-red-500 px-4 py-2 rounded-xl transition font-medium"
  >
    Delete
  </button>

</div>
          </div>
        ) : (
          <>
            {/* APPLICANT VIEW */}
            {myApplication ? (
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                <div>
                  <p className="text-xs text-gray-400">
                    Application Status
                  </p>

                  <p
                    className={`font-semibold mt-1 ${
                      myApplication.status === "accepted"
                        ? "text-green-400"
                        : myApplication.status === "rejected"
                        ? "text-red-400"
                        : myApplication.status === "interview"
                        ? "text-purple-400"
                        : "text-blue-400"
                    }`}
                  >
                    {myApplication.status.toUpperCase()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    Uploaded CV
                  </p>

                  <p className="text-xs text-white mt-1">
                    {myApplication.cv}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={onApply}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
              >
                Apply Now
              </button>
            )}
          </>
        )}

        {/* DATE */}
        <div className="flex items-center gap-2 mt-5 text-xs text-gray-500">
          <Clock3 size={14} />
          <span>
            Posted {getDaysAgo(job.createdAt)}
          </span>
        </div>

      </div>
    </div>
  );
}