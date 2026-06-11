import { Info, Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToInquiry: (prod: Product) => void;
  isInCart: boolean;
  key?: string;
}

export default function ProductCard({ product, onAddToInquiry, isInCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden border border-brand-border relative chocolate-card flex flex-col justify-between group"
      id={`product-card-${product.id}`}
    >
      {/* Decorative Signature highlight */}
      {product.isSignature && (
        <div className="absolute top-3 left-3 z-10 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse" />
          Ricetta Speciale d'Autore
        </div>
      )}

      {/* Standard custom badge */}
      {!product.isSignature && product.badge && (
        <div className="absolute top-3 left-3 z-10 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
          {product.badge}
        </div>
      )}

      {/* Product Image Stage */}
      <div className="relative aspect-video w-full overflow-hidden bg-brand-sand">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-sand text-brand-secondary font-serif font-black">
            Dolce Idea
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
        <div>
          <h4 className="font-serif text-xl font-bold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors">
            {product.name}
          </h4>
          <p className="text-brand-muted text-xs sm:text-[13px] mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Technical allergens list & price */}
        <div className="space-y-4 pt-3 border-t border-brand-border/60">
          
          {/* Allergens labels */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-brand-muted font-mono flex items-center gap-0.5" title="Allergeni">
              <Info className="w-3.5 h-3.5 text-brand-muted/70 shrink-0" /> Allergeni:
            </span>
            {product.allergens.map((alg) => (
              <span
                key={alg}
                className="text-[9px] bg-brand-sand text-brand-muted px-1.5 py-0.5 rounded-full font-medium border border-brand-border"
              >
                {alg}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-brand-muted text-[10px] block tracking-widest uppercase font-semibold font-sans">Prezzo indicativo</span>
              <p className="text-brand-dark font-serif text-lg font-extrabold flex items-baseline gap-1">
                € {product.price.toFixed(2)}
                <span className="text-brand-muted font-sans text-xs font-normal">/ {product.unit}</span>
              </p>
            </div>

            {/* Inquire action btn */}
            <button
              onClick={() => onAddToInquiry(product)}
              className={`inline-flex items-center gap-1.5 text-xs px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
                isInCart
                  ? 'bg-brand-secondary text-white border border-brand-secondary shadow-sm hover:opacity-90'
                  : 'border border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark'
              }`}
              id={`btn-add-${product.id}`}
            >
              {isInCart ? (
                <>✓ In Lista</>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  + Richiedi
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
