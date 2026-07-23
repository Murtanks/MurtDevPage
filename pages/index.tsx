import Link from "next/link";
import Layout from "../components/Layout";
import PlanCarousel from "../components/PlanCarousel";
import React, { useState, useEffect } from "react";
import styles from "../styles/Hero.module.css";
import StarBackground from "../components/StarBackground";
import MapSection from "../components/MapSection";
import TitleAnimate from "@/components/TitleAnimate";
import MotionPath from "../components/MotionPath";
import CreateDrawable from "@/components/CreateDrawable";

const frases = [
  "Transforma tu negocio con tecnología a medida.",
  "Soluciones digitales para empresas modernas.",
  "Automatiza, crece y destaca en tu rubro.",
  "Desarrollo web, apps e IoT para tu empresa.",
];

const Hero = () => {
  const [fraseIdx, setFraseIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setFraseIdx((prev) => (prev === frases.length - 1 ? 0 : prev + 1)), 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="animation" className={styles.hero}>
      <div className={styles.heroContent}>
        <CreateDrawable />
        <TitleAnimate text="Soluciones Digitales" className={styles.heroText} />
      </div>
    </section>
  );
};

const IndexPage = () => (
  <>
    <MotionPath />
    <StarBackground />
    <Layout title="Soluciones Digitales a Medida">
      <Hero />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 380, margin: "3.5rem 0 2.5rem 0" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <PlanCarousel eyebrow="SOLUCIONES A TU MEDIDA" title="Un punto de partida para cada operación." detail="Desde inventario y reportes hasta control en terreno y automatización. Elige una solución y la adaptamos a tu negocio." plans={[
            { nombre: "Plan Básico Inventariado", precio: 15000, descripcion: "Inventariado simple y rápido para pymes." }, { nombre: "Plan Intermedio Inventariado", precio: 25000, descripcion: "Inventariado con reportes y exportación a Excel." }, { nombre: "Plan Premium Inventariado", precio: 40000, descripcion: "Inventariado avanzado, integración y soporte prioritario." }, { nombre: "Plan Gestión Básico", precio: 35000, descripcion: "Control de gestión para pequeñas faenas." }, { nombre: "Plan Gestión Pro", precio: 120000, descripcion: "Gestión avanzada, reportes y alertas automáticas.", ofertaAnual: "Oferta anual: $1.000.000" }, { nombre: "Plan Gestión Premium", precio: 200000, descripcion: "Gestión total, integración IoT y soporte full.", ofertaAnual: "Oferta anual: $1.800.000" }, { nombre: "Plan Horas Básico", precio: 25000, descripcion: "Gestión de horas y clientes para pymes." }, { nombre: "Plan Horas Pro", precio: 35000, descripcion: "Reportes automáticos en Excel y recordatorios." }, { nombre: "Plan Horas Premium", precio: 50000, descripcion: "Panel avanzado, exportación y soporte personalizado." }
          ]} />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", justifyContent: "center", margin: "3rem 0", zIndex: 1, position: "relative" }}>
        {[['Control de Gestión Minera', 'Plataforma para gestión y control de sondajes en faenas mineras. Optimiza recursos, reportes y seguimiento en tiempo real.'], ['Toma de Horas Paseo de Perros', 'App para pymes de paseo de perros: agenda, gestiona clientes y automatiza recordatorios de servicios.'], ['Control de Refrigerado Gym', 'Solución IoT para monitoreo y control de refrigeración en gimnasios. Alertas automáticas y reportes de temperatura.']].map(([title, text]) => <div key={title} style={{ background: "rgba(13,35,68,0.85)", borderRadius: "1rem", boxShadow: "0 2px 16px #00cfff44", padding: "2.2rem 1.7rem", minWidth: 240, maxWidth: 340, flex: 1, color: "#fff", backdropFilter: "blur(2px)", fontFamily: "Montserrat, Arial, sans-serif" }}><h2 style={{ color: "#00cfff", fontFamily: "'Pixelify Sans', Arial, sans-serif", letterSpacing: "0.02em" }}>{title}</h2><p>{text}</p></div>)}
      </div>
      <p style={{ textAlign: "center", marginTop: 40 }}>| <Link href="/PlanesPage">Ir a Planes</Link></p>
      <MapSection />
    </Layout>
  </>
);
export default IndexPage;
