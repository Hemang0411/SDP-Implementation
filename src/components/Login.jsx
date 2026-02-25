import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios"; 
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { loginSuccess, setDashboardData } from "../Redux/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "candidate"
  });

  const validateForm = () => {
    let newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailPattern.test(email.trim())) newErrors.email = "Enter a valid email address.";
    
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 5) newErrors.password = "Password too short.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const loginPayload = { email: email.trim(), password: password, role: role.toLowerCase() };
      const response = await axios.post("https://skillbridge-backend-3-vqsm.onrender.com/api/users/login", loginPayload);
      const token = response.data?.token;
      
      if (!token) throw new Error("Missing Token");
      
      const isEmployer = role.toLowerCase() === "employer";
      const dashboardApi = isEmployer 
        ? "https://skillbridge-backend-3-vqsm.onrender.com/api/employer-detail/dashboard" 
        : "https://skillbridge-backend-3-vqsm.onrender.com/api/candidate-detail/dashboard";
      
      const dashResponse = await axios.get(dashboardApi, {
        headers: { Authorization: `Bearer ${token}`, user: JSON.stringify(loginPayload) }
      });

      console.log(dashResponse.data);
      
      dispatch(setDashboardData(dashResponse.data));
      dispatch(loginSuccess({ res : dashResponse.data.message}));
      toast.success("Login Successful!");
      navigate(isEmployer ? "/employer-dashboard" : "/candidate-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f3f4f6] overflow-hidden">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-slate-100 my-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Sign in</h1>
            <p className="text-slate-500 text-sm mt-1">Access your SkillBridge account</p>
          </div>

          <div className="flex justify-center gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
            {["candidate", "employer"].map((r) => (
              <button 
                key={r} 
                type="button" 
                onClick={() => setRole(r)} 
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${role === r ? "bg-white text-[#0a66c2] shadow-sm" : "text-slate-400 hover:text-slate-500"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                className={`w-full border-b-2 py-2 outline-none transition-all bg-transparent px-1 text-slate-700 ${errors.email ? "border-red-500" : "border-slate-200 focus:border-[#0a66c2]"}`} 
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value);
                  if(errors.email) setErrors({...errors, email: ""});
                }} 
                placeholder="Your email"
                required 
              />
              {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.email}</p>}
            </div>

            <div className="relative text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={`w-full border-b-2 py-2 outline-none transition-all bg-transparent px-1 pr-10 text-slate-700 ${errors.password ? "border-red-500" : "border-slate-200 focus:border-[#0a66c2]"}`} 
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if(errors.password) setErrors({...errors, password: ""});
                  }} 
                  placeholder="Your password"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.password}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full h-12 rounded-xl text-white font-bold transition-all shadow-lg mt-2 ${loading ? "bg-slate-300 cursor-not-allowed" : "bg-[#0a66c2] hover:bg-[#084d91]"}`}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <Link to="/register-email" className="text-[#0a66c2] font-bold hover:underline">Join now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;