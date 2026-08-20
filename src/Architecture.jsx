function Architecture() {

  return (
    <div style={{ marginLeft: "240px", padding: "40px", color: "white" }}>

      <h2>AI Governance System Architecture</h2>

      <p>User → React Frontend Dashboard</p>
      <p>React → Node.js / Express API</p>
      <p>API → AI Loan Decision Engine</p>
      <p>AI Engine → Fraud Monitoring</p>
      <p>AI Engine → Bias Detection</p>
      <p>Compliance Engine monitors AI decisions</p>
      <p>All predictions stored in MySQL (Audit Logs)</p>

    </div>
  );

}

export default Architecture;