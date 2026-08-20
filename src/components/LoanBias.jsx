import { useEffect, useState } from "react";

function LoanBias() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/bias")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  if (!data) {
    return <div style={containerStyle}>Loading AI Bias Analysis...</div>;
  }

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>⚖️ AI Loan Bias Detection</h1>

      {/* 🔥 TOP CARDS */}
      <div style={cardContainer}>
        <StatCard title="Model Accuracy" value={data.accuracy} color="#3b82f6" />
        <StatCard title="Fraud Alerts" value={data.fraudAlerts} color="#ef4444" />
        <StatCard title="Compliance" value={data.complianceStatus} color="#22c55e" />
      </div>

      {/* 🔥 MAIN PANEL */}
      <div style={glassCard}>

        <h3 style={{ marginBottom: "25px", textAlign: "center" }}>
          Bias Distribution Analysis
        </h3>

        <BiasBar label="Gender Bias" value={data.genderBias} color="#f59e0b" />
        <BiasBar label="Region Bias" value={data.regionBias} color="#ef4444" />
        <BiasBar label="Income Bias" value={data.incomeBias} color="#3b82f6" />

        {/* STATUS */}
        <div style={statusStyle}>
          ✔ System Compliance: {data.complianceStatus}
        </div>

      </div>

    </div>
  );
}

/* ---------- STAT CARDS ---------- */

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

/* ---------- BIAS BAR ---------- */

function BiasBar({ label, value, color }) {

  // convert % if needed
  const percent = parseFloat(value) || 0;

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={rowHeader}>
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>

      <div style={barBg}>
        <div
          style={{
            ...barFill,
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}, #1e293b)`
          }}
        />
      </div>
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
  textAlign: "center",
  fontSize: "28px",
  fontWeight: "bold"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "30px",
  flexWrap: "wrap"
};

const statCard = {
  background: "rgba(30,41,59,0.6)",
  padding: "25px",
  borderRadius: "14px",
  minWidth: "180px",
  textAlign: "center",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
};

const glassCard = {
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(15px)",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const rowHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "6px"
};

const barBg = {
  height: "14px",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden"
};

const barFill = {
  height: "100%",
  borderRadius: "10px",
  transition: "1s ease"
};

const statusStyle = {
  marginTop: "25px",
  textAlign: "center",
  color: "#22c55e",
  fontWeight: "bold",
  fontSize: "18px"
};

export default LoanBias;