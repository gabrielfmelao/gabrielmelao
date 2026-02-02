import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import santanderLogo from 'figma:asset/526e5eb49223e6e9e96df5b76aebbbe7950bf08e.png';
import b3Logo from 'figma:asset/112bdf240ee590585e62a7234bf71f7e1aae6e0f.png';
import pismoLogo from 'figma:asset/99b2c1ce75b85009c91a3b807fd6aad82357ca5f.png';
import fleuryLogo from 'figma:asset/b81c92ebb9958893675a6aae06808ade9c735c2f.png';

export function Experience() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const companies = [
    { name: 'Santander', logo: santanderLogo },
    { name: 'B3', logo: b3Logo },
    { name: 'Pismo', logo: pismoLogo },
    { name: 'Grupo Fleury', logo: fleuryLogo }
  ];

  return (
    <section ref={containerRef} className="relative bg-zinc-950 py-20 px-6 overflow-hidden">
      {/* Animated Background Rays */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45])
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/10 to-transparent origin-top"
            style={{
              rotate: `${i * 45}deg`,
              transformOrigin: 'top center'
            }}
            animate={{
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            style={{
              scale: useTransform(scrollYProgress, [0, 0.3], [0.9, 1]),
              filter: useTransform(
                scrollYProgress,
                [0, 0.2, 0.8, 1],
                ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']
              )
            }}
            className="text-4xl md:text-5xl mb-4 text-white"
          >
            <span className="font-light">EXPERIÊNCIA EM</span>{' '}
            <span className="text-cyan-400">GRANDES EMPRESAS</span>
          </motion.h2>
          <motion.p
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
            }}
            className="text-white/60 text-lg tracking-wide"
          >
            Passagens por instituições de referência no mercado
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {companies.map((company, index) => {
            const logoRef = useRef(null);
            const { scrollYProgress: logoProgress } = useScroll({
              target: logoRef,
              offset: ['start end', 'end start']
            });

            return (
              <motion.div
                key={company.name}
                ref={logoRef}
                style={{
                  y: useTransform(logoProgress, [0, 0.5, 1], [80, 0, -80]),
                  rotateY: useTransform(logoProgress, [0, 0.5, 1], [45, 0, -45]),
                  scale: useTransform(logoProgress, [0, 0.3, 0.7, 1], [0.8, 1.1, 1.1, 0.8]),
                  opacity: useTransform(logoProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                  transformPerspective: 1000
                }}
                className="flex items-center justify-center p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                data-scroll-container
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.2), transparent)'
                  }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />

                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 relative z-10"
                  style={{ maxHeight: '60px' }}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
