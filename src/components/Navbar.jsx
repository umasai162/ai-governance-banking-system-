import { useNavigate } from "react-router-dom";
import { translations } from "../translations";

function Navbar({ language }) {

  const t = translations[language];
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "15px 30px",
        fontSize: "18px",
        fontWeight: "600",
        marginLeft: "220px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <span>🏦{t.dashboardTitle}</span>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

        <span style={{ fontSize: "14px", opacity: 0.8 }}>
          {language === "en" ? "Role" : "పాత్ర"}: {role}
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500"
          }}
          onMouseOver={(e) => (e.target.style.background = "#dc2626")}
          onMouseOut={(e) => (e.target.style.background = "#ef4444")}
        >
          {language === "en" ? "Logout" : "లాగౌట్"}
        </button>

      </div>

    </div>
  );
}

export default Navbar;