import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

import {
  Briefcase,
  Users,
  CheckCircle,
  Clock
} from "lucide-react";

export default function RecruiterAnalytics({
  jobs = [],
  applications = []
}) {

  // TOTALS
  const totalJobs = jobs.length;
  const totalApplications = applications.length;

  const accepted = applications.filter(
    (a) => a.status === "accepted"
  ).length;

  const interviews = applications.filter(
    (a) => a.status === "interview"
  ).length;

  // APPLICATIONS PER JOB
  const applicationsPerJob = jobs.map((job) => ({
    name: job.title,
    applications: applications.filter(
      (app) => app.jobId === job.id
    ).length
  }));

  // STATUS DATA
  const statusData = [
    {
      name: "Applied",
      value: applications.filter(
        (a) => a.status === "applied"
      ).length
    },
    {
      name: "Reviewing",
      value: applications.filter(
        (a) => a.status === "reviewing"
      ).length
    },
    {
      name: "Interview",
      value: interviews
    },
    {
      name: "Accepted",
      value: accepted
    },
    {
      name: "Rejected",
      value: applications.filter(
        (a) => a.status === "rejected"
      ).length
    }
  ];

  // COLORS
  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#10B981",
    "#EF4444"
  ];

  // APPLICATIONS OVER TIME
  const grouped = {};

  applications.forEach((app) => {
    const date = new Date(
      app.appliedAt
    ).toLocaleDateString();

    if (!grouped[date]) {
      grouped[date] = 0;
    }

    grouped[date]++;
  });

  const timelineData = Object.keys(grouped).map(
    (date) => ({
      date,
      applications: grouped[date]
    })
  );

  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* JOBS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Total Jobs
              </p>

              <h2 className="text-3xl font-bold mt-2 text-white">
                {totalJobs}
              </h2>
            </div>

            <div className="bg-blue-500/20 p-3 rounded-2xl">
              <Briefcase className="text-blue-400" />
            </div>
          </div>
        </div>

        {/* APPLICATIONS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Applications
              </p>

              <h2 className="text-3xl font-bold mt-2 text-white">
                {totalApplications}
              </h2>
            </div>

            <div className="bg-purple-500/20 p-3 rounded-2xl">
              <Users className="text-purple-400" />
            </div>
          </div>
        </div>

        {/* INTERVIEWS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Interviews
              </p>

              <h2 className="text-3xl font-bold mt-2 text-white">
                {interviews}
              </h2>
            </div>

            <div className="bg-yellow-500/20 p-3 rounded-2xl">
              <Clock className="text-yellow-400" />
            </div>
          </div>
        </div>

        {/* ACCEPTED */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                Accepted
              </p>

              <h2 className="text-3xl font-bold mt-2 text-white">
                {accepted}
              </h2>
            </div>

            <div className="bg-green-500/20 p-3 rounded-2xl">
              <CheckCircle className="text-green-400" />
            </div>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <h2 className="text-lg font-semibold mb-5 text-white">
            Applications Per Job
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicationsPerJob}>
              <XAxis dataKey="name" />
              <Tooltip />

              <Bar
                dataKey="applications"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
          <h2 className="text-lg font-semibold mb-5 text-white">
            Hiring Pipeline
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AREA CHART */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-xl">
        <h2 className="text-lg font-semibold mb-5 text-white">
          Applications Timeline
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timelineData}>
            <XAxis dataKey="date" />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="applications"
              stroke="#3B82F6"
              fill="#3B82F6"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}