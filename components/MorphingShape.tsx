import React, { useEffect, useRef, useState } from "react";
import * as flubber from "flubber";

// Paths para las formas
const PATHS = [
  // Círculo
  "M24,4 a20,20 0 1,0 0.00001,0z",
  // Triángulo
  "M24,6 L44,42 L4,42 Z",
  // Cuadrado
  "M8,8 H40 V40 H8 Z",
  // Estrella
  "M24,4 L29,18 L44,18 L32,28 L36,44 L24,34 L12,44 L16,28 L4,18 L19,18 Z"
];

const COLORS = ["#00cfff", "#ffd700", "#00ffb3", "#ff6f00"];

type MorphingShapeProps = {
  left?: number;
  top?: number;
  delay?: number;
  scale?: number;
};

const MorphingShape = ({ left = 50, top = 50, delay = 0, scale = 1 }: MorphingShapeProps) => {
  const [shapeIdx, setShapeIdx] = useState(0);
  const [path, setPath] = useState(PATHS[0]);
  const [colorIdx, setColorIdx] = useState(0);
  const requestRef = useRef<number>();
  const progressRef = useRef(0);
  const interpolatorRef = useRef<((t: number) => string) | null>(null);

  useEffect(() => {
    let timeout: number;
    timeout = window.setTimeout(() => {
      const nextIdx = (shapeIdx + 1) % PATHS.length;
      interpolatorRef.current = flubber.interpolate(PATHS[shapeIdx], PATHS[nextIdx], { maxSegmentLength: 2 });
      progressRef.current = 0;
      let lastTime = performance.now();

      function animate(now: number) {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        progressRef.current += dt / 1.2; // 1.2s morph
        if (interpolatorRef.current) {
          setPath(interpolatorRef.current(Math.min(progressRef.current, 1)));
        }
        if (progressRef.current < 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          setShapeIdx(nextIdx);
          setColorIdx((c) => (c + 1) % COLORS.length);
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    }, delay * 1000);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (timeout) clearTimeout(timeout);
    };
  }, [shapeIdx, delay]);

  return (
    <svg
      width={64 * scale}
      height={64 * scale}
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
        zIndex: -2,
      }}
    >
      <path d={path} fill={COLORS[colorIdx]} opacity={0.22} />
    </svg>
  );
};

export default MorphingShape;
