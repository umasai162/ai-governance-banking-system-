import { useState } from "react";
import axios from "axios";

function RiskForm({ analytics, setAnalytics }) {

  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [employment, setEmployment] = useState("");

  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");

  const [risk, setRisk] = useState("");
  const [score, setScore] = useState(null);
  const [decision, setDecision] = useState("");
  const [explanation, setExplanation] = useState([]);

  const [reasons, setReasons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [takeHome, setTakeHome] = useState(null);

  const [eligibleLoan, setEligibleLoan] = useState(null);
  const [recommendedLoan, setRecommendedLoan] = useState(null);
  const [gender,setGender] = useState(null);

  const [maxLoan, setMaxLoan] = useState(null);

  const [probability, setProbability] = useState(null);
  const [notification,setNotification] = useState("");

  const [policyFile, setPolicyFile] = useState(null);
  const [policyResult, setPolicyResult] = useState(null);

  const [language, setLanguage] = useState("en");
  


  const [loanId,setLoanId] = useState(null);


  /* ---------------- AI RISK PREDICTION ---------------- */
const handleSubmit = () => {

  if (!income || !creditScore || !loanAmount) {
    alert("Please fill Salary, Credit score and Loan amount");
    return;
  }

  axios.post("http://localhost:5001/predict", {
    income: Number(income),
    credit_score: Number(creditScore),
    loan_amount: Number(loanAmount),
    employment
  })
  .then((res) => {

    console.log("API RESPONSE:", res.data);

    setLoanId(res.data.loan_id);
    setRisk(res.data.risk);
    setDecision(res.data.decision);
    setScore(res.data.model_accuracy);
    setProbability(res.data.probability);

    setReasons(res.data.reasons || []);
    setSuggestions(res.data.suggestions || []);

    const combinedExplanation = [
      ...(res.data.reasons || []),
      ...(res.data.suggestions || [])
    ];

    setExplanation(combinedExplanation);

    // 🔥 ADD THIS BLOCK (MAIN FIX)
    if (setAnalytics) {
      setAnalytics(prev => {
        const newTotal = prev.total + 1;
        const newHigh =
          res.data.risk === "High" ? prev.high + 1 : prev.high;

        return {
          ...prev,
          total: newTotal,
          high: newHigh,
          low: newTotal - newHigh
        };
      });
    }

  })
  .catch((err) => console.log(err));
};

  /* ---------------- EMI CALCULATION ---------------- */

  const calculateEMI = () => {

    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(years) * 12;

    if (!P || !R || !N) {
      alert("Enter Loan Amount, Interest Rate and Years");
      return;
    }

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPayment = emiValue * N;
    const interest = totalPayment - P;
    const salaryLeft = Number(income) - emiValue;

    setEmi(Math.round(emiValue));
    setTotalInterest(Math.round(interest));
    setTakeHome(Math.round(salaryLeft));
  };

  /* ---------------- LOAN ELIGIBILITY ---------------- */

  const calculateEligibility = () => {

    const salary = Number(income);
    const rate = Number(interestRate) / 12 / 100;
    const months = Number(years) * 12;

    if (!salary || !rate || !months) {
      alert("Enter Salary, Interest Rate and Years");
      return;
    }

    const maxEMI = salary * 0.4;

    const loan =
      (maxEMI * (Math.pow(1 + rate, months) - 1)) /
      (rate * Math.pow(1 + rate, months));

    setEligibleLoan(Math.round(loan));
  };

  /* ---------------- AI LOAN RECOMMENDATION ---------------- */
 const recommendLoan = () => {

  const salary = Number(income);

  if (!salary) {
    alert("Enter salary first");
    return;
  }

  const emi = salary * 0.4;
  const tenure = 120;

  const calculatedMaxLoan = emi * tenure;

  setMaxLoan(calculatedMaxLoan);

  // ✅ FINAL LOGIC (always safe)
  const recommended = calculatedMaxLoan * 0.8;

  setRecommendedLoan(Math.round(recommended));
};
  /* ---------------- APPEAL ---------------- */

  const submitAppeal = async () => {

    if(!loanId){
      alert("Predict loan first before appealing");
      return;
    }

    const res = await fetch("http://localhost:5001/appeal",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        loan_id: loanId,
        reason: "User requested reconsideration"
      })
    });

    await res.json();

    setNotification("✅ Appeal submitted successfully!");

    setTimeout(()=>{
      setNotification("")
    },3000);

  };

  /* ---------------- POLICY ANALYZER ---------------- */
