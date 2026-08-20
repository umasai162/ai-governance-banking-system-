function Footer() {
  return (
<div style={footerStyle}>
  © {new Date().getFullYear()} (CSE-1) B.Manohar , B.Charan , A.Uma sai , A.Harish
  <span style={{ marginLeft: "15px", opacity: 1 }}>
    @Final year project.
    @ All rights reserved.
  </span>
</div>
  );
}

const footerStyle = {
  textAlign: "center",
  padding: "15px",
  color: "#083471",
  fontSize: "15px",
  marginTop: "auto"
};

export default Footer;