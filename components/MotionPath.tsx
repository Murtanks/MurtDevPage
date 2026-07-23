import { useEffect, useRef, useState } from "react";
import { animate, svg } from "animejs";

const NUM_STARS = 20;
const NUM_STATIC = Math.floor(NUM_STARS / 5);

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const MotionPath: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ w: 1920, h: 1080 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      // Animación de estrellas en motion path
      for (let i = 0; i < NUM_STARS - NUM_STATIC; i++) {
        const star = svgRef.current.querySelector(`#star${i}`);
        const path = svgRef.current.querySelector(`#path${i}`);

        if (star && path) {
          animate(star, {
            draw: "0 1",
            ease: "linear",
            duration: 11000 + getRandom(0, 1000),
            loop: true,
            ...svg.createMotionPath(path)
          });

          animate(svg.createDrawable(path), {
            draw: "0 1",
            ease: "linear",
            duration: 11000 + getRandom(0, 1000),
            loop: true,
          });
        }
      }
      // Animación de brillo/palpitar en estrellas estáticas
      for (let i = NUM_STARS - NUM_STATIC; i < NUM_STARS; i++) {
        const staticStar = svgRef.current.querySelector(`#static-star${i}`);
        if (staticStar) {
          animate(staticStar, {
            opacity: [
              { to: 0.2, duration: getRandom(800, 1200), ease: "inOutSine" },
              { to: 0.9, duration: getRandom(800, 1200), ease: "inOutSine" }
            ],
            loop: true
          });
        }
      }
    }
  }, [dimensions]);

  if (!isMounted) return null;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.45
      }}
      viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
    >
      {/* Motion path stars */}
      {[...Array(NUM_STARS - NUM_STATIC)].map((_, i) => {
        const startX = getRandom(0, dimensions.w);
        const startY = getRandom(0, dimensions.h);
        const cp1X = getRandom(0, dimensions.w);
        const cp1Y = getRandom(0, dimensions.h);
        const endX = getRandom(0, dimensions.w);
        const endY = getRandom(0, dimensions.h);

        return (
          <g key={i}>
            <path
              id={`path${i}`}
              d={`M${startX},${startY} Q${cp1X},${cp1Y} ${endX},${endY}`}
              stroke="#00cfff"
              strokeWidth="1.2"
              fill="none"
              opacity="0.18"
            />
            <polygon
              id={`star${i}`}
              points="0,-6 1.5,-2 6,0 1.5,2 0,6 -1.5,2 -6,0 -1.5,-2"
              fill="#fff"
              opacity={getRandom(0.5, 0.9)}
              transform={`scale(${getRandom(0.7, 1.2)})`}
            />
          </g>
        );
      })}
      {/* Static, pulsating stars */}
      {[...Array(NUM_STATIC)].map((_, i) => {
        const x = getRandom(0, dimensions.w);
        const y = getRandom(0, dimensions.h);
        return (
          <polygon
            key={i}
            id={`static-star${NUM_STARS - NUM_STATIC + i}`}
            points="0,-6 1.5,-2 6,0 1.5,2 0,6 -1.5,2 -6,0 -1.5,-2"
            fill="#fff"
            opacity={getRandom(0.5, 0.9)}
            transform={`translate(${x},${y}) scale(${getRandom(0.7, 1.2)})`}
          />
        );
      })}
    </svg>
  );
};

export default MotionPath;
