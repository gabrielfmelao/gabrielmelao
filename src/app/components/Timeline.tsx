import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useMemo } from 'react';
import { Briefcase, GraduationCap, Award, Rocket, Mic } from 'lucide-react';

interface TimelineItemData {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  colorMap: { [key: string]: string };
}

function TimelineItem({ item, index, colorMap }: TimelineItemProps) {
  const itemRef = useRef(null);
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'center center']
  });

  return (
    <motion.div
      key={index}
      ref={itemRef}
      style={{
        opacity: useTransform(itemProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]),
        scale: useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])
      }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
      data-scroll-container
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} ml-20 md:ml-0`}>
        <motion.div
          style={{
            x: useTransform(
              itemProgress,
              [0, 0.3],
              index % 2 === 0 ? [50, 0] : [-50, 0]
            ),
            rotateY: useTransform(itemProgress, [0, 0.3], [index % 2 === 0 ? 20 : -20, 0]),
            transformPerspective: 1000
          }}
          className="bg-zinc-900 p-6 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden group"
        >
          {/* Card Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />

          <motion.p
            style={{
              opacity: useTransform(itemProgress, [0, 0.3], [0, 1])
            }}
            className="text-cyan-400 text-sm uppercase tracking-wider mb-2 relative z-10"
          >
            {item.year}
          </motion.p>
          <h3 className="text-white text-2xl mb-1 relative z-10">
            {item.title}
          </h3>
          <p className="text-white/70 mb-3 relative z-10">
            {item.company}
          </p>
          <p className="text-white/60 text-sm leading-relaxed relative z-10">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Icon with Pulse Effect */}
      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          style={{
            scale: useTransform(itemProgress, [0, 0.3, 0.5], [0, 1.2, 1]),
            rotate: useTransform(itemProgress, [0, 0.5], [0, 360])
          }}
          className={`${colorMap[item.color]} p-3 rounded-full shadow-lg relative`}
        >
          <item.icon className="text-white relative z-10" size={24} />
          
          {/* Pulsing Rings */}
          <motion.div
            className={`absolute inset-0 ${colorMap[item.color]} rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className={`absolute inset-0 ${colorMap[item.color]} rounded-full`}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  );
}

export function Timeline() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const timelineData = useMemo<TimelineItemData[]>(() => [
    {
      year: '2024 - Presente',
      title: 'Fundador & CEO',
      company: 'Próprios Negócios',
      description: 'Desenvolvimento de produtos digitais inovadores (Food2Br, Neexor, Panlu, EASYB2B, Tamborine) focados em transformação digital e e-commerce.',
      icon: Rocket,
      color: 'cyan'
    },
    {
      year: '2022 - Presente',
      title: 'Palestrante',
      company: 'IA, Inovação & Tecnologia',
      description: 'Palestras inspiradoras e técnicas sobre IA, Mercado Financeiro, Inovação e Tecnologia em eventos corporativos e acadêmicos.',
      icon: Mic,
      color: 'pink'
    },
    {
      year: '2021 - Presente',
      title: 'Professor',
      company: 'Educação & Tecnologia',
      description: 'Ensino de gestão de produtos digitais, tecnologia e inovação, compartilhando conhecimento e experiências do mercado.',
      icon: GraduationCap,
      color: 'violet'
    },
    {
      year: '2020 - Presente',
      title: 'Consultor e Mentor',
      company: 'Mercado Financeiro & Tech',
      description: 'Consultoria especializada em tecnologia e finanças, mentorias em gestão de produtos digitais e estratégias de inovação.',
      icon: Award,
      color: 'purple'
    },
    {
      year: '2020 - 2022',
      title: 'Grupo Fleury',
      company: 'Transformação Digital',
      description: 'Liderança em projetos de inovação e transformação digital no setor de saúde, implementando soluções tecnológicas de ponta.',
      icon: Briefcase,
      color: 'blue'
    },
    {
      year: '2018 - 2020',
      title: 'Pismo',
      company: 'Banking & Fintech',
      description: 'Desenvolvimento de soluções de banking as a service e infraestrutura financeira para grandes instituições.',
      icon: Briefcase,
      color: 'green'
    },
    {
      year: '2018 - 2019',
      title: 'B3 - Brasil Bolsa Balcão',
      company: 'Mercado de Capitais',
      description: 'Atuação no maior mercado de capitais da América Latina, desenvolvendo soluções e produtos financeiros inovadores.',
      icon: Briefcase,
      color: 'orange'
    },
    {
      year: '2010 - 2018',
      title: 'Banco Santander',
      company: 'Banking & Innovation',
      description: 'Experiência em uma das maiores instituições financeiras do mundo, focado em inovação e transformação digital.',
      icon: Briefcase,
      color: 'red'
    },
    {
      year: '2010 - 2014',
      title: 'Engenheiro de Produção',
      company: 'Universidade São Judas Tadeu',
      description: 'Formação em Engenharia de Produção, construindo a base sólida para uma carreira multidisciplinar em tecnologia e gestão.',
      icon: GraduationCap,
      color: 'indigo'
    }
  ], []);

  const colorMap: { [key: string]: string } = {
    cyan: 'bg-cyan-500',
    pink: 'bg-pink-500',
    violet: 'bg-violet-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <section id="trajetória" ref={containerRef} className="relative min-h-screen bg-black py-20 px-6 overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            style={{
              scale: useTransform(scrollYProgress, [0, 0.2], [0.9, 1]),
              rotateX: useTransform(scrollYProgress, [0, 0.2], [15, 0]),
              transformPerspective: 1000
            }}
            className="text-5xl md:text-6xl mb-4 text-white"
          >
            <span className="font-light">MINHA</span>{' '}
            <span className="text-cyan-400">TRAJETÓRIA</span>
          </motion.h2>
          <motion.p
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
            }}
            className="text-white/60 text-lg tracking-wide"
          >
            Uma jornada de inovação, aprendizado e transformação
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-indigo-500"
            style={{
              scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]),
              originY: 0,
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
            }}
          />

          {/* Static Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
                colorMap={colorMap}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
