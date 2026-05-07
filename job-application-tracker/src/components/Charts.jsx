import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Charts({ applications }) {
  const grouped = {};

  applications.forEach((app) => {
    const date = new Date(app.appliedAt).toLocaleDateString();

    if (!grouped[date]) grouped[date] = 0;

    grouped[date]++;
  });

  const lineData = Object.keys(grouped).map((date) => ({
    date,
    count: grouped[date]
  }));

  const statusCounts = {
    applied: 0,
    reviewing: 0,
    interview: 0,
    accepted: 0,
    rejected: 0
  };

  applications.forEach((app) => {
    if (statusCounts[app.status] !== undefined) {
      statusCounts[app.status]++;
    }
  });

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key]
  }));

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#8B5CF6",
    "#10B981",
    "#EF4444"
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5">
        <h2 className="text-white text-xl font-semibold mb-5">
          Applications Over Time
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#60A5FA"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5">
        <h2 className="text-white text-xl font-semibold mb-5">
          Application Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}