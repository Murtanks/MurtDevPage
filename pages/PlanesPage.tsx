import React from "react";
import styles from "../styles/PlanesPage.module.css";

const planes = [
  { nombre: "Plan Básico", precio: 15000 },
  { nombre: "Plan Intermedio", precio: 25000 },
  { nombre: "Plan Premium", precio: 40000 },
];

const PlanesPage = () => (
  <div className={styles.container}>
    <h1>Planes</h1>
    <div className={styles.planesGrid}>
      {planes.map((plan, idx) => (
        <div key={idx} className={styles.planCard}>
          <h2>{plan.nombre}</h2>
          <p>${plan.precio} + IVA</p>
          <button className={styles.button}>Contratar</button>
        </div>
      ))}
    </div>
  </div>
);

export default PlanesPage;
