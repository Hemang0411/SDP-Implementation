import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { FiBriefcase, FiUser, FiCheckCircle } from "react-icons/fi";

const Candidate_Dashboard = () => {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-xl font-bold text-slate-800">
            Welcome, <span className="text-[#008bdc]">{userName ?? "User"}</span>
          </h1>
          <span className="text-[10px] font-bold px-3 py-1 bg-white border border-blue-200 text-blue-600 rounded uppercase">Candidate Portal</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
              <h3 className="font-bold text-slate-800 mb-2">Candidate</h3>
              <p className="text-[10px] text-slate-400 uppercase mb-6">Job Seeker</p>
              <button className="w-full bg-slate-800 text-white py-2 rounded-lg text-xs font-bold hover:bg-black transition">View Profile</button>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatWidget title="Applied" value="12" icon={<FiBriefcase />} color="text-blue-600" />
              <StatWidget title="Interviews" value="3" icon={<FiCheckCircle />} color="text-green-600" />
              <StatWidget title="Views" value="45" icon={<FiUser />} color="text-purple-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left">
              <h3 className="font-bold text-slate-800 mb-6 border-b pb-4">Recommended Jobs</h3>
              {[1, 2].map((job) => (
                <div key={job} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b last:border-0 hover:bg-slate-50 px-2 rounded-lg transition gap-4">
                  <div>
                    <h4 className="font-bold text-[#008bdc] text-sm">Software Engineer</h4>
                    <p className="text-xs text-slate-500">LinkedIn • Remote • ₹15L - ₹20L</p>
                  </div>
                  <button className="text-xs font-bold text-[#008bdc] hover:underline w-full sm:w-auto">View Details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatWidget = ({ title, value, icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center">
    <div className={`${color} text-xl mb-1`}>{icon}</div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
    <div className="text-[10px] uppercase font-bold text-slate-400">{title}</div>
  </div>
);

export default Candidate_Dashboard;
