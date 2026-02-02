import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export function Reveal({ children, direction = 'up', delay = 0, className = '' }: RevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const directions = {
    left: { x: [-100, 0], y: [0, 0] },
    right: { x: [100, 0], y: [0, 0] },
    up: { x: [0, 0], y: [50, 0] },
    down: { x: [0, 0], y: [-50, 0] }
  };

  const x = useTransform(scrollYProgress, [0, 0.5], directions[direction].x);
  const y = useTransform(scrollYProgress, [0, 0.5], directions[direction].y);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScaleReveal({ children, className = '' }: ScaleRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, rotateX, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RotateRevealProps {
  children: ReactNode;
  className?: string;
}

export function RotateReveal({ children, className = '' }: RotateRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateY, opacity, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
}

export function BlurReveal({ children, className = '' }: BlurRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const blur = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        filter: useTransform(blur, (value) => `blur(${value}px)`)
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
