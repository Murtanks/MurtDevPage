import { useEffect, useRef } from "react";
import { createTimeline, stagger, splitText } from "animejs";

type Props = {
  text: string;
  className?: string;
};

const TitleAnimate: React.FC<Props> = ({ text, className }) => {
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const { words, chars } = splitText(titleRef.current, {
        words: { wrap: 'clip' },
        chars: true,
      });

      createTimeline({
  loop: true,
  loopDelay: 400, // espera extra entre ciclos (en ms)
  defaults: { ease: 'inOut(3)', duration: 2000 } // animación más lenta
})
        .add(words, {
          y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
        }, stagger(125))
        .add(chars, {
          y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
        }, stagger(10, { from: 'random' }))
        .init();
    }
  }, [text]);

  return (
    <p
  ref={titleRef}
  className={className}
  style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "0.06em", margin: 0 }}
>
  {text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ))}
</p>
  );
};

export default TitleAnimate;