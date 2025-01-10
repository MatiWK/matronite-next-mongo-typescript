import { useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';

interface typingText {
    text: string
}

const TypingText = ({
    text
}: typingText) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    text.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, text.length, {
        type: "tween",  
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
    });
    return controls.stop;
  }, [ text]);

  return (
    <span>
      <motion.span>
          <motion.span
          className='text-white text-2xl'
          
          >
            {displayText}
          </motion.span>
      </motion.span>
    </span>
  );
}

export default TypingText