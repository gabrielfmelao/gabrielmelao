import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import aboutImage from 'figma:asset/4af638edd95362436c643b5eb7d63af981009537.png';
import { Award, Target, Briefcase } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const features = [
    {
      icon: Target,
      title: 'Visão',
      description: 'Focado em resultados e excelência em cada projeto'
    },
    {
      icon: Briefcase,
      title: 'Experiência',
      description: 'Anos de experiência e projetos de sucesso'
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Comprometido com a mais alta qualidade'
    }
  ];

  return (
    <section id="sobre" ref={containerRef} className="relative min-h-screen bg-zinc-950 py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0])
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          backgroundSize: '100% 100%'
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image with 3D Parallax */}
          <motion.div
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              style={{ 
                rotate: imageRotate,
                scale: imageScale,
                transformPerspective: 1000
              }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={aboutImage}
                alt="About"
                className="w-full h-auto object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            {/* 3D Accent Border */}
            <motion.div
              style={{
                rotate: useTransform(imageRotate, (r) => r * -1)
              }}
              className="absolute -bottom-6 -right-6 w-full h-full border-2 border-cyan-400 rounded-lg -z-10"
            />
          </motion.div>

          {/* Content with Staggered Reveals */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                style={{
                  x: useTransform(scrollYProgress, [0.2, 0.5], [-50, 0]),
                  opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
                }}
                className="text-5xl md:text-6xl mb-6 text-white"
              >
                <span className="font-light">SOBRE</span>
                <br />
                <span className="text-cyan-400">MIM</span>
              </motion.h2>
              
              <motion.p
                style={{
                  x: useTransform(scrollYProgress, [0.25, 0.5], [-30, 0]),
                  opacity: useTransform(scrollYProgress, [0.25, 0.45], [0, 1])
                }}
                className="text-white/70 text-lg mb-6 leading-relaxed"
              >
                Especialista em Mercado Financeiro, Inteligência Artificial e Inovação, com experiência 
                em grandes instituições como Santander, B3, Pismo e Grupo Fleury. Apaixonado por 
                transformar negócios através da tecnologia e da educação.
              </motion.p>

              <motion.p
                style={{
                  x: useTransform(scrollYProgress, [0.3, 0.55], [-30, 0]),
                  opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
                }}
                className="text-white/70 text-lg mb-8 leading-relaxed"
              >
                Compartilho conhecimento através de mentorias, palestras e projetos inovadores, 
                conectando finanças, tecnologia e gestão de produtos digitais para criar soluções 
                que impactam o mercado.
              </motion.p>

              {/* Features with Individual Animations */}
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    style={{
                      x: useTransform(scrollYProgress, [0.35 + index * 0.05, 0.6], [-50, 0]),
                      opacity: useTransform(scrollYProgress, [0.35 + index * 0.05, 0.55 + index * 0.05], [0, 1]),
                      rotateY: useTransform(scrollYProgress, [0.35 + index * 0.05, 0.6], [20, 0])
                    }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors duration-300">
                      <feature.icon className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white text-lg mb-1">{feature.title}</h3>
                      <p className="text-white/60">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
