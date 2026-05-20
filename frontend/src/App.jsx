
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

  const [applications, setApplications] =
    useState([]);

  // FETCH JOBS
  useEffect(() => {

    const loadJobs = async () => {

      try {

        const data =
          await getJobs();

        setJobs(data);

      } catch (error) {

        console.error(
          "Failed to fetch jobs",
          error
        );

      }
    };

    loadJobs();

  }, []);

  // FETCH APPLICATIONS
  useEffect(() => {

    const loadApplications =
      async () => {

      try {

        const data =
          await fetchApplications();

        setApplications(data);

      } catch (error) {

        console.error(
          "Failed to fetch applications",
          error
        );

      }
    };

    loadApplications();

  }, []);

  return (

    <Routes>

        {/* LANDING */}
        <Route
  path="/"
  element={<Landing />}
/>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />
 
       {/* INTRO */}
      <Route 
      path="/intro" 
      element={<Intro />} />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <Dashboard
            jobs={jobs}
            setJobs={setJobs}
            applications={applications}
            setApplications={
              setApplications
            }
          />
        }
      />

      {/* APPLICATIONS */}
      <Route
        path="/applications"
        element={
          <Applications
            jobs={jobs}
            applications={
              applications
            }
          />
        }
      />

      {/* INTERVIEWS */}
      <Route
        path="/interviews"
        element={
          <Interviews
            applications={
              applications
            }
            jobs={jobs}
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

