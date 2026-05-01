function getDaysAgo(date) {
  const now = new Date();
  const jobDate = new Date(date);
  const diffTime = now - jobDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function JobCard({ job, isAdmin }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">{job.title}</h2>
          <p className="text-gray-600 text-sm">{job.company}</p>
          <p className="text-gray-400 text-sm">{job.location}</p>
        </div>

        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          Full-Time
        </span>
      </div> 

         {/* Description */}
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
        {job.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        {isAdmin ? (
          <div className="flex gap-3">
            <button className="text-yellow-600 text-sm hover:underline">
              Edit
            </button>
            <button className="text-red-600 text-sm hover:underline">
              Delete
            </button>
          </div>
        ) : (
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
            Apply
          </button>
        )}

        <span className="text-xs text-gray-400">{getDaysAgo(job.createdAt)}</span>
      </div>
    </div>
  );
}