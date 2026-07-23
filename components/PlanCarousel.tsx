import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/PlanCarousel.module.css";

interface Plan {
  nombre: string;
  precio: number;
  descripcion?: string;
  ofertaAnual?: string;
}

interface PlanCarouselProps {
  title: string;
  eyebrow?: string;
  plans: Plan[];
  detail?: string;
  onSelect?: (plan: Plan) => void;
}

const PlanCarousel: React.FC<PlanCarouselProps> = ({ title, eyebrow, plans, detail, onSelect }) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [plans.length]);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  const handleSelect = () => {
    if (onSelect) onSelect(plans[index]);
    else router.push("/PlanesPage");
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        {eyebrow && <p className={styles.carouselEyebrow}>{eyebrow}</p>}
        <h2 className={styles.carouselTitle}>{title}</h2>
        {detail && <div className={styles.carouselDetail}>{detail}</div>}
      </div>
      <div className={styles.carouselContent}>
      <button className={styles.arrow} onClick={handlePrev} aria-label="Plan anterior">&lt;</button>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.slider}
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {plans.map((plan, i) => (
            <div className={styles.planCard} key={i}>
              <h3 style={{color: '#fff'}}>{plan.nombre}</h3>
              <p style={{fontWeight:600, fontSize:"1.1rem", color:'#fff'}}>${plan.precio} + IVA</p>
              {plan.descripcion && <p style={{fontSize:"1.05rem", color:'#fff', opacity:0.95, margin: '0.5rem 0 0.2rem 0', lineHeight:1.5}}>{plan.descripcion}</p>}
              {plan.ofertaAnual && <div className={styles.ofertaAnual}>{plan.ofertaAnual}</div>}
              <button className={styles.button} onClick={handleSelect}>Quiero este plan <span>→</span></button>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.arrow} onClick={handleNext} aria-label="Siguiente plan">&gt;</button>
      </div>
      <div className={styles.progress} aria-label="Seleccionar un plan">
        {plans.map((plan, planIndex) => <button key={plan.nombre} className={`${styles.progressItem} ${planIndex === index ? styles.progressItemActive : ""}`} onClick={() => setIndex(planIndex)} aria-label={`Ver ${plan.nombre}`} aria-current={planIndex === index ? "true" : undefined} />)}
      </div>
    </div>
  );
};

export default PlanCarousel;
