import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Login from "./components/Login";
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

function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="min-h-screen w-full bg-[#f3f4f6] pt-14 sm:pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-email" element={<RegistrationEmail />} />
          <Route path="/verify-email" element={<VerifyProtected><VerifyEmail /></VerifyProtected>} />
          <Route path="/registration" element={<RegisterProtected><Registration /></RegisterProtected>} />
          <Route path="/candidate-dashboard" element={<ProtectedRoute><Candidate_Dashboard /></ProtectedRoute>} />
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