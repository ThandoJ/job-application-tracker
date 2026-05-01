import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">💼 JobTracker</h1>

      <ul className="space-y-5 flex-1">
        <li 
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer hover:text-gray-300 transition">
          Dashboard
        </li>
        
         <li
          onClick={() => navigate("/applications")} 
          className="cursor-pointer hover:text-gray-300 transition"
        >
          {isAdmin ? "All Applications" : "My Applications"}
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