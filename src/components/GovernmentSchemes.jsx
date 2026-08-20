function GovernmentSchemes() {

  const schemes = [
    {
      name: "Pradhan Mantri Awas Yojana (PMAY)",
      category: "Housing Loan Subsidy",
      eligibility: "Low & Middle Income Families",
      benefit: "Interest subsidy up to 6.5%",
      link: "https://pmaymis.gov.in/"
    },
    {
      name: "PM Mudra Loan",
      category: "Business Loan",
      eligibility: "Entrepreneurs",
      benefit: "Loan up to ₹10 lakh",
      link: "https://www.mudra.org.in/"
    },
    {
      name: "Stand‑Up India Scheme",
      category: "Startup Loan",
      eligibility: "SC/ST & Women",
      benefit: "₹10 lakh – ₹1 crore",
      link: "https://www.standupmitra.in/"
    },
    {
      name: "Kisan Credit Card",
      category: "Agricultural Loan",
      eligibility: "Farmers",
      benefit: "Low interest loans",
      link: "https://pmkisan.gov.in/"
    },
    {
      name: "Education Loan Subsidy",
      category: "Education Loan",
      eligibility: "Students",
      benefit: "Interest subsidy",
      link: "https://www.vidyalakshmi.co.in/"
    }
  ];

  const bankSchemes = [
    { bank: "SBI", scheme: "Shaurya Loan", target: "Defense", benefit: "Low interest" },
    { bank: "HDFC", scheme: "Reach Loan", target: "Low income", benefit: "Affordable EMI" },
    { bank: "ICICI", scheme: "Education Loan", target: "Students", benefit: "Flexible repayment" },
    { bank: "Axis", scheme: "Women Loan", target: "Women", benefit: "Special rate" }
  ];

  return (
    <div style={containerStyle}>

      <h1 style={titleStyle}>🏛️ Government Loan Schemes</h1>

      {/* 🔥 SCHEME CARDS */}
      <div style={grid}>

        {schemes.map((scheme, index) => (
          <div key={index} style={card}>

            <h3>{scheme.name}</h3>

            <p><b>📂 Category:</b> {scheme.category}</p>
            <p><b>👤 Eligibility:</b> {scheme.eligibility}</p>
            <p><b>💰 Benefit:</b> {scheme.benefit}</p>

            <a href={scheme.link} target="_blank" rel="noreferrer" style={link}>
              View Scheme →
            </a>

          </div>
        ))}

      </div>

      {/* 🔥 BANK TABLE */}
      <div style={tableCard}>

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          🏦 Bank Loan Schemes
        </h2>

        <table style={table}>

          <thead>
            <tr>
              <th>Bank</th>
              <th>Scheme</th>
              <th>Target</th>
              <th>Benefit</th>
            </tr>
          </thead>

          <tbody>
            {bankSchemes.map((item, index) => (
              <tr key={index} style={row}>
                <td>{item.bank}</td>
                <td>{item.scheme}</td>
                <td>{item.target}</td>
                <td style={{ color: "#22c55e" }}>{item.benefit}</td>
              </tr>
            ))}
          </tbody>

        </table>

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
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "28px",
  fontWeight: "bold"
};

/* GRID */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
  gap: "20px",
  marginBottom: "40px"
};

/* CARD */
const card = {
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  transition: "0.3s"
};

/* LINK */
const link = {
  display: "inline-block",
  marginTop: "10px",
  color: "#60a5fa",
  textDecoration: "none"
};

/* TABLE CARD */
const tableCard = {
  background: "rgba(30,41,59,0.6)",
  backdropFilter: "blur(15px)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

/* TABLE */
const table = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const row = {
  borderBottom: "1px solid #334155"
};

export default GovernmentSchemes;