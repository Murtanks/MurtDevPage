import { useEffect, useRef } from "react";
import { animate, svg, stagger } from "animejs";

const CreateDrawable: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const lines = svgRef.current.querySelectorAll(".line");
      animate(svg.createDrawable(lines), {
        draw: ["0 0", "0 1", "1 1"],
        ease: "inOutQuad",
        duration: 2000,
        delay: stagger(100),
        loop: true,
      });
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width={200}
      height={200}
      viewBox="0 0 200 200"
      style={{ display: "block", margin: "2rem auto" }}
    >
      {/* Triángulo: tres líneas */}
      <line className="line" x1="100" y1="20" x2="180" y2="180" stroke="#eb2727" strokeWidth="4" />
      <line className="line" x1="180" y1="180" x2="20" y2="180" stroke="#eb2727" strokeWidth="4" />
      <line className="line" x1="20" y1="180" x2="100" y2="20" stroke="#eb2727" strokeWidth="4" />
    </svg>
  );
};

export default CreateDrawable;