import Particles from "react-tsparticles";

const StarBackground = () => (
  <Particles
    id="tsparticles"
    style={{ position: "fixed", inset: 0, zIndex: -10 }}
    options={{
      fullScreen: { enable: false },
      
      background: { color: "#000000" }
    }}
  />
);

export default StarBackground;
