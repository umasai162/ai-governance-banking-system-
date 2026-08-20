import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RiskAnalytics({ analytics }) {

  const high = analytics?.high || 0;
  const medium = analytics?.medium || 0;
  const low = analytics?.low || 0;

  const data = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        label: "Loan Risk Distribution",
        data: [high, medium, low],
        backgroundColor: [
          "rgba(239,68,68,0.8)",
          "rgba(245,158,11,0.8)",
          "rgba(34,197,94,0.8)"
        ],
        borderRadius: 10,
        barThickness: 50
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: { size: 14 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#334155" }
      }
    }
  };

  return (
    <div style={containerStyle}>

      <h2 style={titleStyle}>📊 Loan Risk Analytics</h2>

      {/* 🔥 Summary Cards */}
      <div style={cardContainer}>
        <StatCard title="High Risk" value={high} color="#ef4444" />
        <StatCard title="Medium Risk" value={medium} color="#f59e0b" />
        <StatCard title="Low Risk" value={low} color="#22c55e" />
      </div>

      {/* 🔥 Chart */}
      <div style={chartWrapper}>
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}

/* ---------- Cards ---------- */

function StatCard({ title, value, color }) {
  return (
    <div style={{
      ...cardStyle,
      border: `1px solid ${color}`
    }}>
      <h4>{title}</h4>
      <h1 style={{ color }}>{value}</h1>
    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  marginTop: "40px",
  padding: "20px",
  borderRadius: "16px",
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
};

const titleStyle = {
  marginBottom: "20px",
  textAlign: "center",
  fontWeight: "bold"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  marginBottom: "30px",
  flexWrap: "wrap"
};

const cardStyle = {
  padding: "20px",
  borderRadius: "12px",
  minWidth: "150px",
  textAlign: "center",
  background: "rgba(15,23,42,0.7)",
  boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
};

const chartWrapper = {
  padding: "20px",
  background: "#0f172a",
  borderRadius: "12px"
};

export default RiskAnalytics;