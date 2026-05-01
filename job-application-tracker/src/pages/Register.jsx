import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleRegister = () => {
    const newUser = {
      role,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Account created! Please login.");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Applicant</option>
          <option value="admin">Recruiter (Admin)</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Create Account
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}