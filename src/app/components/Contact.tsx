import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { ContactModal } from '@/app/components/ContactModal';
import { LogoFull } from '@/app/components/LogoFull';

export function Contact() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:contato@gabrielmelao.com.br' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabrielmelao/' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gamelao/' }
  ];

  return (
    <>
      <section id="contato" ref={containerRef} className="relative min-h-screen bg-zinc-950 py-20 px-6 flex items-center overflow-hidden">
        {/* Animated Orbital Rings */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/10 rounded-full"
              style={{
                width: `${(i + 1) * 300}px`,
                height: `${(i + 1) * 300}px`
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 20 + i * 10,
                  repeat: Infinity,
                  ease: 'linear'
                },
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5
                }
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2
              style={{
                scale: useTransform(scrollYProgress, [0, 0.3], [0.9, 1]),
                rotateX: useTransform(scrollYProgress, [0, 0.3], [20, 0]),
                transformPerspective: 1000,
                filter: useTransform(
                  scrollYProgress,
                  [0, 0.2, 0.8, 1],
                  ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']
                )
              }}
              className="text-5xl md:text-7xl lg:text-8xl mb-8 text-white"
            >
              <span className="font-light">VAMOS</span>
              <br />
              <span className="text-cyan-400">CONVERSAR</span>
            </motion.h2>

            <motion.p
              style={{
                y: useTransform(scrollYProgress, [0, 0.3], [50, 0]),
                opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
              }}
              className="text-white/70 text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
            >
              Estou sempre aberto a novos projetos e oportunidades de colaboração.
              Entre em contato!
            </motion.p>

            {/* Social Links with 3D Effects */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1])
              }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              {socialLinks.map((social, index) => {
                const linkRef = useRef(null);
                const { scrollYProgress: linkProgress } = useScroll({
                  target: linkRef,
                  offset: ['start end', 'center center']
                });

                return (
                  <motion.a
                    key={social.label}
                    ref={linkRef}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      y: useTransform(linkProgress, [0, 0.5], [50, 0]),
                      rotateY: useTransform(linkProgress, [0, 0.5], [45, 0]),
                      scale: useTransform(linkProgress, [0, 0.3, 0.7], [0.8, 1, 1]),
                      transformPerspective: 1000
                    }}
                    className="group relative p-6 bg-white/5 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-cyan-400/50 overflow-hidden"
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

                    <social.icon className="text-white group-hover:text-cyan-400 transition-colors relative z-10" size={32} />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                      style={{
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)'
                      }}
                    />

                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Button with Advanced Effects */}
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 0.4], [80, 0]),
                opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1])
              }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative inline-block px-12 py-4 bg-cyan-400 hover:bg-cyan-500 text-black uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-cyan-400/30"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />

                <span className="relative z-10">Enviar Mensagem</span>

                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400 rounded-lg"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              </button>
            </motion.div>
          </motion.div>

          {/* Footer with Parallax */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.7, 1], [0, -50]),
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 0.5])
            }}
            className="mt-20 pt-8 border-t border-white/10 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <LogoFull className="w-48 md:w-64 h-auto opacity-40" />
              <p className="text-white/40 text-sm tracking-wider">
                © 2026 Todos os direitos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
