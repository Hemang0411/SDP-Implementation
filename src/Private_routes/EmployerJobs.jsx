import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FiBriefcase,
  FiCheckCircle,
  FiX,
  FiClock,
  FiArrowLeft,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const JobCard = ({ job, onEdit, onDelete }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
    {/* JOB TITLE */}
    <div className="mb-3">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Job Title</label>
      <div className="text-xl font-bold text-slate-900 leading-tight">{job.title}</div>
    </div>

    {/* JOB INFO GRID */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Job Type:</label>
        <div className="text-sm font-medium text-slate-900">{job.job_type}</div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Location:</label>
        <div className="text-sm font-medium text-slate-900">{job.location}</div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Salary:</label>
        <div className="text-sm font-semibold text-slate-900">{job.salary_range}</div>
      </div>
    </div>

    {/* DESCRIPTION */}
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Description:</label>
      <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">{job.description}</p>
    </div>

    {/* SKILLS */}
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Skills</label>
      <div className="flex flex-wrap gap-1.5">
        {job.required_skills?.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-medium border border-slate-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* STATUS & ACTIONS */}
    <div className="pt-4 border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
          job.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
          job.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
          'bg-yellow-100 text-yellow-800 border-yellow-200'
        }`}>
          {job.status === 'Approved' ? <FiCheckCircle className="w-4 h-4" /> : 
           job.status === 'Rejected' ? <FiX className="w-4 h-4" /> : <FiClock className="w-4 h-4" />}
          {job.status}
        </div>

        {job.status === 'Pending' && (
          <div className="flex gap-2 flex-1 sm:flex-none">
            <button
              onClick={() => onEdit(job)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 flex-1 sm:flex-none h-11"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job._id)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-blue-600 border-2 border-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors duration-200 flex-1 sm:flex-none h-11"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);


const EditJobModal = ({ job, isOpen, onClose, onUpdate, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    job_type: '',
    location: '',
    salary_range: '',
    description: '',
    required_skills: [],
  });

  useEffect(() => {
    if (job && isOpen) {
      setFormData({
        title: job.title || '',
        job_type: job.job_type || '',
        location: job.location || '',
        salary_range: job.salary_range || '',
        description: job.description || '',
        required_skills: job.required_skills || [],
      });
    }
  }, [job, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormComplete = 
    formData.title.trim() &&
    formData.description.trim() &&
    formData.location.trim() &&
    formData.salary_range.trim();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Edit Job Posting
          </h2>
          <button
            onClick={onClose}
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
                required
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
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
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
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-bold mb-2">
                Required Skills *
              </label>
              <input
                name="required_skills"
                value={formData.required_skills.join(', ')}
                onChange={(e) => setFormData(prev => ({ ...prev, required_skills: e.target.value.split(',').map(s => s.trim()) }))}
                placeholder="React, Node.js, Python"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                required
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
                required
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
                placeholder="₹5L - ₹8L"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormComplete || loading}
              className={`px-6 py-2 rounded-lg text-sm font-bold text-white transition ${
                isFormComplete && !loading
                  ? "bg-[#0a66c2] hover:bg-[#084d91]"
                  : "bg-slate-400 cursor-not-allowed"
              }`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EmployerJobs = () => {
  const navigate = useNavigate();
  const { employer_id } = useSelector((state) => state.empDash);
  const token = useSelector((state) => state.auth.token);
  const loginPayload = useSelector((state) => ({
    email: state.auth.email?.trim(),
    password: state.auth.password,
    role: state.auth.role?.toLowerCase(),
  }));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(3);


  const fetchJobs = async () => {
    if (!employer_id || !token) {
      console.log("Missing employer_id or token:", { employer_id, hasToken: !!token });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("🔄 Fetching jobs for employer_id:", employer_id);
      
      const response = await axios.get(
        `https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/All-jobs?employer_id=${employer_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            user: JSON.stringify(loginPayload),
          },
        }
      );

      console.log("✅ Full API Response:", response.data);
      console.log("✅ Jobs array:", response.data.jobs);
      
      setJobs(response.data.jobs || []);
      console.log(jobs.length);
    } catch (error) {
      console.error("❌ Error fetching jobs:", error.response?.data || error.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [employer_id]);

  const handleEdit = (job) => {
    console.log("📝 Edit job:", job);
    setJobToEdit(job);
    setShowEditModal(true);
  };

  const handleDelete = async (jobId) => {
    console.log('🔍 handleDelete received jobId:', jobId);

    if (!jobId) {
      console.error("❌ No jobId provided");
      toast.error("Invalid job ID");
      return;
    }
    try {
      await axios.delete(
        `https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/jobDelete/${jobId}`,
        { 
          data: { employer_id },
          headers: {
            Authorization: `Bearer ${token}`,
            user: JSON.stringify(loginPayload),
          },
        }
      );
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  const handleUpdateJob = async (updatedData) => {
    if (!jobToEdit?._id) return;
    
    try {
      setUpdateLoading(true);
      
      const payload = {
        employer_id,
        title: updatedData.title,
        description: updatedData.description,
        required_skills: Array.isArray(updatedData.required_skills) 
          ? updatedData.required_skills 
          : updatedData.required_skills.split(',').map(s => s.trim()),
        job_type: updatedData.job_type,
        location: updatedData.location,
        salary_range: updatedData.salary_range
      };
      
      await axios.patch(
        `https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/jobUpdate/${jobToEdit._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            user: JSON.stringify(loginPayload),
          },
        }
      );  
      toast.success("Job updated successfully!");
      setShowEditModal(false);
      setJobToEdit(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error.response?.data || error.message);
      toast.error("Failed to update the job");
    } finally {
      setUpdateLoading(false);
    }
  };


const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;
const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
const totalPages = Math.ceil(jobs.length / jobsPerPage);
const showPagination = jobs.length > 0;


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium mb-2 p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
            title="Back to Dashboard"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-1xl sm:text-3xl font-bold text-slate-800 mb-2">Your Jobs ({jobs.length})</h1>
          <p className="text-lg text-slate-600 max-w-2xl">Manage all your job postings</p>
        </div>

        {/* JOBS GRID - No white cotainer wrapper */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0a66c2]"></div>
              <span className="ml-4 text-lg text-slate-500 font-medium">Loading jobs...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <FiBriefcase className="mx-auto h-16 w-16 text-slate-400 mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No jobs found</h3>
              <p className="text-lg text-slate-500 max-w-md mx-auto">
                Post your first job from dashboard to get started
              </p>
            </div>
          ) : (
            <>
              {/* Jobs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Pagination */}
                {showPagination && (
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 max-w-4xl mx-auto">
                    <button
                      onClick={goToPrevious}
                      disabled={currentPage === 1}  // ✅ First page: Previous DISABLED
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      Page {currentPage} of {totalPages}  {/* ✅ Always visible */}
                    </div>

                    <button
                      onClick={goToNext}
                      disabled={currentPage === totalPages}  // ✅ Last page: Next DISABLED
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
                    >
                      Next
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

            </>
          )}
        </div>
      </div>

      <EditJobModal
        job={jobToEdit}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setJobToEdit(null);
        }}
        onUpdate={handleUpdateJob}
        loading={updateLoading}
      />

      <ToastContainer position="top-right" />
    </div>
  );
};

export default EmployerJobs;