const analyzePolicy = async (e) => {

  if (e) e.preventDefault();

  if (!policyFile) {
    setPolicyResult({ error: "Please upload a file first." });
    return;
  }

  const formData = new FormData();
  formData.append("file", policyFile);

  try {

    const res = await axios.post(
      "http://localhost:5001/analyze",
      formData
    );

    // save backend response
    setPolicyResult(res.data.analysis);

  } catch (error) {

    console.log(error);

    setPolicyResult({
      error: "Policy analysis failed. Please try again."
    });
  }
};


  return (

    <div style={{ marginLeft: "240px", padding: "40px", color: "white" }}>

      <h2>AI Loan Risk Prediction</h2>

      <input
        type="number"
        placeholder="Monthly Salary"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Credit Score"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />

      <br /><br />

      <select
        value={employment}
        onChange={(e) => setEmployment(e.target.value)}
      >
        <option value="">Select Employment</option>
        <option value="Government">Government</option>
        <option value="Private">Private</option>
        <option value="Self-Employed">Self-Employed</option>
      </select>

      <br /><br />

            <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Keep it private">Keep if private</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />

      <br /><br />
      

      <input
        type="number"
        placeholder="Loan Duration (Years)"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />

      <br /><br />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          marginRight: "5px",
          cursor:"pointer"
        }}
      >
        Predict Risk
      </button>

      <button
        onClick={calculateEMI}
        style={{
          padding: "10px 20px",
          background: "#22c55e",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          marginRight: "5px",
          cursor:"pointer"
        }}
      >
        Calculate EMI
      </button>

      <button
        onClick={calculateEligibility}
        style={{
          padding: "10px 20px",
          background: "#f59e0b",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          marginRight: "5px",
          cursor:"pointer"
        }}
      >
        Check Loan Eligibility
      </button>

      <button
        onClick={recommendLoan}
        style={{
          padding: "10px 20px",
          background: "#8b5cf6",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          marginRight: "5px",
          cursor:"pointer"
        }}
      >
        AI Loan Recommendation
      </button>

      <button
       onClick={submitAppeal}
       style={{
          padding: "10px 20px",
          background: "#85f65c",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          cursor:"pointer"
        }}>
      Appeal Decision
      </button>

      {notification && <p>{notification}</p>}

      {/*styles of buttons*/}
      

      {/* ---------------- AI RESULT ---------------- */}

      {score !== null && (

        <div style={{marginTop:"30px"}}>

          <h3>Decision: {decision}</h3>
          <p>Risk Level: {risk}</p>
          <h4>ML Model Accuracy: {score}%</h4>

          {probability && (
            <p>Approval Probability: {probability}%</p>
          )}

          <p>Prediction Time: {new Date().toLocaleString()}</p>

          <h4>AI Decision Explanation</h4>

          {explanation.map((item, index) => (
            <p key={index}>✔ {item}</p>
          ))}

          {reasons.length > 0 && (
            <>
              <h4>Decision Reasons</h4>
              {reasons.map((r, index) => (
                <p key={index}>⚠ {r}</p>
              ))}
            </>
          )}

          {suggestions.length > 0 && (
            <>
              <h4>Eligibility Improvement Suggestions</h4>
              {suggestions.map((s, index) => (
                <p key={index}>💡 {s}</p>
              ))}
            </>
          )}

        </div>

      )}

      {/* EMI RESULT */}

      {emi && (

        <div style={{marginTop:"30px"}}>

          <h3>Loan EMI Analysis</h3>

          <p>Monthly EMI: ₹{emi}</p>
          <p>Total Interest Payable: ₹{totalInterest}</p>
          <p>Take Home Salary After EMI: ₹{takeHome}</p>

        </div>

      )}

      {/* ELIGIBILITY */}

      {eligibleLoan && (

        <div style={{marginTop:"30px"}}>

          <h3>Loan Eligibility Analysis</h3>

          <p>Monthly Salary: ₹{income}</p>
          <p>Maximum EMI Allowed: ₹{(income * 0.4).toFixed(0)}</p>
          <p>Maximum Loan Bank Can Approve: ₹{eligibleLoan}</p>

        </div>

      )}

      {/* RECOMMENDATION */}

      {recommendedLoan && (

        <div style={{marginTop:"30px"}}>

          <h3>AI Loan Recommendation</h3>

          <p>Recommended Loan Amount: ₹{recommendedLoan}</p>
          <p>Suggested Tenure: 5 – 10 Years</p>

        </div>

      )}

      {/* ---------------- POLICY ANALYZER ---------------- */}

<div style={{
  marginTop: "30px",
  background: "#0f172a",
  padding: "20px",
  borderRadius: "10px"
}}>

  <h3>Insurance Policy Analyzer</h3>

  <input
    type="file"
    onChange={(e) => setPolicyFile(e.target.files[0])}
  />

  <br /><br />

<button
  type="button"
  onClick={analyzePolicy}
  style={{
    padding: "10px 20px",
    background: "#6366f1",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Analyze Policy
</button>

{/* -------- ERROR MESSAGE -------- */}
{policyResult && policyResult.error && (
  <div style={{ marginTop: "20px", color: "red" }}>
    <p><b>{policyResult.error}</b></p>
    <p><b>Detected Document Type:</b> {policyResult.doc_type}</p>
  </div>
)}

{/* -------- VALID LOAN RESULT -------- */}
{policyResult && !policyResult.error && (
  <div style={{ marginTop: "20px" }}>

    <p><b>Document Type:</b> {policyResult.doc_type}</p>

    <p><b>Safety Score:</b> {policyResult["Safety Score"]}</p>

    <p><b>Red Flags:</b></p>
    <ul>
      {policyResult["Red Flags"].map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <p><b>Benefits:</b></p>
    <ul>
      {policyResult["Benefits"].map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    <p><b>Coverage Gaps:</b></p>
    <ul>
      {policyResult["Coverage Gaps"].map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

  </div>
)}

</div>

    </div>
  );
}

export default RiskForm;