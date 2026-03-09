import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
  FiPlus,
  FiX,
  FiLinkedin,
} from "react-icons/fi";

const Stat = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex items-center gap-4">
    <div className={`${color} text-2xl`}>{icon}</div>
    <div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
        {title}
      </div>
    </div>
  </div>
);

const ActiveJobsCard = ({ value, icon, onPostClick }) => {
  const navigate = useNavigate();
  
  return (
  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl text-blue-600">{icon}</div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </div>

      {/* POST JOB BUTTON - SMALLER SIZE */}
      <button
        onClick={onPostClick}
        className="flex items-center gap-2 px-4 py-2 border-2 border-[#0a66c2] bg-white text-[#0a66c2] rounded-lg text-sm font-bold hover:bg-[#eff6ff] hover:border-[#0a66c2] hover:shadow-md transition-all duration-200"
      >
        <FiPlus className="w-3.5 h-3.5" />
        Post Job
      </button>
    </div>

    {/* EXISTING JOBS BUTTON - SMALLER SIZE */}
    <button 
      onClick={() => navigate('/employer-jobs')}
      className="w-full bg-[#0a66c2] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#084d91] transition-all duration-200 cursor-pointer"
    >
      Existing Jobs
    </button>
  </div>
);
};

const Employer_Dashboard = () => {
  const { companyName, linkedin, employer_id } = useSelector(
    (state) => state.empDash
  );
  const token = useSelector((state) => state.auth.token);
  const authState = useSelector((state) => state.auth);
  const { email, password, role } = useSelector((state) => state.auth);
  const loginPayload = { 
  email: email?.trim(), 
  password: password, 
  role: role?.toLowerCase() 
};

  const [showJobForm, setShowJobForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    required_skills: "",
    job_type: "Full-time",
    location: "",
    salary_range: "",
  });

  const [errors, setErrors] = useState({});
  const [jobCount, setJobCount] = useState(0);
  const [loadingJobCount, setLoadingJobCount] = useState(false);

  const fetchJobCount = async () => {
    if (!employer_id || !token) return;
    
    try {
      setLoadingJobCount(true);
      const response = await axios.get(
        `https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/All-jobs?employer_id=${employer_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            user: JSON.stringify(loginPayload),
          },
        }
      );
      setJobCount(response.data.jobs?.length || 0);
    } catch (error) {
      console.error("Error fetching job count:", error);
      setJobCount(0);
    } finally {
      setLoadingJobCount(false);
    }
  };


  const isFormComplete =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.required_skills.trim() &&
    formData.location.trim() &&
    formData.salary_range.trim();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.required_skills.trim())
      newErrors.required_skills = "Skills are required";
    if (!formData.location.trim())
      newErrors.location = "Location is required";
    if (!formData.salary_range.trim())
      newErrors.salary_range = "Salary range is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (!token) {
        alert("You are not logged in. Please login again.");
        return;
      }

    const response = await axios.post("https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/jobs",
    {
      employer_id: employer_id,
      title: formData.title,
      description: formData.description,
      required_skills: formData.required_skills
        .split(",")
        .map((s) => s.trim().toLowerCase()),
      job_type: formData.job_type,
      location: formData.location,
      salary_range: formData.salary_range,
    },
    {
       headers: {
        Authorization: `Bearer ${token}`,
        user : JSON.stringify(loginPayload)
      },
    }
);

     toast.success("Job posted successfully!");

      setFormData({
        title: "",
        description: "",
        required_skills: "",
        job_type: "Full-time",
        location: "",
        salary_range: "",
      });

      setShowJobForm(false);
      setErrors({});
      fetchJobCount();

    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
  fetchJobCount();
  }, [employer_id, token]);

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome,{" "}
            <span className="text-[#0a66c2]">
              {companyName ?? "Company"}
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage jobs and applicants efficiently
          </p>
        </div>

        {/* PROFILE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm p-10 mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {companyName ?? "Your Company"}
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto mb-6">
            Build your team with top talent. Manage job postings and track
            applicants efficiently using your hiring dashboard.
          </p>

          <div className="flex justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <FiLinkedin className="text-[#0a66c2]" />
              <span>{linkedin ?? "Not Provided"}</span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ActiveJobsCard
            value={loadingJobCount ? "..." : jobCount}      
            icon={<FiBriefcase />}
            onPostClick={() => setShowJobForm(true)}
          />

          <Stat
            title="Applicants"
            value="128"
            icon={<FiTrendingUp />}
            color="text-orange-600"
          />

          <Stat
            title="Hired"
            value="8"
            icon={<FiCheckCircle />}
            color="text-green-600"
          />
        </div>
      </div>

      {/* MODAL */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Post New Job
              </h2>
              <button
                onClick={() => setShowJobForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <FiX className="text-xl text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Job Title *
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Job Type *
                  </label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Required Skills *
                  </label>
                  <input
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Location *
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Salary Range *
                  </label>
                  <input
                    name="salary_range"
                    value={formData.salary_range}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isFormComplete}
                  className={`px-6 py-2 rounded-lg text-sm font-bold text-white transition ${
                    isFormComplete
                      ? "bg-[#0a66c2] hover:bg-[#084d91]"
                      : "bg-slate-400 cursor-not-allowed"
                  }`}
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Employer_Dashboard;
