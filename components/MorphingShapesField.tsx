import React, { useMemo } from "react";
import MorphingShape from "./MorphingShape";

const NUM_SHAPES = 100;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

const MorphingShapesField = () => {
  // Memoriza posiciones y delays para que no cambien en cada render
  const shapes = useMemo(
    () =>
      Array.from({ length: NUM_SHAPES }).map(() => ({
        left: randomBetween(3, 100),
        top: randomBetween(5, 100),
        delay: randomBetween(0, 1),
        scale: randomBetween(0.1, 1.0),
      })),
    []
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {shapes.map((s, i) => (
        <MorphingShape
          key={i}
          left={s.left}
          top={s.top}
          delay={s.delay}
          scale={s.scale}
        />
      ))}
    </div>
  );
};

export default MorphingShapesField;