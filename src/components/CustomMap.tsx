import { MapPin, Navigation, Clock, Phone, AlertCircle } from 'lucide-react';
import { openHours } from '../data/pasticceriaData';

export default function CustomMap() {
  // Simple check for opening times
  // Current local time: Thursday 11:02 AM
  // Open status: Thurs is 08:00 - 12:30 | 15:30 - 19:30.
  // We can write a smart real-time calculation in JS to display current open state.
  const checkOpenStatus = () => {
    try {
      const now = new Date();
      // Adjust to Europe/Rome or just use current device time for the simulation
      const day = now.getDay(); // 0 is Sun, 1 is Mon, etc.
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeVal = hour * 100 + minute; // 1102 for 11:02

      if (day === 0) { // Sunday
        return timeVal >= 800 && timeVal <= 1300 
          ? { open: true, text: 'Aperto Ora (Domenica: 08:00 - 13:00)' }
          : { open: false, text: 'Chiuso Ora (Domenica aperto 08:00 - 13:00)' };
      }
      if (day === 1) { // Monday
        return { open: false, text: 'Chiuso oggi (Lunedì giorno di riposo)' };
      }
      
      // Tuesday - Saturday: 08:00 - 12:30 | 15:30 - 19:30/20:00
      const isMorning = timeVal >= 800 && timeVal <= 1230;
      const closingEvening = day === 6 ? 2000 : 1930;
      const isAfternoon = timeVal >= 1530 && timeVal <= closingEvening;

      if (isMorning || isAfternoon) {
        return { open: true, text: `Aperto Ora (Chiusura alle ${isMorning ? '12:30' : day === 6 ? '20:00' : '19:30'})` };
      } else {
        const nextTimeText = timeVal < 800 ? 'Apre alle 08:00 stamattina' : timeVal < 1530 ? 'Apre alle 15:30 oggi pomeriggio' : 'Chiuso per oggi, apre domani alle 08:00';
        return { open: false, text: `Chiuso Ora (${nextTimeText})` };
      }
    } catch {
      return { open: true, text: 'Aperto dalle 08:00 alle 19:30' };
    }
  };

  const status = checkOpenStatus();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="custom-map-section">
      {/* Information Cards */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-full">
            Vieni a trovarci
          </span>
          <h3 className="font-serif text-3xl text-amber-950 mt-3 font-semibold">
            Il Salotto del Dolce nel cuore di Cremona
          </h3>
          <p className="text-stone-600 mt-4 text-sm leading-relaxed">
            Situata in Via Adda 15, la <strong>Pasticceria Dolce Idea</strong> è un rifugio accogliente e profumato appena fuori dal centro storico. Produciamo quotidianamente bignè croccanti, torte celebrative e fragranti colazioni.
          </p>
        </div>

        {/* Real-time Status Card */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all chocolate-card ${
          status.open 
            ? 'bg-emerald-50/70 border-emerald-100 text-emerald-900' 
            : 'bg-amber-50/70 border-amber-100 text-amber-900'
        }`}>
          <div className={`w-3.5 h-3.5 rounded-full animate-ping ${
            status.open ? 'bg-emerald-500' : 'bg-amber-500'
          }`} />
          <div className="flex-1">
            <h4 className="font-bold text-xs uppercase tracking-wide">Orario In tempo reale</h4>
            <p className="text-sm font-medium mt-0.5">{status.text}</p>
          </div>
          <Clock className={`w-5 h-5 opacity-80`} />
        </div>

        {/* Essential Info List */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100/60 text-amber-900 rounded-lg shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-800 text-sm">Indirizzo</p>
              <p className="text-stone-600 text-sm">Via Adda, 15, 26100 Cremona CR</p>
              <span className="text-xs text-stone-400 italic">Quartiere residenziale, facile parcheggio gratuito</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100/60 text-amber-900 rounded-lg shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-stone-800 text-sm">Telefono & WhatsApp</p>
              <p className="text-amber-800 text-sm font-medium">327 054 0170</p>
              <span className="text-xs text-stone-400">Chiamate per asporto o preventivi istantanei</span>
            </div>
          </div>
        </div>

        {/* Google Maps External Button */}
        <a
          href="https://maps.google.com/?q=Pasticceria+Dolce+Idea+Cremona+Via+Adda+15"
          target="_blank"
          referrerPolicy="no-referrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold rounded-xl transition-all chocolate-card text-center group"
          id="btn-google-maps"
        >
          <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform text-yellow-300" />
          Ottieni Indicazioni Stradali
        </a>
      </div>

      {/* Styled Interactive/Visual Map representation */}
      <div className="lg:col-span-7 bg-stone-100 rounded-3xl border border-stone-200 overflow-hidden relative min-h-[380px] flex items-center justify-center chocolate-card">
        {/* Decorative Grid Lines to make it look like a map */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Clean illustrative vector graphic representing streets in Cremona */}
        <svg className="absolute inset-0 w-full h-full text-stone-300 opacity-65" preserveAspectRatio="none" viewBox="0 0 400 300">
          {/* Main roads */}
          <path d="M 0 50 Q 80 80 150 120 T 400 130" stroke="currentColor" strokeWidth="12" fill="none" />
          <path d="M 100 0 Q 120 180 150 300" stroke="currentColor" strokeWidth="10" fill="none" />
          <path d="M 0 250 C 150 250 200 180 400 240" stroke="currentColor" strokeWidth="8" fill="none" />
          {/* Secondary streets */}
          <path d="M 280 0 L 280 300" stroke="currentColor" strokeWidth="4" strokeDasharray="5,5" fill="none" />
          <path d="M 0 100 L 400 100" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Po River or Cremona landmarks decorative water outline */}
          <path d="M -50 290 Q 120 220 300 310" stroke="#bfdbfe" strokeWidth="24" fill="none" className="opacity-40" />
        </svg>

        {/* Landmarks */}
        <div className="absolute top-1/4 left-1/3 bg-stone-200/80 px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-500 border border-stone-300">
          Piazza del Comune (Torrazzo)
        </div>
        <div className="absolute bottom-1/5 right-1/4 bg-stone-200/80 px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-500 border border-stone-300">
          Fiume Po
        </div>
        <div className="absolute top-8 right-12 bg-stone-200/80 px-2 py-1 rounded text-[10px] uppercase font-mono tracking-wider font-semibold text-stone-500 border border-stone-300">
          Parco Adda
        </div>

        {/* Map Pin representing Pasticceria Dolce Idea */}
        <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
          <div className="flex items-center gap-2 bg-white text-stone-900 px-4 py-2.5 rounded-2xl shadow-xl border border-amber-200 font-serif font-bold text-sm tracking-tight">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            Dolce Idea
            <span className="text-yellow-500 text-xs">★ 4.5</span>
          </div>
          {/* Stem & shadow */}
          <div className="w-1 h-6 bg-amber-800 shadow" />
          <div className="w-6 h-1.5 bg-black/10 rounded-full blur-[1px] -mt-1" />
        </div>

        {/* Floating Instruction */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-stone-100 shadow flex items-center gap-2 text-xs text-stone-600">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Fai click su <strong>Ottieni Indicazioni</strong> per avviare il Navigatore Gps GPS con l’indirizzo esatto.</span>
        </div>
      </div>
    </div>
  );
}
