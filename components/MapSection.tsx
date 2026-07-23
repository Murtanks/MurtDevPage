import React from "react";

const MapSection = () => (
  <div style={{ background: "rgba(13,35,68,0.85)", borderRadius: "1rem", boxShadow: "0 2px 16px #00cfff44", padding: "2.2rem 1.7rem", color: "#fff", margin: "3rem auto 0 auto", maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2 style={{ color: "#00cfff", marginBottom: 12, fontFamily: "'Pixelify Sans', Arial, sans-serif", letterSpacing: "0.02em" }}>Dónde estamos</h2>
    <div style={{ marginBottom: 10, fontWeight: 500, fontSize: "1.08rem", fontFamily: "Montserrat, Arial, sans-serif" }}>Plaza de Copiapó, Atacama, Chile</div>
    <a href="https://www.google.com/maps?q=-27.3698175,-70.3303602" target="_blank" rel="noopener noreferrer" style={{ color: "#00cfff", marginBottom: 16, textDecoration: "underline", fontFamily: "Silkscreen, monospace", fontSize: "0.75rem" }}>Ver en Google Maps</a>
    <iframe title="Mapa Plaza de Copiapó" src="https://www.google.com/maps?q=-27.3698175,-70.3303602&z=17&output=embed" width="320" height="200" style={{ border: 0, borderRadius: "0.7rem", width: "100%", maxWidth: 400 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  </div>
);

export default MapSection;
