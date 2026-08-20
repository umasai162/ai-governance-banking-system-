import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LoanBias from "./components/LoanBias";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LoanRegulations from "./components/LoanRegulations";
import GovernmentSchemes from "./components/GovernmentSchemes";
import PolicyAnalyzer from "./components/PolicyAnalyzer";
import Chatbot from "./components/Chatbot";
import FraudMonitor from "./components/FraudMonitor";
import Footer from "./components/Footer";

function App() {

  const [language, setLanguage] = useState("en");

  return (
    <BrowserRouter>

      {/* Language Switch */}
      <div style={{ padding: "10px", textAlign: "right" }}>
        <button onClick={() => setLanguage("en")}>
          English
        </button>

        <button
          onClick={() => setLanguage("te")}
          style={{ marginLeft: "10px" }}
        >
          తెలుగు
        </button>
      </div>
      

      <Routes>

        <Route path="/" element={<Login language={language} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <Dashboard />
                <Chatbot language={language}/>
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-bias"
          element={
            <ProtectedRoute allowedRoles={["admin","auditor"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <LoanBias language={language}/>
                <Chatbot language={language}/>
              </>
            </ProtectedRoute>
          }
        />

<Route
          path="/fraud"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <FraudMonitor/>
                 <Chatbot language={language}/>
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/loan-regulations"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <LoanRegulations language={language}/>
                <Chatbot language={language}/>
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/government-schemes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <GovernmentSchemes language={language}/>
                <Chatbot language={language}/>
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/policy-analyzer"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Navbar language={language}/>
                <Sidebar language={language}/>
                <PolicyAnalyzer language={language}/>
              </>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
<Footer />
    </BrowserRouter>
  );
  
}

export default App;