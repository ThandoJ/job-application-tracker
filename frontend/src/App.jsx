import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";

import Chats from "./components/Chats";

import { jobs as initialJobs } from "./data/jobs";

export default function App() {

  // LOAD JOBS FROM LOCAL STORAGE
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  // LOAD APPLICATIONS FROM LOCAL STORAGE
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications");
    return savedApplications
      ? JSON.parse(savedApplications)
      : [];
  });

  // SAVE JOBS
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // SAVE APPLICATIONS
  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* REGISTER */}
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

      {/* PROFILE */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* CHATS */}
      <Route
        path="/chats"
        element={<Chats />}
      />

    </Routes>
  );
}