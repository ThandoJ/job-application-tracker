import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import { jobs as initialJobs } from "./data/jobs";

export default function App() {
  // LOADING FROM LOCAL STORAGE
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : initialJobs;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  //SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <Dashboard
            jobs={jobs}
            setJobs={setJobs}
            applications={applications}
            setApplications={setApplications}
          />
        }
      />

      {/* APPLICATIONS */}
      <Route
        path="/applications"
        element={
          <Applications
            jobs={jobs}
            applications={applications}
          />
        }
      />

      {/*PROFILE */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}