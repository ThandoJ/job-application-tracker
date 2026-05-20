import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  Users,
  BarChart3,
  Bell,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Landing() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />

      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6">

        <h1 className="text-3xl font-bold">
          Launchora
        </h1>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </button>

        </div>

      </nav>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-32">

        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-sm text-blue-300 mb-6">
          Smart Recruitment Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight">

          Launch Your Career With

          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}Launchora
          </span>

        </h1>

        <p className="mt-8 text-slate-400 text-lg max-w-2xl">
          A modern platform for recruiters and applicants to manage jobs,
          applications, interviews, analytics, and hiring workflows.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            Explore Platform
          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <FeatureCard
              icon={<Briefcase />}
              title="Job Management"
              text="Recruiters can create, edit, and manage job listings easily."
            />

            <FeatureCard
              icon={<Users />}
              title="Applicant Tracking"
              text="Track every application from applied to hired."
            />

            <FeatureCard
              icon={<Bell />}
              title="Email Notifications"
              text="Applicants receive status and interview updates instantly."
            />

            <FeatureCard
              icon={<BarChart3 />}
              title="Analytics Dashboard"
              text="Visual charts and insights for recruiters."
            />

          </div>

        </div>

      </section>

      {/* RECRUITER / APPLICANT */}
      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {/* RECRUITER */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h3 className="text-3xl font-bold mb-6">
              For Recruiters
            </h3>

            <div className="space-y-4">

              <Benefit text="Post jobs instantly" />
              <Benefit text="Manage applicants" />
              <Benefit text="Schedule interviews" />
              <Benefit text="Track analytics" />
              <Benefit text="Send email updates" />

            </div>

          </div>

          {/* APPLICANT */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h3 className="text-3xl font-bold mb-6">
              For Applicants
            </h3>

            <div className="space-y-4">

              <Benefit text="Apply to jobs quickly" />
              <Benefit text="Upload CV securely" />
              <Benefit text="Track application status" />
              <Benefit text="Receive interview notifications" />
              <Benefit text="Manage your profile" />

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-6 pb-32">

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-white/10 rounded-[40px] p-14 text-center backdrop-blur-xl">

          <h2 className="text-5xl font-bold">
            Ready To Get Started?
          </h2>

          <p className="text-slate-300 mt-6 text-lg">
            Join Launchora and simplify your recruitment journey.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-10 px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition text-lg font-semibold"
          >
            Join Now
          </button>

        </div>

      </section>

    </div>
  );
}

/* FEATURE CARD */
function FeatureCard({
  icon,
  title,
  text
}) {

  return (

    <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:scale-[1.03] transition">

      <div className="bg-blue-500/20 p-3 rounded-2xl w-fit text-blue-400">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-slate-400 mt-3">
        {text}
      </p>

    </div>
  );
}

/* BENEFITS */
function Benefit({ text }) {

  return (

    <div className="flex items-center gap-3">

      <CheckCircle className="text-green-400" size={20} />

      <span className="text-slate-300">
        {text}
      </span>

    </div>
  );
}