import { useState } from "react";
import axios from "axios";
import { translations } from "../translations";

function PolicyAnalyzer({ language }) {

  const t = translations[language];

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const uploadFile = async () => {

    if (!file) {
      alert(language === "en"
        ? "Please upload a file"
        : "దయచేసి ఫైల్ అప్లోడ్ చేయండి");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post(
        "http://localhost:5001/analyze",
        formData
      );

      setResult(res.data.analysis);

    } catch (error) {
      console.error(error);

      alert(language === "en"
        ? "Analysis failed"
        : "విశ్లేషణ విఫలమైంది");
    }
  };

  return (

    <div style={{ padding: "30px", color: "white", marginLeft: "220px" }}>

      <h2>{t.policyAnalyzer}</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={uploadFile}
        style={{
          padding: "10px 20px",
          background: "#6366f1",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer"
        }}
      >
        {t.analyze}
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h3>
            {language === "en"
              ? "AI Policy Analysis"
              : "ఏఐ పాలసీ విశ్లేషణ"}
          </h3>

          <pre>{result}</pre>
        </div>
      )}

    </div>
  );
}

export default PolicyAnalyzer;