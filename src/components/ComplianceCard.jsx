import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ComplianceCard() {
  const data = [
    { name: "Compliant", value: 91 },
    { name: "Non-Compliant", value: 9 }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const cardStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginBottom: "20px" }}>
        Compliance Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ComplianceCard;
