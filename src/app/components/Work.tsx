import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Code, Briefcase, GraduationCap, Mic, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ServiceModal } from '@/app/components/ServiceModal';
import { ContactModal } from '@/app/components/ContactModal';
import food2brImage from 'figma:asset/4caa289794538df9fa87caf5bba3153c2bb946cc.png';
import neexorImage from 'figma:asset/1fe5c8330fbaf7e5bedbc98846ac72ebde07b3b9.png';
import panluImage from 'figma:asset/bad8b1b420e5e9eb2652294b150292878fac5961.png';
import { LogoGM } from '@/app/components/LogoGM';

export function Work() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const services = [
    {
      id: 'factory',
      title: 'GM Factory',
      subtitle: 'Desenvolvimento Sob Medida',
      description: 'Nossa equipe desenvolverá seu projeto sob medida e personalizado em um tempo muito menor que todas as fábricas de software tradicionais. Utilizamos metodologias ágeis e as melhores tecnologias do mercado.',
      icon: Code,
      features: [
        'Desenvolvimento ágil e personalizado',
        'Equipe especializada e dedicada',
        'Tecnologias de ponta',
        'Entrega 3x mais rápida que fábricas tradicionais',
        'Suporte contínuo e manutenção',
        'Escalabilidade garantida'
      ]
    },
    {
      id: 'consulting',
      title: 'GM Consulting',
      subtitle: 'Consultoria Financeira e Tecnológica',
      description: 'Consultoria especializada que une mercado financeiro e tecnologia. Estratégias integradas para transformação digital, otimização de processos e inovação em produtos financeiros.',
      icon: Briefcase,
      features: [
        'Análise estratégica de negócios',
        'Transformação digital',
        'Otimização de processos financeiros',
        'Integração de sistemas',
        'Due diligence tecnológica',
        'Roadmap de inovação'
      ]
    },
    {
      id: 'mentoring',
      title: 'GM Mentoring',
      subtitle: 'Mentoria e Aulas',
      description: 'Programa completo de mentoria e aulas sobre gestão de produtos digitais, tecnologia e desenvolvimento profissional e de negócios. Aprenda com quem já passou por Santander, B3, Pismo e Fleury.',
      icon: GraduationCap,
      features: [
        'Mentoria individual personalizada',
        'Aulas de gestão de produtos digitais',
        'Desenvolvimento de carreira',
        'Estratégias de negócio',
        'Networking qualificado',
        'Acesso a cases reais do mercado'
      ]
    },
    {
      id: 'talk',
      title: 'GM Talk',
      subtitle: 'Palestras e Eventos',
      description: 'Palestras inspiradoras e técnicas sobre IA, Mercado Financeiro, Casa de Apostas, Inovação e Tecnologia. Conteúdo de alto nível baseado em experiência real.',
      icon: Mic,
      features: [
        'Palestras customizadas para seu evento',
        'Temas: IA, Mercado Financeiro, Inovação',
        'Cases de sucesso reais',
        'Formato presencial ou online',
        'Material complementar',
        'Q&A com a audiência'
      ]
    }
  ];

  const projects = [
    {
      title: 'Food2Br',
      category: 'E-commerce B2B',
      description: 'Marketplace B2B para restaurantes e fornecedores do setor alimentício',
      url: 'https://food2br.com.br',
      image: food2brImage
    },
    {
      title: 'Neexor',
      category: 'E-commerce Tech',
      description: 'Plataforma de tecnologia e produtos para o futuro do varejo',
      url: 'https://neexor.com',
      image: neexorImage
    },
    {
      title: 'Panlu',
      category: 'Sistema PDV',
      description: 'Sistema completo de ponto de venda e gestão comercial',
      url: 'https://panlu.com.br',
      image: panluImage
    }
  ];

  return (
    <>
      <section id="trabalho" ref={containerRef} className="relative min-h-screen bg-black py-20 px-6 overflow-hidden">
        {/* Subtle Gradient Background */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0])
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              style={{
                scale: useTransform(scrollYProgress, [0, 0.2], [0.9, 1]),
                y: useTransform(scrollYProgress, [0, 0.3], [50, 0])
              }}
              className="mb-4 flex flex-col items-center gap-3"
            >
              <span className="text-5xl md:text-6xl text-white font-light">SERVIÇOS</span>
              <LogoGM className="w-32 md:w-40 h-auto" />
            </motion.div>
            <motion.p
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
              }}
              className="text-white/60 text-lg tracking-wide"
            >
              Soluções completas para transformar seu negócio
            </motion.p>
          </motion.div>

          {/* GM Services - Premium Design */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => {
              const serviceRef = useRef(null);
              const { scrollYProgress: serviceProgress } = useScroll({
                target: serviceRef,
                offset: ['start end', 'end start']
              });

              return (
                <motion.div
                  key={service.id}
                  ref={serviceRef}
                  style={{
                    y: useTransform(serviceProgress, [0, 0.5, 1], [100, 0, -50]),
                    opacity: useTransform(serviceProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]),
                    scale: useTransform(serviceProgress, [0, 0.3, 0.7], [0.95, 1, 1])
                  }}
                  onClick={() => setSelectedService(service)}
                  className="group relative cursor-pointer"
                  data-scroll-container
                >
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-cyan-400/30 rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-500"
                  >
                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}
                      />
                    </div>

                    {/* Top Border Accent */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* Icon */}
                    <div className="mb-6 inline-flex p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors duration-500">
                      <service.icon className="text-cyan-400" size={32} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <LogoGM className="w-12 h-auto" />
                        <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {service.title.replace('GM ', '')}
                        </h3>
                      </div>
                      <p className="text-cyan-400/80 text-sm uppercase tracking-widest mb-4 font-light">
                        {service.subtitle}
                      </p>
                      <p className="text-white/60 text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-white/80 group-hover:text-cyan-400 transition-colors duration-300">
                        <span className="text-sm uppercase tracking-wider font-light">Saiba Mais</span>
                        <ArrowUpRight size={16} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {/* Number Badge */}
                    <div className="absolute top-8 right-8 text-6xl md:text-7xl font-light text-white/5 group-hover:text-white/10 transition-colors duration-500">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Outer Glow on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      boxShadow: '0 20px 60px rgba(6, 182, 212, 0.15)'
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Projects Section */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.5, 1], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
            }}
          >
            <div className="mb-8">
              <h3 className="text-3xl text-white mb-3 font-light">
                <span className="text-cyan-400">Projetos</span> Desenvolvidos
              </h3>
              <p className="text-white/60 text-lg font-light">
                Conheça alguns dos projetos criados pela equipe GM
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const projectRef = useRef(null);
                const { scrollYProgress: projectProgress } = useScroll({
                  target: projectRef,
                  offset: ['start end', 'end start']
                });

                return (
                  <motion.a
                    key={project.title}
                    ref={projectRef}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      y: useTransform(projectProgress, [0, 1], [80, -30]),
                      scale: useTransform(projectProgress, [0, 0.3, 0.7], [0.95, 1, 1]),
                      opacity: useTransform(projectProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
                    }}
                    className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
                    data-scroll-container
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:from-black/95 group-hover:via-black/80 transition-all duration-500" />

                    {/* Border */}
                    <div className="absolute inset-0 border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-500 rounded-xl" />

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <p className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-light">
                        {project.category}
                      </p>
                      <h4 className="text-white text-2xl mb-2 font-light">
                        {project.title}
                      </h4>
                      <p className="text-white/70 text-sm mb-3 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="uppercase tracking-wider font-light">Ver Projeto</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                      style={{
                        boxShadow: 'inset 0 0 60px rgba(6, 182, 212, 0.1)'
                      }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={() => setIsContactModalOpen(true)}
        service={selectedService || services[0]}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
