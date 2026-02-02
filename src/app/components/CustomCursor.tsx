import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Add trail point every few pixels
      setTrail(prev => {
        const newTrail = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }
        ];
        return newTrail.slice(-12);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Trail Dots - Fade Out */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: (index / trail.length) * 0.4,
          }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 6px rgba(6, 182, 212, 0.6)',
              transform: `scale(${(index / trail.length) * 0.7})`
            }}
          />
        </div>
      ))}

      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: isHovering ? 0.5 : 1
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-3 h-3 bg-cyan-400 rounded-full"
          style={{
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.8), 0 0 24px rgba(6, 182, 212, 0.4)'
          }}
        />
      </motion.div>

      {/* Outer Circle with delay effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
        transition={{ 
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.8 : 1,
            borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.4)'
          }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 border-2 rounded-full"
          style={{
            borderColor: 'rgba(6, 182, 212, 0.4)'
          }}
        />
      </motion.div>

      {/* Hover Text */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            left: cursorPos.x + 25,
            top: cursorPos.y - 25,
          }}
        >
          <div className="bg-cyan-400 text-black px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            CLICK
          </div>
        </motion.div>
      )}

      {/* Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        animate={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
        transition={{ 
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        style={{
          transform: 'translate(-50%, -50%)'
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-32 h-32 bg-cyan-400 rounded-full blur-3xl"
        />
      </motion.div>
    </>
  );
}
