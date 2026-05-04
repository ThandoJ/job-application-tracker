import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: ""
  });

  //LOAD PROFILE FROM STORAGE
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="bg-white p-6 rounded-xl shadow w-[400px]">
          
          {/* EMAIL (READ ONLY) */}
          <div className="mb-4">
            <label className="text-sm text-gray-500">Email</label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-500">Name</label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* SURNAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-500">Surname</label>
            <input
              value={profile.surname}
              onChange={(e) =>
                setProfile({ ...profile, surname: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* PHONE */}
          <div className="mb-4">
            <label className="text-sm text-gray-500">Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}