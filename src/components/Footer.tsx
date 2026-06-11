import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-100 border-t border-amber-900/20" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Presentation */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-black text-amber-50 tracking-tight">Pasticceria Dolce Idea</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              La boutique del dolce artigianale a Cremona. Prepariamo bignè croccanti, torte da sogno e colazioni d’autore con la precisione del mastro pasticcere e materie prime d’eccellenza.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full bg-stone-800 text-amber-200 flex items-center justify-center hover:bg-amber-800 hover:text-white transition-all transform hover:-translate-y-1"
                aria-label="Instagram Page"
                id="footer-insta"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full bg-stone-800 text-amber-200 flex items-center justify-center hover:bg-amber-800 hover:text-white transition-all transform hover:-translate-y-1"
                aria-label="Facebook Page"
                id="footer-fb"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/393270540170" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full bg-stone-800 text-amber-200 flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all transform hover:-translate-y-1"
                aria-label="Contact WhatsApp"
                id="footer-wa"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Info & Customer Support */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200">Prendi Contatto</h4>
            <ul className="space-y-3.5 text-stone-300 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Via Adda, 15, 26100 Cremona CR</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="tel:3270540170" className="hover:text-amber-300 hover:underline">327 054 0170</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="mailto:info@pasticceriadolceidea.it" className="hover:text-amber-300 hover:underline">info@pasticceriadolceidea.it</a>
              </li>
            </ul>
          </div>

          {/* Slogan Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200">Genuinità Garantita</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Crediamo nel tempo lento del lievito madre, nel profumo genuino dei limoni grattugiati a mano e nel cioccolato temperato con cura. Nessun preparato né grasso idrogenato.
            </p>
            <div className="p-3.5 bg-stone-800/80 rounded-xl border border-stone-700/50 flex items-center gap-2 text-xs text-stone-300">
              <span className="p-1 rounded-full bg-amber-900/60 text-yellow-400"><Heart className="w-3.5 h-3.5 fill-current" /></span>
              <span>Laboratorio approvato con standard sanitari HACCP d’eccellenza.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} Pasticceria Dolce Idea di Cremona. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-stone-400 hover:underline">Privacy Policy</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-stone-400 hover:underline">Termini di Vendita</span>
            <span>·</span>
            <span className="text-amber-700">Artigiani Cremonesi</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
