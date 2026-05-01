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
  onStatusChange
}) {
  const jobApplications = applications.filter(
    (app) => app.jobId === job.id
  );

  const user = JSON.parse(localStorage.getItem("user"));

  // 🆕 FIXED MATCHING (EMAIL)
  const myApplication = jobApplications.find(
    (app) => app.email === user?.email
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-bold">{job.title}</h2>
      <p className="text-sm text-gray-500">{job.company}</p>

      <div className="mt-3">
        {isAdmin ? (
          <>
            {jobApplications.length > 0 ? (
              jobApplications.map((app, index) => (
                <div key={index} className="mb-2 text-sm">
                  <p>
                    {app.name} {app.surname}
                  </p>
                  <p className="text-gray-500">
                    CV: {app.cv}
                  </p>

                  <select
                    value={app.status}
                    onChange={(e) =>
                      onStatusChange(job.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 mt-1"
                  >
                    <option value="applied">Applied</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                No applicants
              </p>
            )}

            <div className="flex gap-3 mt-2">
              <button className="text-yellow-600 text-sm">
                Edit
              </button>
              <button className="text-red-600 text-sm">
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 🆕 APPLICANT VIEW FIXED */}
            {myApplication ? (
              <div className="flex flex-col gap-1">
                <span className="text-green-600 text-sm font-semibold">
                  {myApplication.status.toUpperCase()}
                </span>

                <span className="text-xs text-gray-500">
                  CV: {myApplication.cv}
                </span>
              </div>
            ) : (
              <button
                onClick={onApply}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
              >
                Apply
              </button>
            )}
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        {getDaysAgo(job.createdAt)}
      </p>
    </div>
  );
}