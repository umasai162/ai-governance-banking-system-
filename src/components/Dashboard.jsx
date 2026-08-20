import ComplianceCard from "./ComplianceCard";
import RiskForm from "./RiskForm";
import { useEffect, useState } from "react";
import RiskAnalytics from "./RiskAnalytics";
import Chatbot from "./Chatbot";

function Dashboard() {

  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {

    fetch("http://localhost:5000/api/governance-score")
      .then(res => res.json())
      .then(data => {
        setScore(data.governanceScore);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    fetch("http://localhost:5001/analytics")
      .then(res => res.json())
      .then(data => {
        setAnalytics(data);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>🚀 AI Governance Dashboard</h1>

      {/* 🔥 GOVERNANCE CARD */}
      {loading ? (
        <div style={scoreCard}>Loading...</div>
      ) : score !== null && (
        <div style={scoreCard}>
          <h3>AI Governance Score</h3>

          <h1 style={{
            fontSize: "40px",
            color:
              score > 85
                ? "#22c55e"
                : score > 70
                ? "#f59e0b"
                : "#ef4444"
          }}>
            {score}
          </h1>

          <p>System compliance & reliability</p>
        </div>
      )}

      {/* 🔥 STATS CARDS */}
      <div style={statsContainer}>

        <StatCard title="Total Predictions" value={analytics.total} color="#3b82f6" />
        <StatCard title="High Risk" value={analytics.high} color="#ef4444" />
        <StatCard title="System Status" value="Active" color="#22c55e" />

      </div>

      {/* 🔥 COMPLIANCE */}
      <div style={glassCard}>
        <ComplianceCard />
      </div>

      {/* 🔥 RISK FORM */}
      <div style={glassCard}>
        <RiskForm analytics={analytics} setAnalytics={setAnalytics} />
      </div>

      {/* 🔥 GRAPH */}
      <div style={glassCard}>
        <RiskAnalytics analytics={analytics} />
      </div>

      <Chatbot />

    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ title, value, color }) {
  return (
    <div style={{
      ...statCard,
      border: `1px solid ${color}`
    }}>
      <h4>{title}</h4>
      <h1 style={{ color }}>{value}</h1>
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  marginLeft: "240px",
  padding: "40px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a,#020617)",
  color: "white"
};

const titleStyle = {
  marginBottom: "30px",
  fontWeight: "bold",
  fontSize: "28px",
  textAlign: "center"
};

const scoreCard = {
  background: "linear-gradient(135deg,#1e293b,#020617)",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "30px",
  maxWidth: "320px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const statCard = {
  background: "rgba(30,41,59,0.6)",
  padding: "25px",
  borderRadius: "14px",
  minWidth: "200px",
  textAlign: "center",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  transition: "0.3s"
};

const glassCard = {
  marginTop: "30px",
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(15px)",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

export default Dashboard;