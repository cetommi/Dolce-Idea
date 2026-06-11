import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  Phone, 
  MapPin, 
  ShoppingCart, 
  ChevronRight, 
  Instagram, 
  Star, 
  MessageSquare, 
  Coffee,
  ArrowRight,
  HelpCircle,
  ThumbsUp,
  CheckCircle
} from 'lucide-react';

// Data and components
import { 
  productsList, 
  reviewsList, 
  trustBadges, 
  openHours 
} from './data/pasticceriaData';
import { Product, CartItem } from './types';
import SeasonalBanner from './components/SeasonalBanner';
import ProductCard from './components/ProductCard';
import OrderInquiryForm from './components/OrderInquiryForm';
import CustomMap from './components/CustomMap';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'prodotti' | 'ordinazione' | 'chi-siamo' | 'contatti'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [scrolled, setScrolled] = useState(false);

  // Custom testimonials likes counter for fun interaction
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Detect scroll to style the header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync scroll to top on tab change
  const handleTabChange = (tab: 'home' | 'prodotti' | 'ordinazione' | 'chi-siamo' | 'contatti') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Add item to temporary inquiry cart
  const handleAddToInquiry = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart; // Already inside
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    // Automatically highlight info and trigger dynamic feedback
    // Optionally alert the user or direct them
  };

  const handleRemoveFromInquiry = (prodId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== prodId));
  };

  const handleIncrement = (prodId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === prodId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (prodId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === prodId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const toggleLikeReview = (id: string) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Map icon strings to components for trust design badges
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-6 h-6 text-brand-primary" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-brand-primary" />;
      case 'Award': return <Award className="w-6 h-6 text-brand-primary" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-primary" />;
      default: return <Heart className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] vintage-pattern text-brand-dark" id="root-app">
      
      {/* 1. SEASONAL TOP BANNER */}
      <SeasonalBanner onExploreStagionali={() => {
        setFilterCategory('stagionali');
        handleTabChange('prodotti');
      }} />

      {/* 2. BEAUTIFUL NAVIGATION HEADER */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border py-3' : 'bg-[#FDFBF7]/90 backdrop-blur-sm py-5'
      }`} id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('home')}>
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-sm">
              <span className="font-serif font-black text-white text-base">DI</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black text-brand-dark tracking-tighter uppercase leading-none">
                Dolce Idea
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-brand-muted font-bold block mt-1">
                Pasticceria Artigianale
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-sans uppercase tracking-widest text-brand-muted">
            <button 
              onClick={() => handleTabChange('home')}
              className={`hover:text-brand-dark transition-colors py-1 relative ${
                activeTab === 'home' ? 'text-brand-dark font-bold' : ''
              }`}
              id="nav-link-home"
            >
              Home
              {activeTab === 'home' && <motion.span layoutId="underline" className="absolute left-0 bottom-0 top-[26px] w-full h-[2.5px] bg-brand-dark rounded-full" />}
            </button>
            <button 
              onClick={() => handleTabChange('prodotti')}
              className={`hover:text-brand-dark transition-colors py-1 relative ${
                activeTab === 'prodotti' ? 'text-brand-dark font-bold' : ''
              }`}
              id="nav-link-products"
            >
              Prodotti
              {activeTab === 'prodotti' && <motion.span layoutId="underline" className="absolute left-0 bottom-0 top-[26px] w-full h-[2.5px] bg-brand-dark rounded-full" />}
            </button>
            <button 
              onClick={() => handleTabChange('ordinazione')}
              className={`hover:text-brand-dark transition-colors py-1 relative ${
                activeTab === 'ordinazione' ? 'text-brand-dark font-bold' : ''
              }`}
              id="nav-link-custom"
            >
              Torte su Misura
              {activeTab === 'ordinazione' && <motion.span layoutId="underline" className="absolute left-0 bottom-0 top-[26px] w-full h-[2.5px] bg-brand-dark rounded-full" />}
            </button>
            <button 
              onClick={() => handleTabChange('chi-siamo')}
              className={`hover:text-brand-dark transition-colors py-1 relative ${
                activeTab === 'chi-siamo' ? 'text-brand-dark font-bold' : ''
              }`}
              id="nav-link-about"
            >
              Chi Siamo
              {activeTab === 'chi-siamo' && <motion.span layoutId="underline" className="absolute left-0 bottom-0 top-[26px] w-full h-[2.5px] bg-brand-dark rounded-full" />}
            </button>
            <button 
              onClick={() => handleTabChange('contatti')}
              className={`hover:text-brand-dark transition-colors py-1 relative ${
                activeTab === 'contatti' ? 'text-brand-dark font-bold' : ''
              }`}
              id="nav-link-contacts"
            >
              Contatti
              {activeTab === 'contatti' && <motion.span layoutId="underline" className="absolute left-0 bottom-0 top-[26px] w-full h-[2.5px] bg-brand-dark rounded-full" />}
            </button>
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart indicator */}
            {cart.length > 0 && (
              <button 
                onClick={() => handleTabChange('ordinazione')}
                className="relative p-2.5 bg-brand-sand hover:bg-brand-border/40 text-brand-dark rounded-full transition-all flex items-center gap-1.5"
                title="Sfoglia il preventivo attivo"
                id="header-cart-indicator"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-brand-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">
                  {cart.length}
                </span>
              </button>
            )}

            <button
              onClick={() => handleTabChange('ordinazione')}
              className="px-6 py-3 bg-brand-primary hover:bg-[#5D2E0D] text-white rounded-full font-sans text-xs uppercase tracking-widest transition-colors font-semibold"
              id="btn-header-quote"
            >
              Ordina Ora
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center md:hidden gap-3">
            {cart.length > 0 && (
              <button 
                onClick={() => handleTabChange('ordinazione')}
                className="relative p-2 bg-brand-sand text-brand-dark rounded-full transition-all"
                id="header-cart-mobile"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-dark hover:bg-brand-sand rounded-full transition-colors"
              aria-label="Apri menu"
              id="btn-mobile-hamburger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden relative z-40"
            id="mobile-drawer"
          >
            <div className="px-5 py-6 space-y-4">
              <button 
                onClick={() => handleTabChange('home')}
                className={`block w-full text-left py-2 text-base font-bold text-amber-950 hover:bg-amber-50/50 rounded-lg px-3 ${
                  activeTab === 'home' ? 'bg-amber-50 text-amber-900' : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleTabChange('prodotti')}
                className={`block w-full text-left py-2 text-base font-bold text-amber-950 hover:bg-amber-50/50 rounded-lg px-3 ${
                  activeTab === 'prodotti' ? 'bg-amber-50 text-amber-900' : ''
                }`}
              >
                I Nostri Dolci
              </button>
              <button 
                onClick={() => handleTabChange('ordinazione')}
                className={`block w-full text-left py-2 text-base font-bold text-amber-950 hover:bg-amber-50/50 rounded-lg px-3 ${
                  activeTab === 'ordinazione' ? 'bg-amber-50 text-amber-900' : ''
                }`}
              >
                Torte su Misura
              </button>
              <button 
                onClick={() => handleTabChange('chi-siamo')}
                className={`block w-full text-left py-2 text-base font-bold text-amber-950 hover:bg-amber-50/50 rounded-lg px-3 ${
                  activeTab === 'chi-siamo' ? 'bg-amber-50 text-amber-900' : ''
                }`}
              >
                La Filosofia
              </button>
              <button 
                onClick={() => handleTabChange('contatti')}
                className={`block w-full text-left py-2 text-base font-bold text-amber-950 hover:bg-amber-50/50 rounded-lg px-3 ${
                  activeTab === 'contatti' ? 'bg-amber-50 text-amber-900' : ''
                }`}
              >
                Contatti
              </button>

              <div className="pt-4 border-t border-stone-100">
                <button
                  onClick={() => handleTabChange('ordinazione')}
                  className="w-full py-3.5 bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold rounded-xl text-center shadow"
                >
                  Richiedi Torta Personalizzata
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE ROUTING TABS AREA WITH TRANSITIONS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME TAB ==================== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-16"
            >
              {/* HERO SECTION */}
              <section className="relative overflow-hidden pt-10 sm:pt-14 pb-20 border-b border-brand-border">
                {/* Vintage overlay texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(232,226,217,0.3)_0%,transparent_60%)] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero copy */}
                    <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <div className="h-[1px] w-8 bg-brand-primary"></div>
                        <span className="text-xs font-sans uppercase tracking-[0.3em] text-brand-primary font-bold">Dal 1998 a Cremona</span>
                      </div>
                      
                      <h2 className="font-serif text-5xl sm:text-7xl leading-[1.0] sm:leading-[0.95] mb-6 text-brand-dark tracking-tighter">
                        Ogni morso <br className="hidden sm:inline" /> racconta <br className="hidden sm:inline" />
                        <span className="italic font-light text-brand-secondary">una dolce storia.</span>
                      </h2>

                      <p className="text-brand-muted text-sm sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                        Creazioni d'alta pasticceria nate dalla cura per le materie prime e il rispetto dei tempi della natura. Burro di malga, cioccolato monorigine e lievitazioni lente di ben 36 ore.
                      </p>

                      {/* Trust credentials bullet items */}
                      <div className="flex flex-wrap shadow-none border border-brand-border justify-center lg:justify-start gap-4 p-4 rounded-3xl bg-white/50 max-w-md mx-auto lg:mx-0">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-dark">
                          <CheckCircle className="w-4 h-4 text-brand-secondary" /> Senza preparati artificiali
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-dark">
                          <CheckCircle className="w-4 h-4 text-brand-secondary" /> Lievito madre vivo
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-dark">
                          <CheckCircle className="w-4 h-4 text-brand-secondary" /> Consegna protetta
                        </div>
                      </div>

                      {/* Call-to-actions */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                        <button
                          onClick={() => handleTabChange('prodotti')}
                          className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-[#5D2E0D] text-white font-sans text-xs uppercase tracking-widest rounded-full transition-colors text-center font-bold"
                          id="hero-btn-explore"
                        >
                          Esplora la Boutique
                        </button>
                        
                        <button
                          onClick={() => handleTabChange('ordinazione')}
                          className="w-full sm:w-auto flex items-center justify-center gap-3 font-sans text-xs uppercase tracking-widest py-4 px-4 text-brand-dark hover:text-brand-primary font-bold transition-colors"
                          id="hero-btn-custom-cake"
                        >
                          <span className="w-8 h-8 flex items-center justify-center border border-brand-dark rounded-full">→</span>
                          Torte su Misura
                        </button>
                      </div>
                    </div>

                    {/* Hero visual Signature product */}
                    <div className="lg:col-span-6 relative flex justify-center">
                      <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-sm border border-brand-border bg-white transform hover:rotate-1 transition-transform duration-500 p-3">
                        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-brand-sand">
                          <img
                            src="/src/assets/images/signature_cake_1781201004606.jpg"
                            alt="Signature cake di Dolce Idea"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Elegant floating overlay badge representing the signature cake */}
                        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-[20px] border border-brand-border shadow-md flex items-center gap-3.5">
                          <div className="p-2.5 bg-brand-sand text-brand-primary rounded-xl shrink-0">
                            <Coffee className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-brand-primary block">In vetrina oggi</span>
                            <h4 className="font-serif font-bold text-sm text-brand-dark">Il Sogno di Cremona</h4>
                            <p className="text-xs text-brand-muted">Doppia chantilly e sfoglia croccante al cioccolato belga.</p>
                          </div>
                        </div>

                        {/* Top info balloon reviews rating */}
                        <div className="absolute top-6 right-6 bg-brand-primary text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight shadow-sm flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                          <span>4.5 / 5.0 (81 Recensioni)</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* SECTION: CREDENTIALS BADGES */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase font-sans tracking-widest font-bold text-brand-primary">
                    Senza compromessi
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-dark">
                    Il nostro impegno per la freschezza
                  </h3>
                  <p className="text-brand-muted text-sm max-w-lg mx-auto font-light">
                    Siamo fieri dell’etichetta pura dei nostri dolci freschi. Nessun conservante chimico, nessun semilavorato sintetico.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                  {trustBadges.map((badge, idx) => (
                    <div 
                      key={idx}
                      className="bg-white p-7 rounded-[32px] sm:rounded-[40px] border border-brand-border chocolate-card transition-all flex flex-col items-center text-center space-y-4"
                    >
                      <div className="w-12 h-12 bg-brand-sand rounded-full flex items-center justify-center border border-brand-border shadow-sm">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <h4 className="font-serif font-bold text-brand-dark text-lg leading-snug">
                        {badge.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-brand-muted leading-relaxed font-light">
                        {badge.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* DEEP FOCUS SIGNATURE SECTION ("Il Sogno di Cremona") */}
              <section className="bg-brand-sand/25 border-y border-brand-border py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Image close up */}
                    <div className="order-2 lg:order-1 relative p-2">
                      <div className="aspect-video w-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-sm border border-brand-border bg-white p-2">
                        <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden">
                          <img 
                            src="/src/assets/images/mignon_tray_1781201022637.jpg" 
                            alt="I Nostri Dolci Mignon della Domenica"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-6 -right-3 hidden sm:block w-44 p-4 bg-white rounded-3xl border border-brand-border shadow-sm text-center">
                        <p className="font-serif font-black text-brand-dark text-xl uppercase tracking-tighter">Mignon</p>
                        <p className="text-brand-muted text-xs mt-1">Sempre freschi in vassoio</p>
                      </div>
                    </div>

                    {/* Copy narrative */}
                    <div className="space-y-6 order-1 lg:order-2">
                      <span className="text-xs uppercase font-sans tracking-widest font-bold text-brand-primary">
                        La specialità del giorno
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
                        I celebri pasticcini mignon della domenica a Cremona
                      </h3>
                      <p className="text-brand-muted text-[14px] leading-relaxed font-light">
                        Come confermano i nostri clienti affezionati nelle recensioni, la nostra pasticceria è la destinazione principe per vassoi pieni di mignon di grandi dimensioni, soffici bignè colmi di crema, e mini crostatine dalla frolla stesa fine a mano con marmellata pregiata.
                      </p>

                      <div className="p-5 bg-white rounded-3xl border border-brand-border/80 shadow-xs italic text-brand-dark text-xs leading-relaxed">
                        &quot;Pasticcini ottimi, sempre freschi e di grosse dimensioni... La torta con pan di spagna e doppia farcitura con sfoglia al cioccolato è semplicemente deliziosa!&quot;
                        <span className="block text-right mt-2 text-brand-muted font-bold not-italic font-sans text-[10px]">— Gxxx Txxx (Recensione certificata Google Maps)</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                          onClick={() => {
                            setFilterCategory('mignon');
                            handleTabChange('prodotti');
                          }}
                          className="px-6 py-3.5 bg-brand-primary hover:bg-[#5D2E0D] text-white font-sans text-xs uppercase tracking-widest rounded-full text-center font-bold"
                          id="btn-goto-mignon"
                        >
                          Sfoglia pasticcini mignon
                        </button>
                        
                        <button
                          onClick={() => handleTabChange('ordinazione')}
                          className="px-6 py-3.5 bg-white hover:bg-brand-sand/50 text-brand-dark font-sans text-xs uppercase tracking-widest rounded-full text-center border border-brand-border transition-colors font-bold"
                        >
                          Torte di Compleanno
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* CUSTOMER REVIEWS (GOOGLE REVIEWS DOCK) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase font-sans tracking-widest font-bold text-brand-primary">
                    La parola ai golosi
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-dark">
                    Cosa dicono i nostri clienti su Google Maps
                  </h3>
                  <p className="text-brand-muted text-sm max-w-lg mx-auto font-light">
                    Sapore, cortesia e costanza negli anni. Con un punteggio medio di <strong>4.5 stelle</strong>, siamo onorati di deliziare le famiglie di Cremona.
                  </p>
                </div>

                {/* Google-like card reviews grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  {reviewsList.map((review) => {
                    const hasLiked = likedReviews[review.id];
                    return (
                      <div 
                        key={review.id}
                        className="bg-white p-7 rounded-[32px] sm:rounded-[40px] border border-brand-border flex flex-col justify-between space-y-6 chocolate-card relative"
                        id={`review-card-${review.id}`}
                      >
                        <div className="space-y-4">
                          {/* Stars */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-brand-primary fill-brand-primary shrink-0" />
                            ))}
                            <span className="text-brand-muted text-[10px] ml-1.5 bg-brand-sand px-2 py-0.5 rounded-md font-sans font-bold uppercase tracking-wider">{review.date}</span>
                          </div>

                          {/* Specific accent tag */}
                          {review.tag && (
                            <span className="inline-block bg-brand-sand/50 border border-brand-border text-brand-primary text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold font-sans">
                              {review.tag}
                            </span>
                          )}

                          <p className="text-brand-dark text-sm leading-relaxed font-light italic">
                            &ldquo;{review.text}&rdquo;
                          </p>
                        </div>

                        {/* Author info & interactive feedback */}
                        <div className="pt-4 border-t border-brand-border space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              {/* Letter Avatar */}
                              <div className="w-8 h-8 rounded-full bg-brand-sand text-brand-primary border border-brand-border flex items-center justify-center font-sans font-bold text-xs uppercase">
                                {review.author ? review.author[0] : 'U'}
                              </div>
                              <div>
                                <h5 className="font-bold text-brand-dark text-xs sm:text-sm">
                                  {review.author}
                                </h5>
                                {review.isLocalGuide && (
                                  <span className="text-[9px] text-brand-primary font-bold tracking-widest uppercase block mt-0.5">Local Guide</span>
                                )}
                              </div>
                            </div>

                            {/* Like / Helpful button */}
                            <button
                              onClick={() => toggleLikeReview(review.id)}
                              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                                hasLiked
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-250 font-bold'
                                  : 'text-brand-muted border-brand-border hover:bg-brand-sand'
                              }`}
                              title="Segnala come recensione utile"
                            >
                              <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'fill-current' : ''}`} />
                              <span>{hasLiked ? 'Utile!' : 'Utile'}</span>
                            </button>
                          </div>

                          {/* Replied by Owner if exists */}
                          {review.replied && review.replyText && (
                            <div className="bg-brand-sand/30 p-3.5 rounded-2xl border border-brand-border mt-2 space-y-1">
                              <p className="text-[9px] font-bold text-brand-primary flex items-center gap-1 uppercase tracking-wider font-sans">
                                <MessageSquare className="w-3 h-3 shrink-0" /> Risposta della Pasticceria:
                              </p>
                              <p className="text-xs text-brand-dark leading-relaxed font-light italic">
                                {review.replyText}
                              </p>
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Callout to Google reviews flow */}
                <div className="text-center mt-6">
                  <p className="text-[11px] font-sans tracking-widest uppercase text-brand-muted">
                    Recensioni pubblicate pubblicamente su Google Maps Business.
                  </p>
                </div>
              </section>

              {/* DECORATIVE CALL TO ACTION IN FOOTER SUBSECTION */}
              <section className="max-w-5xl mx-auto px-4">
                <div className="bg-brand-primary rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-sm border border-brand-border/60">
                  {/* Glowing visual backdrop */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{
                    backgroundImage: `url('/src/assets/images/mignon_tray_1781201022637.jpg')`
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-[#8B4513]/20 to-transparent" />
                  
                  <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#FDFBF7]/90 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/20 shadow-xs">
                      Boutique d’eccellenza accessibile
                    </span>
                    <h3 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
                      Desideri qualcosa di unico per la tua festa?
                    </h3>
                    <p className="text-[#FDFBF7]/80 text-sm sm:text-base leading-relaxed font-light">
                      Dal compleanno del tuo bambino, alle torte nuziali a più piani, fino al semplice cabaret della domenica. Prepariamo ogni dolce fresco per regalarti un’emozione golosa indescrivibile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3">
                      <button
                        onClick={() => handleTabChange('ordinazione')}
                        className="px-8 py-4 bg-[#FDFBF7] hover:bg-brand-sand text-brand-dark font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-sm"
                        id="cta-bottom-instant"
                      >
                        Personalizza la tua Torta
                      </button>
                      
                      <button
                        onClick={() => handleTabChange('contatti')}
                        className="px-8 py-4 bg-transparent hover:bg-white/10 text-[#FDFBF7] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-all border border-white/20"
                      >
                        Contattaci Ora
                      </button>
                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ==================== PRODUCTS TAB ==================== */}
          {activeTab === 'prodotti' && (
            <motion.div
              key="prodotti"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12"
            >
              <div className="text-center space-y-3">
                <span className="text-xs uppercase font-sans tracking-[0.25em] text-brand-primary font-bold">
                  La nostra vetrina artigianale
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-brand-dark">
                  Scopri la nostra gamma di prelibatezze
                </h3>
                <p className="text-brand-muted text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
                  Ogni giorno creiamo piccole meraviglie dolciarie utilizzando unicamente uova fresche, burro pregiato e baccelli di vaniglia. Scegli sotto per filtrare per categoria.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap justify-center gap-2.5 border-b border-brand-border pb-8">
                {[
                  { key: 'all', label: 'Tutti i Dolci' },
                  { key: 'torte', label: 'Torte Artigianali' },
                  { key: 'mignon', label: 'Pasticceria Mignon' },
                  { key: 'lievitati', label: 'Lievitati' },
                  { key: 'cioccolateria', label: 'Cioccolateria' },
                  { key: 'stagionali', label: 'Stagionali' },
                  { key: 'regali', label: 'Regali' }
                ].map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setFilterCategory(cat.key)}
                    className={`px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest transition-all ${
                      filterCategory === cat.key
                        ? 'bg-brand-primary text-white scale-102 font-bold shadow-xs'
                        : 'bg-white hover:bg-brand-sand text-brand-dark border border-brand-border'
                    }`}
                    id={`filter-btn-${cat.key}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Products Dynamic Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsList
                  .filter((prod) => filterCategory === 'all' || prod.category === filterCategory)
                  .map((product) => {
                    const cartItem = cart.find((item) => item.product.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToInquiry={handleAddToInquiry}
                        isInCart={!!cartItem}
                      />
                    );
                  })}
              </div>

              {/* Floating notification cart bar if items are selected */}
              {cart.length > 0 && (
                <div className="bg-brand-primary text-white p-5 sm:p-6 rounded-[32px] sm:rounded-[40px] shadow-sm border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mt-16">
                  <div className="flex items-center gap-3.5 text-center sm:text-left">
                    <div className="p-3 bg-white/10 text-white rounded-2xl shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-white">Hai selezionato {cart.length} dolci per il preventivo</h4>
                      <p className="text-xs text-[#FDFBF7]/85 mt-0.5 font-light">Completa inserendo la data di ritiro per ottenere i prezzi precisi e ordinare.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange('ordinazione')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#FDFBF7] hover:bg-brand-sand text-brand-dark font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-colors flex items-center justify-center gap-1.5"
                    id="btn-go-to-cart-wizard"
                  >
                    Completa Ordine
                    <ChevronRight className="w-4 h-4 text-brand-primary" />
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {/* ==================== CUSTOM ORDER / WIZARD TAB ==================== */}
          {activeTab === 'ordinazione' && (
            <motion.div
              key="ordinazione"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12"
            >
              <div className="text-center space-y-3">
                <span className="text-xs uppercase font-sans tracking-[0.25em] text-brand-primary font-bold">
                  Laboratorio su misura
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-brand-dark">
                  Le Torte delle Vostre Feste
                </h3>
                <p className="text-brand-muted text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
                  Compila i dettagli sotto. Puoi anche trascinare o aggiungere altri dolci da asporto dal catalogo per includerli nel preventivo e ritirarli assieme freschi.
                </p>
              </div>

              {/* Custom Wizard Form Component */}
              <OrderInquiryForm
                selectedItems={cart}
                onRemoveItem={handleRemoveFromInquiry}
                onClearItems={handleClearCart}
                onIncrementItem={handleIncrement}
                onDecrementItem={handleDecrement}
              />

              {/* Informative Help Box */}
              <div className="bg-brand-sand/20 rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 border border-brand-border space-y-6">
                <h4 className="font-serif font-bold text-brand-dark text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-primary" /> Domande Frequenti sulle Torte su Ordinazione
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-muted">
                  <div className="space-y-1.5">
                    <p className="font-bold text-brand-dark text-sm">Quanto tempo prima devo ordinare?</p>
                    <p className="font-light leading-relaxed">Richiediamo almeno <strong>48 ore di preavviso</strong> per torte classiche o di compleanno. Per torte nuziali o torte monumentali complesse, preferiamo dai 5 ai 7 giorni.</p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-brand-dark text-sm">Posso richiedere scritte o modifiche?</p>
                    <p className="font-light leading-relaxed">Certamente! Prepariamo coperture personalizzate stampate, scritte in cioccolato belga eseguite a mano, macarons colorati ed edibili fusi insieme.</p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-brand-dark text-sm">Fornite consegna a domicilio?</p>
                    <p className="font-light leading-relaxed">Il ritiro standard avviene presso il nostro negozio a Cremona. Per grandi buffet o eventi importanti, possiamo concordare la consegna a domicilio protetta.</p>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-brand-dark text-sm">Avete torte senza allergeni?</p>
                    <p className="font-light leading-relaxed">Segnalateci intolleranze gravi nel form: prepariamo versioni speciali senza lattosio o senza amidi allergici. Nel laboratorio gestiamo farine, quindi lievi contaminazioni crociate sono possibili.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ==================== PHILOSOPHY / CHI SIAMO TAB ==================== */}
          {activeTab === 'chi-siamo' && (
            <motion.div
              key="chi-siamo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16 py-12"
            >
              
              {/* Narrazione Storia */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Copy Story */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs uppercase font-sans tracking-[0.25em] text-brand-primary font-bold">
                      Una storia cremonese dal 1998
                    </span>
                    <h3 className="font-serif text-3xl sm:text-5xl font-black text-brand-dark leading-tight">
                      Nata da un’idea dolce, <br /> coltivata con cura e amore
                    </h3>
                    
                    <p className="text-brand-muted text-sm leading-relaxed font-light">
                      La <strong>Pasticceria Dolce Idea</strong> è nata a Cremona con una promessa semplice: servire dolci onesti, freschissimi e privi di artefatti. Nel nostro laboratorio la bilancia pesa farina e zucchero con rigore, ma è l’occhio, guidato da anni d’esperienza, a decidere la cottura perfetta del bignè o la lucentezza della glassa.
                    </p>

                    <p className="text-brand-muted text-sm leading-relaxed font-light">
                      Il mastro pasticcere seleziona singolarmente ogni fornitore. Crediamo nel gusto autentico della nocciola delle nostre terre piemontesi IGP, nell’aria della camera di lievitazione che dà vigore costante al nostro lievito madre naturale, e nel profumo sprionato dai veri baccelli di vaniglia incisi uno ad uno prima di bollire nel latte cremoso.
                    </p>

                    <div className="border-l-4 border-brand-primary pl-4 py-2 italic text-brand-dark text-sm">
                      &ldquo;I dolci industriali sono perfetti nelle forme ma vuoti di carattere. Nelle imperfezioni di una frolla stesa col mattarello e nei ciuffi diversi di una chantilly si nasconde la vera poesia dell’artigianalità.&rdquo;
                    </div>
                  </div>

                  {/* Collage static display */}
                  <div className="lg:col-span-6 relative flex justify-center p-2">
                    <div className="relative w-full max-w-md aspect-4/5 rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-sm border border-brand-border bg-white p-3">
                      <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden">
                        <img 
                          src="/src/assets/images/signature_cake_1781201004606.jpg" 
                          alt="Preparazione torte fresche mastro pasticcere"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-x-6 bottom-6 bg-black/60 backdrop-blur-xs p-6 rounded-2xl text-white">
                        <p className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#FDFBF7]">Genuinità in tavola</p>
                        <h4 className="font-serif font-bold text-lg sm:text-xl mt-1">Materie Prime di Altissimo Pregio</h4>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* RAW INGREDIENTS BANNER SHOWCASE */}
              <section className="bg-brand-secondary text-white py-20 border-y border-brand-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto space-y-3 pb-12">
                    <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#FDFBF7] font-bold">I nostri ingredienti d’oro</span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold">Un dolce è buono solo quanto le materie prime che lo compongono</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    
                    <div className="p-8 rounded-[32px] sm:rounded-[40px] bg-white/10 border border-white/15 space-y-4">
                      <span className="text-3xl block">🥛</span>
                      <h4 className="font-serif font-bold text-[18px] text-[#FDFBF7] tracking-tight">Latte e Uova Locali</h4>
                      <p className="text-xs text-[#FDFBF7]/85 leading-relaxed font-light">
                        Collaboriamo direttamente con piccoli allevamenti del territorio di Cremona per ricevere latte fresco intero biologico e uova freschissime da galline allevate esclusivamente a terra.
                      </p>
                    </div>

                    <div className="p-8 rounded-[32px] sm:rounded-[40px] bg-white/10 border border-white/15 space-y-4">
                      <span className="text-3xl block">🌾</span>
                      <h4 className="font-serif font-bold text-[18px] text-[#FDFBF7] tracking-tight">Lievito Madre Centenario</h4>
                      <p className="text-xs text-[#FDFBF7]/85 leading-relaxed font-light">
                        Il cuore battente dei nostri lievitati e panettoni. Un lievito madre tramandato da generazioni, rinfrescato a mano ogni singolo giorno per garantire digeribilità e alveolatura soffice incredibile.
                      </p>
                    </div>

                    <div className="p-8 rounded-[32px] sm:rounded-[40px] bg-white/10 border border-white/15 space-y-4">
                      <span className="text-3xl block">🍫</span>
                      <h4 className="font-serif font-bold text-[18px] text-[#FDFBF7] tracking-tight">Cioccolato Monorigine Belga</h4>
                      <p className="text-xs text-[#FDFBF7]/85 leading-relaxed font-light">
                        Utilizziamo coperture al cacao d’origeni selezionate (Ecuador, Madagascar e Belgio) per donare alle praline, alle ganache e alla sfoglia dorata un corpo aromatico avvolgente e inconfondibile.
                      </p>
                    </div>

                  </div>
                </div>
              </section>

              {/* TIMELINE PRESTIGIOUS ACCENTS */}
              <section className="max-w-5xl mx-auto px-4">
                <div className="text-center pb-8">
                  <h4 className="font-serif text-2xl sm:text-3xl font-black text-brand-dark">Pietre miliari di Dolce Idea</h4>
                </div>

                <div className="relative border-l border-brand-border/40 pl-6 space-y-8 max-w-xl mx-auto py-5 font-light">
                  <div className="relative">
                    <span className="absolute -left-10 top-0.5 bg-brand-primary text-white text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-bold">98</span>
                    <h5 className="font-serif font-bold text-brand-dark text-sm leading-snug">Fondazione a Cremona</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">Nata come un piccolissimo laboratorio, focalizzato esclusivamente sulla pasticceria da asporto domenicale.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-10 top-0.5 bg-brand-primary text-white text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-bold">08</span>
                    <h5 className="font-serif font-bold text-brand-dark text-sm leading-snug">Primi riconoscimenti locali</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">La nostra torta pan di spagna e sfoglia al cioccolato viene nominata per la fragranza e leggerezza indescrivibile tra i migliori dolci della provincia.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-10 top-0.5 bg-brand-primary text-white text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-bold">26</span>
                    <h5 className="font-serif font-bold text-brand-dark text-sm leading-snug">Unione di Digitale e Tradizione</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">Abilitiamo listini interattivi online e preventivi precompilati pronti per WhatsApp per snellire i tempi d’attesa delle famiglie e asporto della domenica.</p>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ==================== CONTACTS TAB ==================== */}
          {activeTab === 'contatti' && (
            <motion.div
              key="contatti"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16"
            >
              
              {/* Custom Interactive Map with dynamic opened status */}
              <CustomMap />

              {/* TIMETABLES & BUSINESS STYLED GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Visual Timetable card */}
                <div className="bg-white p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-brand-border space-y-6">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-brand-border">
                    <Clock className="w-5 h-5 text-brand-primary" />
                    <h4 className="font-serif text-xl font-bold text-brand-dark">Orari d’Apertura del Negozio</h4>
                  </div>

                  <div className="space-y-3">
                    {openHours.map((row) => (
                      <div 
                        key={row.day}
                        className={`flex items-center justify-between text-xs sm:text-sm py-1.5 ${
                          row.day === 'Lunedì' ? 'text-brand-muted/70 font-light' : 'text-brand-dark border-b border-brand-border/40 pb-1.5 last:border-0'
                        }`}
                      >
                        <span className="font-bold">{row.day}</span>
                        <span className="font-mono bg-brand-sand/50 px-2.5 py-1 rounded-md text-xs font-bold">{row.hours}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-brand-sand/30 border border-brand-border rounded-2xl text-brand-muted text-[11px] leading-relaxed">
                    🌟 <strong>Consiglio del Laboratorio:</strong> La domenica mattina è il momento di maggior affluenza per la mignon fresca. Consigliamo di asportare prenotando tramite il form WhatsApp entro il sabato pomeriggio.
                  </div>
                </div>

                {/* Direct Message Hotline & FAQs Box */}
                <div className="bg-brand-primary text-white p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-brand-border/60 space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_bottom,rgba(253,251,247,0.1),transparent_60%)]" />
                  
                  <div className="space-y-4 relative z-10">
                    <h4 className="font-serif text-2xl font-bold text-white">Assistenza Preventivi</h4>
                    <p className="text-xs sm:text-sm text-[#FDFBF7]/80 leading-relaxed font-light">
                      Vuoi discutere al volo con la pasticcera prima della prenotazione? Hai un disegno o un’occasione speciale e hai dubbi sulle porzioni? Chiamaci direttamente o scrivici su WhatsApp.
                    </p>
                    <p className="text-[10px] text-[#FDFBF7]/95 font-bold tracking-widest uppercase">• Rispondiamo tempestivamente negli orari lavorativi!</p>
                  </div>

                  <div className="space-y-3 pt-6 relative z-10">
                    <a
                      href="tel:3270540170"
                      className="inline-flex items-center justify-center gap-2.5 w-full py-4 bg-[#FDFBF7] hover:bg-brand-sand text-brand-dark font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-colors shadow-sm"
                    >
                      <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                      Chiama: 327 054 0170
                    </a>

                    <a
                      href="https://wa.me/393270540170?text=Ciao%20Pasticceria%20Dolce%20Idea%2C%20vorrei%20informazioni%20su..."
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center justify-center gap-2.5 w-full py-4 bg-transparent hover:bg-white/10 text-[#FDFBF7] font-sans text-xs uppercase tracking-widest font-bold rounded-full transition-colors border border-white/20"
                    >
                      <Instagram className="w-4 h-4 text-white shrink-0" />
                      Ispirazioni Instagram
                    </a>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 4. FOOTER */}
      <Footer />

    </div>
  );
}
