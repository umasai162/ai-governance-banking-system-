const getLoanBias = (req, res) => {
  res.json({
    accuracy: "91%",
    biasLevel: "Low",
    fraudAlerts: 8,
    status: "Compliant"
  });
};

module.exports = { getLoanBias };
