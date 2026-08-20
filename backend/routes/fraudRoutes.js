const db = require("../db");

exports.getFraudData = (req, res) => {
  const sql = `
    SELECT
      COUNT(*) as total,
      COALESCE(SUM(CASE WHEN risk='High' THEN 1 ELSE 0 END),0) as high,
      COALESCE(SUM(CASE WHEN risk='Medium' THEN 1 ELSE 0 END),0) as medium,
      COALESCE(SUM(CASE WHEN risk='Low' THEN 1 ELSE 0 END),0) as low
    FROM risk_predictions
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Fraud error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const data = result[0];

    let fraudRiskLevel = "Low";

    if (data.total > 0) {
      const percent = (data.high / data.total) * 100;

      if (percent > 40) fraudRiskLevel = "High";
      else if (percent > 20) fraudRiskLevel = "Medium";
    }

    res.json({
      total: Number(data.total),
      high: Number(data.high),
      medium: Number(data.medium),
      low: Number(data.low),
      fraudRiskLevel
    });
  });
};