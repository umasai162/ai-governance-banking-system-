import { useEffect, useState } from "react";

function FraudMonitor({ analytics }) {

  const [animatedHigh, setAnimatedHigh] = useState(0);

  const [localAnalytics, setLocalAnalytics] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {
    if (!analytics) {
      fetch("http://localhost:5001/analytics")
        .then(res => res.json())
        .then(data => setLocalAnalytics(data))
        .catch(err => console.log(err));
    }
  }, [analytics]);

  const total = analytics?.total ?? localAnalytics.total;
  const high = analytics?.high ?? localAnalytics.high;
  const safe = total - high;

  const percent = total ? ((high / total) * 100).toFixed(1) : 0;

  const riskLevel =
    high > 10 ? "High" : high > 5 ? "Medium" : "Low";

  useEffect(() => {
    setAnimatedHigh(0);
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      setAnimatedHigh(start);
      if (start >= high) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [high]);

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>🚨 AI Fraud Intelligence</h1>

      {/* 🔥 RISK BADGE */}
      <div
        style={{
          ...badgeStyle,
          background:
            riskLevel === "High"
              ? "linear-gradient(90deg,#ef4444,#dc2626)"
              : riskLevel === "Medium"
              ? "linear-gradient(90deg,#f59e0b,#d97706)"
              : "linear-gradient(90deg,#22c55e,#16a34a)"
        }}
      >
        {riskLevel} RISK
      </div>

      {/* 🔥 CARDS */}
      <div style={cardContainer}>
        <GlassCard title="Total" value={total} />
        <GlassCard title="High Risk" value={animatedHigh} color="#ef4444" />
        <GlassCard title="Safe Loans" value={safe} color="#22c55e" />
        <GlassCard title="Fraud %" value={`${percent}%`} color="#f59e0b" />
      </div>

      {/* 🚨 ALERT */}
      {high > 5 && (
        <div style={alertStyle}>
          ⚠ High fraud activity detected
        </div>
      )}

      {/* 🔥 PROGRESS */}
      <div style={progressWrapper}>
        <div style={progressLabel}>Fraud Distribution</div>

        <div style={progressBarBg}>
          <div
            style={{
              ...progressBarFill,
              width: `${percent}%`
            }}
          />
        </div>
      </div>

      {/* 🔥 CIRCLE */}
      <div style={circleWrapper}>
        <svg width="200" height="200">

          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#1e293b"
            strokeWidth="15"
            fill="none"
          />

          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#grad)"
            strokeWidth="15"
            fill="none"
            strokeDasharray={502}
            strokeDashoffset={502 - (502 * percent) / 100}
            strokeLinecap="round"
            style={{ transition: "1s ease" }}
          />

          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#ef4444"/>
              <stop offset="100%" stopColor="#f59e0b"/>
            </linearGradient>
          </defs>

          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="26"
            fontWeight="bold"
          >
            {percent}%
          </text>

        </svg>
      </div>

    </div>
  );
}

/* ---------- CARD ---------- */

function GlassCard({ title, value, color }) {
  return (
    <div style={{
      ...glassCardStyle,
      border: `1px solid ${color || "#334155"}`
    }}>
      <h4>{title}</h4>
      <h1 style={{ color: color || "#38bdf8" }}>{value}</h1>
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  marginLeft: "240px",
  padding: "40px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a,#020617)",
  color: "white",
  animation: "fadeIn 0.5s ease"
};

const titleStyle = {
  marginBottom: "20px",
  fontWeight: "bold",
  fontSize: "28px",
  textAlign: "center"
};

const badgeStyle = {
  display: "inline-block",
  padding: "10px 25px",
  borderRadius: "30px",
  fontWeight: "bold",
  marginBottom: "30px",
  boxShadow: "0 0 15px rgba(255,255,255,0.2)"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const glassCardStyle = {
  backdropFilter: "blur(15px)",
  background: "rgba(30,41,59,0.6)",
  padding: "25px",
  borderRadius: "15px",
  minWidth: "180px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  transition: "0.3s"
};

const alertStyle = {
  background: "linear-gradient(90deg,#ef4444,#b91c1c)",
  padding: "12px",
  marginTop: "25px",
  borderRadius: "10px",
  fontWeight: "bold",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(239,68,68,0.6)"
};

const progressWrapper = {
  marginTop: "40px"
};

const progressLabel = {
  marginBottom: "10px",
  textAlign: "center"
};

const progressBarBg = {
  height: "20px",
  background: "#1e293b",
  borderRadius: "10px",
  overflow: "hidden"
};

const progressBarFill = {
  height: "100%",
  background: "linear-gradient(90deg,#ef4444,#f59e0b)",
  transition: "1s ease"
};

const circleWrapper = {
  marginTop: "50px",
  display: "flex",
  justifyContent: "center"
};

export default FraudMonitor;