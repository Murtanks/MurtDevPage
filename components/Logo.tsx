import { animate, createScope, spring, createDraggable } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import murtLogo from '../assets/MurtDev.svg'; // Ajusta la ruta si tu SVG está en otra carpeta

const Logo: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: .7 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: .7 })
      });

      self.add('rotateLogo', (i: number) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    });

    return () => scope.current.revert();
  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const newRotations = prev + 1;
      scope.current.methods.rotateLogo(newRotations);
      return newRotations;
    });
  };

  return (
    <div ref={root} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={murtLogo} className="logo" alt="MurtDev logo" width={120} height={120} />
      </div>
      
    </div>
  );
};

export default Logo;