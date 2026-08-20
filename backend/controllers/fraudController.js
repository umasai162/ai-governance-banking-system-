const getFraudData = (req, res) => {
  res.json({
    highRisk: 4,
    mediumRisk: 6,
    lowRisk: 20,
    riskLevel: "Medium"
  });
};

module.exports = { getFraudData };
