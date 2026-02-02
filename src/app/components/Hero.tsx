import { motion } from 'motion/react';
import heroImage from 'figma:asset/dba3eff2ca9afdad7fdfc630ce77cc120efaace3.png';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function Hero() {
  const scrollToNext = () => {
    const element = document.getElementById('sobre');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="início" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full w-full"
        >
          <img
            src={heroImage}
            alt="Gabriel Melão"
            className="h-full w-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pb-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-8 text-white leading-tight"
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl font-light">
              Conhecimento, Automação e Liberdade.
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-4">
              O futuro não espera.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/80 text-xl md:text-2xl tracking-widest uppercase"
          >
            Mercado Financeiro • IA • Inovação
          </motion.p>

          {/* WhatsApp Contact Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-52 max-w-xl mx-auto px-4"
          >
            <a 
              href="https://wa.me/5511955987958"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-cyan-400/50 rounded-2xl p-8 overflow-hidden transition-all duration-500">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                {/* Top Border Accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-6">
                  {/* WhatsApp Icon with Pulse */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="p-4 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 group-hover:border-[#25D366]/50 transition-colors duration-500"
                    >
                      <FaWhatsapp className="text-[#25D366]" size={36} />
                    </motion.div>
                    
                    {/* Pulsing Ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-xl border-2 border-[#25D366]"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <h3 className="text-white text-xl font-light mb-2">
                      Começe por aqui
                    </h3>
                    <p className="text-white/60 text-base">
                      Clique para conversar pelo WhatsApp
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight size={24} strokeWidth={2} />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#25D366]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          onClick={scrollToNext}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-white/60 hover:text-cyan-400 transition-colors"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
