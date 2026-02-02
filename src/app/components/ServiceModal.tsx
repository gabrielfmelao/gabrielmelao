import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { LogoGM } from '@/app/components/LogoGM';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote?: () => void;
  service: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: any;
  };
}

export function ServiceModal({ isOpen, onClose, onRequestQuote, service }: ServiceModalProps) {
  const handleRequestQuote = () => {
    onClose();
    if (onRequestQuote) {
      setTimeout(() => {
        onRequestQuote();
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-gradient-to-br from-zinc-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 border-b border-white/10">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex p-4 bg-white/5 rounded-xl border border-white/10 mb-4"
                >
                  <service.icon className="text-cyan-400" size={40} strokeWidth={1.5} />
                </motion.div>

                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300 border border-white/10 hover:rotate-90"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <LogoGM className="w-12 h-auto" />
                  <h2 className="text-4xl text-white font-light">
                    {service.title.replace('GM ', '')}
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cyan-400/80 text-sm mb-6 uppercase tracking-widest font-light"
                >
                  {service.subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/70 text-base mb-8 leading-relaxed font-light"
                >
                  {service.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <h3 className="text-white text-lg mb-4 font-light">O que está incluído:</h3>
                  <div className="grid gap-3">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 group-hover:scale-150 transition-transform" />
                        <p className="text-white/60 font-light group-hover:text-white/80 transition-colors">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleRequestQuote}
                  className="relative w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-black uppercase tracking-widest transition-all rounded-lg overflow-hidden group"
                >
                  <span className="relative z-10 font-light">Solicitar Orçamento</span>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)'
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
