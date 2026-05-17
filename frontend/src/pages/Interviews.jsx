import Sidebar from "../components/Sidebar";

import {
  CalendarDays,
  Clock3,
  BriefcaseBusiness,
  User,
  Building2
} from "lucide-react";

export default function Interviews({
  applications = [],
  jobs = []
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "admin";

  // FILTER INTERVIEWS
  const interviewApplications = applications.filter((app) => {
    // ADMIN SEES ALL
    if (isAdmin) {
      return app.status === "interview";
    }

    // APPLICANT SEES ONLY THEIR OWN
    return (
      app.email === user?.email &&
      app.status === "interview"
    );
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-3xl md:text-4xl font-bold">
            {isAdmin
              ? "Scheduled Interviews"
              : "My Interviews"}
          </h1>

          <p className="text-slate-400 mt-2">
            {isAdmin
              ? "Manage upcoming candidate interviews"
              : "Track your upcoming interviews"}
          </p>

        </div>

        {/* EMPTY STATE */}
        {interviewApplications.length === 0 ? (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">

            <CalendarDays
              size={60}
              className="mx-auto text-slate-500 mb-5"
            />

            <h2 className="text-2xl font-bold">
              No Interviews Yet
            </h2>

            <p className="text-slate-400 mt-3">
              {isAdmin
                ? "No interviews have been scheduled yet"
                : "You have not been invited for an interview yet"}
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {interviewApplications.map((app, index) => {

              // FIND JOB
              const job = jobs.find(
                (j) => j.id === app.jobId
              );

              const interviewDate =
                app.interviewDate
                  ? new Date(app.interviewDate)
                  : null;

              return (

                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300"
                >

                  {/* TOP */}
                  <div className="flex items-center justify-between mb-6">

                    <div className="bg-purple-500/20 p-3 rounded-2xl">
                      <BriefcaseBusiness
                        className="text-purple-400"
                      />
                    </div>

                    <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/20">
                      Interview
                    </span>

                  </div>

                  {/* JOB */}
                  <h2 className="text-2xl font-bold">
                    {job?.title || app.jobTitle}
                  </h2>

                  {/* COMPANY */}
                  <div className="flex items-center gap-2 text-slate-400 mt-2">

                    <Building2 size={16} />

                    <span>
                      {job?.company || "Unknown Company"}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-6 space-y-5">

                    {/* APPLICANT */}
                    <div>

                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        <User size={15} />
                        Applicant
                      </p>

                      <p className="font-semibold mt-1">
                        {app.name} {app.surname}
                      </p>

                    </div>

                    {/* DATE */}
                    <div>

                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        <CalendarDays size={15} />
                        Interview Date
                      </p>

                      <p className="font-semibold mt-1">
                        {interviewDate?.toLocaleDateString()}
                      </p>

                    </div>

                    {/* TIME */}
                    <div>

                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        <Clock3 size={15} />
                        Interview Time
                      </p>

                      <p className="font-semibold mt-1">
                        {interviewDate?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}