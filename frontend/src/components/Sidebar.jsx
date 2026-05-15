import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  User,
  MessageSquare
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard"
    },
    {
      name: isAdmin ? "Applications" : "My Applications",
      icon: <BriefcaseBusiness size={20} />,
      path: "/applications"
    },
    {
      name: "Chats",
      icon: <MessageSquare size={20} />,
      path: "/chats"
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile"
    }
  ];

  return (
    <div className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 text-white p-6 hidden md:flex flex-col">
      <h1 className="text-4xl font-bold mb-10">
        Launchora
      </h1>

      <div className="space-y-3 flex-1">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-blue-500 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-300 mt-10">
        © 2026 Launchora
      </p>
    </div>
  );
}