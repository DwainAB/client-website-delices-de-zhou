import React from "react";
import Logo from "../assets/logo.png";

const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  logo: {
    width: "250px", // Augmentez la taille de base de l'image
    animation: "spinAndGrow 2s infinite"
  },
  message: {
    fontSize: "2em",
    fontWeight: "bold", // Met le texte en gras
    marginTop: "20px",
    color: "#fff"
  },
  "@keyframes spinAndGrow": {
    "0%": { transform: "rotate(0deg) scale(1)" },
    "25%": { transform: "rotate(360deg) scale(1.5)" },
    "50%": { transform: "rotate(360deg) scale(1)" },
    "100%": { transform: "rotate(360deg) scale(1)" }
  }
};

function Maintenance() {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spinAndGrow {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(360deg) scale(1.5); }
            50% { transform: rotate(360deg) scale(1); }
            100% { transform: rotate(360deg) scale(1); }
          }
        `}
      </style>
      <img src={Logo} alt="Logo" style={styles.logo} />
      <p style={styles.message}>En maintenance...</p>
    </div>
  );
}

export default Maintenance;
