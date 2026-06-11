import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SeasonalBannerProps {
  onExploreStagionali: () => void;
}

export default function SeasonalBanner({ onExploreStagionali }: SeasonalBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative bg-brand-secondary text-white overflow-hidden"
          id="seasonal-banner"
        >
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm font-medium">
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] px-2.5 py-1 rounded-full border border-white/25 font-semibold tracking-widest uppercase font-sans">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-white" /> Specialità di Primavera
              </span>
              <p className="font-sans text-[13px] tracking-wide">
                Sinfonia di profumi a Cremona: è arrivata la <strong className="text-stone-100 font-bold">Colomba Artigianale al Pistacchio Giallo</strong> e Mandorle fresche. Fatta con lievito madre centenario.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onExploreStagionali}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#FDFBF7] hover:text-stone-200 hover:underline transition-all group font-sans"
                id="btn-seasonal-cta"
              >
                Ordina o regala adesso
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Chiudi banner"
                id="btn-close-seasonal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
