import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

  const handleLogin = async () => {

    if (!email || !password) { 
      alert("Please enter email and password"); 
      return; 
    } 
    try { 
      
      const data = await loginUser({
         email, 
         password
         }); 
         
         if (data.message) { 
          alert(data.message); 
          return; 
        } 
        
        localStorage.setItem(
          "token",
           data.token
          ); 
          
          localStorage.setItem(
            "user", JSON.stringify(data.user)
          );
          
          navigate("/dashboard"); 
        } catch (error) { 

          alert("Login failed"); 
          
          console.log(error); 
        }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl opacity-40" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Launchora
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back
          </p>

        </div>

        {/* EMAIL */}
        <div className="mb-4">

          <label className="text-sm text-slate-300 mb-2 block">
            Email
          </label>

          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-4">

          <label className="text-sm text-slate-300 mb-2 block">
            Password
          </label>

          <input
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* ROLE */}
        <div className="mb-6">

          <label className="text-sm text-slate-300 mb-2 block">
            Account Type
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              value="user"
              className="bg-slate-900"
            >
              Applicant
            </option>

            <option
              value="admin"
              className="bg-slate-900"
            >
              Recruiter
            </option>

          </select>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="text-center text-slate-400 mt-6">

          Don’t have an account?{" "}

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
          >
            Register
          </span>

        </p>

      </div>
    </div>
  );
}

