import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        onClose();
      }, 3000);
    } catch (error) {
      setIsSuccess(false);
      alert('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-gradient-to-br from-zinc-900 to-black rounded-3xl shadow-2xl overflow-hidden border border-cyan-400/30"
              style={{ perspective: '1000px' }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <X className="text-white" size={24} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl text-white mb-2">Vamos Conversar?</h2>
                  <p className="text-white/90 text-lg">
                    Entraremos em contato em breve
                  </p>
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Send className="text-white" size={40} />
                    </motion.div>
                    <h3 className="text-3xl text-white mb-3">Mensagem Enviada!</h3>
                    <p className="text-white/70 text-lg">
                      Entraremos em contato em breve.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="block text-white mb-2 text-sm uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                        placeholder="Seu nome"
                      />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="block text-white mb-2 text-sm uppercase tracking-wider">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="seu@email.com"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor="phone" className="block text-white mb-2 text-sm uppercase tracking-wider">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors"
                          placeholder="(00) 00000-0000"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label htmlFor="service" className="block text-white mb-2 text-sm uppercase tracking-wider">
                        Serviço de Interesse *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="" className="bg-zinc-900">Selecione um serviço</option>
                        <option value="factory" className="bg-zinc-900">GM Factory - Desenvolvimento Sob Medida</option>
                        <option value="consulting" className="bg-zinc-900">GM Consulting - Consultoria</option>
                        <option value="mentoring" className="bg-zinc-900">GM Mentoring - Mentoria e Aulas</option>
                        <option value="talk" className="bg-zinc-900">GM Talk - Palestras</option>
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label htmlFor="message" className="block text-white mb-2 text-sm uppercase tracking-wider">
                        Mensagem *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                        placeholder="Conte-nos sobre seu projeto ou necessidade..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold uppercase tracking-widest transition-all rounded-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Enviar Mensagem
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
