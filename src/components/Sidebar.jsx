import { NavLink } from "react-router-dom";
import { translations } from "../translations";

function Sidebar({ language }) {

  const t = translations[language];

  return (
    <div style={sidebarStyle}>

      <h2 style={logoStyle}>🤖 AI Panel</h2>

      <NavItem to="/dashboard" label={t.dashboard} icon="📊" />
      <NavItem to="/loan-bias" label={t.loanBias} icon="⚖️" />
      <NavItem to="/fraud" label={t.fraudMonitor} icon="🚨" />
      <NavItem to="/loan-regulations" label={t.loanRegulations} icon="📜" />
      <NavItem to="/government-schemes" label={t.governmentSchemes} icon="🏛️" />

    </div>
  );
}

/* ---------- Nav Item ---------- */

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...linkStyle,
        background: isActive ? "rgba(59,130,246,0.2)" : "transparent",
        borderLeft: isActive ? "4px solid #3b82f6" : "4px solid transparent",
        transform: isActive ? "scale(1.02)" : "scale(1)"
      })}
    >
      <span style={iconStyle}>{icon}</span>
      {label}
    </NavLink>
  );
}

/* ---------- Styles ---------- */

const sidebarStyle = {
  width: "240px",
  height: "100vh",
  background: "linear-gradient(180deg,#020617,#0f172a,#020617)",
  position: "fixed",
  left: 0,
  top: 0,
  paddingTop: "20px",
  boxShadow: "5px 0 20px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column"
};

const logoStyle = {
  color: "white",
  textAlign: "center",
  marginBottom: "30px",
  fontWeight: "bold",
  letterSpacing: "1px"
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 20px",
  color: "#cbd5f5",
  textDecoration: "none",
  transition: "all 0.3s ease",
  fontWeight: "500"
};

const iconStyle = {
  fontSize: "18px"
};

export default Sidebar;