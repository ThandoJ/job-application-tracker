import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import { User, Mail, Phone, Save } from "lucide-react";

export default function Profile() {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")))


  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: "",
    bio: "",
    location: "",
  });

 // LOAD PROFILE
useEffect(() => {

  if (!user?.email) return;

  const savedProfile = localStorage.getItem(
    `profile-${user.email}`
  );

  if (savedProfile) {
    setProfile(JSON.parse(savedProfile));
  }

}, [user?.email]);

// SAVE PROFILE
const handleSave = () => {

  localStorage.setItem(
    `profile-${user.email}`,
    JSON.stringify(profile)
  );

  alert("Profile saved successfully!");
};

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-slate-400 mt-1">
              Manage your account information
            </p>
          </div>

        
        </div>

        {/* PROFILE CARD */}
        <div className="max-w-4xl mx-auto">
          
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="relative h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              
              <div className="absolute -bottom-14 left-8">
                <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white flex items-center justify-center text-4xl font-bold">
                  {profile.name
                    ? profile.name.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="pt-20 p-8">

              {/* NAME */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">
                  {profile.name || "Your Name"}{" "}
                  {profile.surname}
                </h2>

                <p className="text-slate-400 mt-1">
                  {user?.role === "admin"
                    ? "Recruiter Account"
                    : "Applicant Account"}
                </p>
              </div>

              {/* FORM GRID */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </label>

                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300"
                  />
                </div>

                {/* PHONE */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Phone size={16} />
                    Phone
                  </label>

                  <input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* NAME */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 flex items-center gap-2">
                    <User size={16} />
                    First Name
                  </label>

                  <input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter first name"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* SURNAME */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">
                    Last Name
                  </label>

                  <input
                    value={profile.surname}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        surname: e.target.value,
                      })
                    }
                    placeholder="Enter surname"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* LOCATION */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-slate-400">
                    Location
                  </label>

                  <input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        location: e.target.value,
                      })
                    }
                    placeholder="Enter your location"
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* BIO */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-slate-400">
                    Professional Bio
                  </label>

                  <textarea
                    rows={5}
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bio: e.target.value,
                      })
                    }
                    placeholder="Tell recruiters about yourself..."
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="mt-8 flex justify-end">
                
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Save size={18} />
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}