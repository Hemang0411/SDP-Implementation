import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import ForgotPasswordOTP from "./Private_routes/ForgotPasswordOTP";
import ForgotPasswordMain from "./Private_routes/ForgotPasswordMain"
import Registration from "./Private_routes/Registration";
import RegistrationEmail from "./components/RegistrationEmail";
import VerifyEmail from "./Private_routes/VerifyEmail";
import Candidate_Dashboard from "./Private_routes/Candidate_Dashboard";
import Employer_Dashboard from "./Private_routes/Employer_Dashboard";
import EmployerJobs from "./Private_routes/EmployerJobs"
import ProtectedRoute from "./Private_routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import EmployerProtected from "./Private_routes/EmployerProtected";
import VerifyProtected from "./Private_routes/VerifyProtected";
import RegisterProtected from "./Private_routes/RegisterProtected";
import ForgotProtected from "./Private_routes/ForgotProtected";
import ViewMatchedDetails from "./Private_routes/ViewMatchedDetails";
import CandidateProfile from "./Private_routes/CandidateProfile";
import ViewMatched from "./Private_routes/ViewMatched";
import ViewApplied from "./Private_routes/ViewApplied";
import ViewAppliedDetails from "./Private_routes/ViewAppliedDetails";

function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="min-h-screen w-full bg-[#f3f4f6] pt-14 sm:pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password-email" element={<ForgotPasswordEmail />} />
          <Route path="/forgot-password-otp" element={<ForgotProtected><ForgotPasswordOTP /></ForgotProtected>} />  
          <Route path="/forgot-password-main" element={<ForgotProtected><ForgotPasswordMain /></ForgotProtected>} />                  
          <Route path="/register-email" element={<RegistrationEmail />} />
          <Route path="/verify-email" element={<VerifyProtected><VerifyEmail /></VerifyProtected>} />
          <Route path="/registration" element={<RegisterProtected><Registration /></RegisterProtected>} />
          <Route path="/candidate-dashboard" element={<ProtectedRoute><Candidate_Dashboard /></ProtectedRoute>} />
          <Route path="/viewapplied" element={<ProtectedRoute><ViewApplied/></ProtectedRoute>} />
          <Route path="/viewapplied-details" element={<ProtectedRoute><ViewAppliedDetails/></ProtectedRoute>} />
          <Route path="viewmatched" element={<ProtectedRoute><ViewMatched /></ProtectedRoute>} />
          <Route path="/candidate-profile" element={<ProtectedRoute><CandidateProfile /></ProtectedRoute>} />
          <Route path="/viewmatched-details" element={<ProtectedRoute><ViewMatchedDetails /></ProtectedRoute>} />
          <Route path="/employer-dashboard" element={<EmployerProtected><Employer_Dashboard /></EmployerProtected>} />
          <Route path="/employer-jobs" element={<EmployerProtected><EmployerJobs /></EmployerProtected>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </Router>
  );
}

export default App;