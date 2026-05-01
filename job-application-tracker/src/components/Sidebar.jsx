export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">💼 JobTracker</h1>

      <ul className="space-y-5 flex-1">
        <li className="cursor-pointer hover:text-gray-300 transition">
          Dashboard
        </li>
        <li className="cursor-pointer hover:text-gray-300 transition">
          Jobs
        </li>
         <li
          onClick={() => navigate("/applications")}
            className="cursor-pointer hover:text-gray-300">
          Applications
       </li>
        <li className="cursor-pointer hover:text-gray-300 transition">
          Profile
        </li>
      </ul>

      <p className="text-xs text-gray-400 mt-auto">
        © 2026 JobTracker
      </p>
    </div>
  );
}