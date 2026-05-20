import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Chats from "./components/Chats";
import Interviews from "./pages/Interviews";
import Intro from "./pages/Intro";
import Landing from "./pages/Landing";

import { getJobs } from "./api/jobApi";
import { fetchApplications } from "./api/applicationApi";

export default function App() {

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // TRACK LOGGED IN USER
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  // REFETCH WHENEVER USER CHANGES
  useEffect(() => {

    // CLEAR OLD DATA IMMEDIATELY
    setJobs([]);
    setApplications([]);

    if (!user) return;

    const loadData = async () => {
      try {
        const [jobsData, appsData] = await Promise.all([
          getJobs(),
          fetchApplications()
        ]);
        setJobs(jobsData);
        setApplications(appsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadData();

  }, [user]); // ← runs again every time user changes

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <Dashboard
          jobs={jobs}
          setJobs={setJobs}
          applications={applications}
          setApplications={setApplications}
          setUser={setUser}
        />}
      />
      <Route path="/applications" element={
        <Applications jobs={jobs} applications={applications} setApplications={setApplications}/>}
      />
      <Route path="/interviews" element={
        <Interviews applications={applications} jobs={jobs} setApplications={setApplications}/>}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chats" element={<Chats />} />
    </Routes>
  );
}