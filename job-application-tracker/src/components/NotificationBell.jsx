import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotificationBell({
  applications = []
}) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const userApplications = applications.filter(
      (app) => app.email === user.email
    );

    const mappedNotifications = userApplications.map(
      (app) => ({
        id: app.jobId,
        message: `Your application status changed to ${app.status}`,
        time: new Date(
          app.appliedAt
        ).toLocaleDateString(),
        status: app.status
      })
    );

    setNotifications(mappedNotifications);
  }, [applications, user]);

  const unreadCount = notifications.length;

  return (
    <div className="relative">

      {/* BELL */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
      >
        <Bell className="text-white" size={22} />

        {/* BADGE */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-[#111827]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50">

          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-semibold text-lg">
              Notifications
            </h2>
          </div>

          <div className="max-h-[400px] overflow-y-auto">

            {notifications.length === 0 ? (
              <p className="text-gray-400 text-sm p-4">
                No notifications yet
              </p>
            ) : (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition"
                >
                  <p className="text-sm text-white">
                    {note.message}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        note.status === "accepted"
                          ? "bg-green-500/20 text-green-400"
                          : note.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : note.status === "interview"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {note.status}
                    </span>

                    <span className="text-xs text-gray-500">
                      {note.time}
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      )}
    </div>
  );
}