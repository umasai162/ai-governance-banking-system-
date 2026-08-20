import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!role) return alert("Please select a role");

try {
  const API = "https://banking-ai-governance-1.onrender.com";

  const res = await axios.post(`${API}/api/login`, { role });

  console.log(res.data); // 👈 add this

  localStorage.setItem("role", role);
  localStorage.setItem("isLoggedIn", "true");

  if (role === "admin") navigate("/dashboard");
  if (role === "auditor") navigate("/loan-bias");

} catch (error) {
  console.error("Login error:", error.response || error);
  alert("Login failed");
}
  };

  return (
    <div style={container}>

      {/* 🔥 BACKGROUND BLUR */}
      <div style={bgGlow}></div>

      {/* 🔥 LOGIN CARD */}
      <div style={card}>

        <h1 style={logo}>🏦</h1>

        <h2 style={title}>Banking AI</h2>
        <p style={subtitle}>Secure AI Governance Platform</p>

        {/* ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={input}
        >
          <option value="">Select your role</option>
          <option value="admin">Admin</option>
          <option value="auditor">Auditor</option>
        </select>

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin} style={button}>
          Continue
        </button>

        <p style={footer}>Powered by AI Governance System</p>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#020617,#0f172a,#020617)",
  position: "relative",
  overflow: "hidden"
};

/* Glow background */
const bgGlow = {
  position: "absolute",
  width: "400px",
  height: "400px",
  background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent)",
  filter: "blur(100px)",
  top: "20%",
  left: "30%"
};

/* Glass card */
const card = {
  backdropFilter: "blur(25px)",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "20px",
  padding: "40px",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  border: "1px solid rgba(255,255,255,0.1)",
  animation: "fadeIn 0.6s ease"
};

const logo = {
  fontSize: "40px",
  marginBottom: "10px"
};

const title = {
  color: "white",
  marginBottom: "5px"
};

const subtitle = {
  color: "#94a3b8",
  fontSize: "14px",
  marginBottom: "25px"
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "rgba(15,23,42,0.8)",
  color: "white",
  marginBottom: "20px",
  outline: "none",
  fontSize: "14px"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg,#3b82f6,#6366f1)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
};

const footer = {
  marginTop: "20px",
  fontSize: "12px",
  color: "#64748b"
};

export default Login;