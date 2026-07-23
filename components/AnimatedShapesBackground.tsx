import React, { useEffect, useRef } from "react";
import styles from "../styles/AnimatedShapesBackground.module.css";

const SHAPES = [
  { type: "circle", color: "#00cfff" },
  { type: "triangle", color: "#ffd700" },
  { type: "square", color: "#00ffb3" },
  { type: "star", color: "#fff" },
  { type: "circle", color: "#ff6f00" },
  { type: "triangle", color: "#fff" },
  { type: "square", color: "#00cfff" },
  { type: "star", color: "#ffd700" },
];

function getShapeSVG(type: string, color: string) {
  switch (type) {
    case "circle":
      return <svg width="48" height="48"><circle cx="24" cy="24" r="20" fill={color} /></svg>;
    case "triangle":
      return <svg width="48" height="48"><polygon points="24,6 44,42 4,42" fill={color} /></svg>;
    case "square":
      return <svg width="48" height="48"><rect x="8" y="8" width="32" height="32" rx="7" fill={color} /></svg>;
    case "star":
      return <svg width="48" height="48"><polygon points="24,4 29,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 19,18" fill={color} /></svg>;
    default:
      return null;
  }
}

const AnimatedShapesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animación eliminada por solicitud del usuario

  return (
    <div className={styles.bgShapes} ref={containerRef}>
      {SHAPES.map((shape, idx) => (
        <div className={styles.shape} key={idx} style={{ left: `${12 + idx * 10}%`, top: `${10 + (idx % 4) * 20}%` }}>
          {getShapeSVG(shape.type, shape.color)}
        </div>
      ))}
    </div>
  );
};

export default AnimatedShapesBackground;
