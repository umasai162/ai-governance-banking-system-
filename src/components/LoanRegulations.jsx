function LoanRegulations() {

  const securedLoans = [
    "Home Loan – Purchase or construction of residential property",
    "Loan Against Property (LAP) – Using property as collateral",
    "Auto Loan – For purchasing vehicles",
    "Gold Loan – Loan secured by gold ornaments",
    "Loan Against Securities – Shares, mutual funds",
    "Loan Against Fixed Deposit – Funds against FD",
    "Commercial Vehicle / Equipment Loan"
  ];

  const unsecuredLoans = [
    "Personal Loan – Medical, travel, wedding",
    "Consumer Durable Loan – Electronics",
    "Education Loan – Tuition & academics",
    "Business Loan – Expansion or working capital",
    "Payday Loan – Short-term emergency",
    "Credit Card Loan / Cash Advance"
  ];

  const specialLoans = [
    "Agricultural Loan – Farmers",
    "Top‑up Loan – Extra on existing loan",
    "Debt Consolidation Loan",
    "Bridge Loan – Short-term funding"
  ];

  const bankRates = [
    { bank: "SBI", home: "8.4%", personal: "11.2%", vehicle: "9.1%", education: "9.2%", gold: "7.5%" },
    { bank: "HDFC", home: "8.6%", personal: "10.8%", vehicle: "9.3%", education: "9.5%", gold: "7.8%" },
    { bank: "ICICI", home: "8.7%", personal: "11.5%", vehicle: "9.4%", education: "9.7%", gold: "8.0%" },
    { bank: "Axis", home: "8.8%", personal: "12%", vehicle: "9.5%", education: "9.8%", gold: "8.2%" },
    { bank: "Union", home: "7.15%", personal: "8.75%", vehicle: "7.50%", education: "6.75%", gold: "9.80%" }
  ];

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>🏦 Loan Regulations & Policies</h1>

      {/* 🔥 GRID CARDS */}
      <div style={gridContainer}>
        <LoanCard title="🔐 Secured Loans" list={securedLoans} />
        <LoanCard title="💳 Unsecured Loans" list={unsecuredLoans} />
        <LoanCard title="⚙️ Special Loans" list={specialLoans} />
      </div>

      {/* 🔥 BANK TABLE */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>📊 Bank Interest Rates</h3>

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Bank</th>
                <th>Home</th>
                <th>Personal</th>
                <th>Vehicle</th>
                <th>Education</th>
                <th>Gold</th>
              </tr>
            </thead>

            <tbody>
              {bankRates.map((bank, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: "bold" }}>{bank.bank}</td>
                  <td>{bank.home}</td>
                  <td>{bank.personal}</td>
                  <td>{bank.vehicle}</td>
                  <td>{bank.education}</td>
                  <td>{bank.gold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔥 RBI RULES */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>📜 RBI Lending Guidelines</h3>

        <div style={rulesGrid}>
          <RuleCard text="EMI ≤ 40% of income" />
          <RuleCard text="Credit Score ≥ 650" />
          <RuleCard text="Minimum Age: 21+" />
          <RuleCard text="KYC Mandatory" />
          <RuleCard text="Stable Income Required" />
        </div>
      </div>

    </div>
  );
}

/* ---------- LOAN CARD ---------- */

function LoanCard({ title, list }) {
  return (
    <div style={cardStyle}>
      <h3 style={sectionTitle}>{title}</h3>

      {list.map((loan, index) => (
        <p key={index} style={listItem}>✔ {loan}</p>
      ))}
    </div>
  );
}

/* ---------- RULE CARD ---------- */

function RuleCard({ text }) {
  return (
    <div style={ruleCard}>
      ✔ {text}
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

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const cardStyle = {
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const sectionTitle = {
  marginBottom: "15px",
  textAlign: "center"
};

const listItem = {
  padding: "6px 0",
  color: "#cbd5f5"
};

/* ---------- TABLE ---------- */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const rulesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "15px",
  marginTop: "20px"
};

const ruleCard = {
  background: "#0f172a",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  color: "#22c55e",
  fontWeight: "bold",
  boxShadow: "0 5px 15px rgba(0,0,0,0.4)"
};

export default LoanRegulations;