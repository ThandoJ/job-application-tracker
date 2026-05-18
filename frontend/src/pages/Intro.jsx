
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  Users,
  Rocket,
  ArrowRight
} from "lucide-react";

export default function Intro() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white relative flex items-center justify-center px-6">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full" />

      {/* CONTENT */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 1
        }}

        className="relative z-10 max-w-6xl w-full"

      >

        {/* HERO */}
        <div className="text-center mb-16">

          <motion.h1

            initial={{
              opacity: 0,
              scale: 0.8
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            transition={{
              duration: 1
            }}

            className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Launchora
          </motion.h1>

          <motion.p

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              delay: 0.5
            }}

            className="text-slate-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            The next-generation job application
            tracking platform for recruiters
            and applicants.
          </motion.p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          {/* CARD 1 */}
          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase
                size={32}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Smart Job Tracking
            </h2>

            <p className="text-slate-400">
              Track applications, interviews,
              offers, and progress all in one
              powerful dashboard.
            </p>

          </motion.div>

          {/* CARD 2 */}
          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Users
                size={32}
                className="text-purple-400"
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Recruiter Tools
            </h2>

            <p className="text-slate-400">
              Manage candidates, post jobs,
              update statuses, and streamline
              hiring effortlessly.
            </p>

          </motion.div>

          {/* CARD 3 */}
          <motion.div

            whileHover={{
              scale: 1.05
            }}

            className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >

            <div className="bg-cyan-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Rocket
                size={32}
                className="text-cyan-400"
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Powered Future
            </h2>

            <p className="text-slate-400">
              Built for the future with modern
              architecture, scalability, and
              next-level experiences.
            </p>

          </motion.div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-center">

          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={() =>
              navigate("/dashboard")
            }

            className="group bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 rounded-2xl text-lg font-semibold flex items-center gap-3 shadow-2xl hover:shadow-blue-500/30 transition-all"
          >

            Enter Dashboard

            <ArrowRight
              className="group-hover:translate-x-1 transition"
            />

          </motion.button>

        </div>

        {/* USER */}
        <p className="text-center text-slate-500 mt-10">
          Logged in as {user?.email}
        </p>

      </motion.div>

    </div>
  );
}

