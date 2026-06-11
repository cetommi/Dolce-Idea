import { useState, FormEvent } from 'react';
import { Mail, Phone, Calendar, User, FileText, CheckCircle, Smartphone, Send, Plus, Minus, Trash } from 'lucide-react';
import { Product, CustomCakeConfig, CartItem } from '../types';

interface OrderInquiryFormProps {
  selectedItems: CartItem[];
  onRemoveItem: (prodId: string) => void;
  onClearItems: () => void;
  onIncrementItem: (prodId: string) => void;
  onDecrementItem: (prodId: string) => void;
}

export default function OrderInquiryForm({
  selectedItems,
  onRemoveItem,
  onClearItems,
  onIncrementItem,
  onDecrementItem
}: OrderInquiryFormProps) {
  // Config state
  const [formData, setFormData] = useState<CustomCakeConfig>({
    occasion: 'Compleanno',
    servings: 12,
    baseFlavor: 'Pan di Spagna classico bagnato macedonia',
    filling: 'Crema Chantilly con gocce di cioccolato',
    decorations: ['Scritta di Auguri'],
    deliveryDate: '',
    deliveryTime: '11:00',
    specialNotes: '',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Occasions list
  const occasions = [
    'Compleanno',
    'Matrimonio (Wedding Cake)',
    'Laurea / Traguardo',
    'Battesimo / Comunione',
    'Anniversario',
    'Festa Aziendale / Evento',
    'Solo Voglia di Buono!'
  ];

  // Base flavors list
  const bases = [
    'Pan di Spagna Classico soffice bagnato fior di marasca',
    'Pan di Spagna al Cacao profondo',
    'Pasta Sfoglia Croccante e Caramellata',
    'Biscotto Friabile alle Mandorle baresi'
  ];

  // Fillings list
  const fillings = [
    'Crema Chantilly classica alle bacche di Vaniglia',
    'Cioccolato Belga setoso e ganache fondente',
    'Pistacchio Puro di Bronte DOP',
    'Crema al Limone d’Amalfi profumata'
  ];

  // Decor lists
  const availableDecors = [
    'Scritta di Auguri personalizzata',
    'Macarons colorati della casa',
    'Fragoline di bosco fresche',
    'Scaglie d’oro zecchino eduli',
    'Fiori freschi non trattati'
  ];

  // Handle checkboxes
  const handleDecorToggle = (decor: string) => {
    const list = formData.decorations;
    if (list.includes(decor)) {
      setFormData({ ...formData, decorations: list.filter(d => d !== decor) });
    } else {
      setFormData({ ...formData, decorations: [...list, decor] });
    }
  };

  // Estimate price
  const calculateEstimatedPrice = () => {
    let basePricePerServing = 3.5; // €3.50 a slice
    if (formData.occasion.includes('Matrimonio')) {
      basePricePerServing = 5.0; // premium wedding cake detailing
    }
    let total = formData.servings * basePricePerServing;
    
    // Add custom decorations increments
    total += formData.decorations.length * 4;

    // Add selected standalone pastries totals
    selectedItems.forEach(item => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  // Submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Custom validations
    if (!formData.customerName.trim()) {
      setErrorMsg('Per favore inserisci il tuo nome.');
      return;
    }
    if (!formData.customerPhone.trim()) {
      setErrorMsg('Per favore inserisci un recapito telefonico valido.');
      return;
    }
    if (!formData.deliveryDate) {
      setErrorMsg('Scegli la data di ritiro per il tuo dolce fresco.');
      return;
    }

    // Check ifSelected day is a Monday (giorno di chiusura)
    const pickupDateObj = new Date(formData.deliveryDate);
    const dayOfWeek = pickupDateObj.getDay(); // 0 is Sun, 1 is Mon
    if (dayOfWeek === 1) {
      setErrorMsg('Attenzione: La Pasticceria è chiusa il Lunedì. Scegli un giorno da Martedì a Domenica.');
      return;
    }

    setFormSubmitted(true);
  };

  // WhatsApp redirection generator
  const getWhatsAppLink = () => {
    const phone = '3270540170'; // Target mobile for Pasticceria Dolce Idea
    
    let text = `Ciao Pasticceria Dolce Idea, vorrei richiedere un preventivo per:\n\n`;
    
    // Custom cake text if configured
    text += `🍰 TORTA CUSTOM PER ORDINAZIONE:\n`;
    text += `- Occasione: ${formData.occasion}\n`;
    text += `- Porzioni/Persone: ${formData.servings} fette\n`;
    text += `- Base: ${formData.baseFlavor}\n`;
    text += `- Farcitura: ${formData.filling}\n`;
    text += `- Decorazioni: ${formData.decorations.join(', ') || 'Nessuna extra'}\n\n`;

    // Standalone items if any in the cart
    if (selectedItems.length > 0) {
      text += `🛍️ DOLCI AGGIUNTIVI DAL MENU:\n`;
      selectedItems.forEach(item => {
        text += `- ${item.product.name} x ${item.quantity} (${item.product.price.toFixed(2)}€/${item.product.unit})\n`;
      });
      text += `\n`;
    }

    text += `📅 DETTAGLI DI CONSEGNA:\n`;
    text += `- Giorno di Ritiro: ${formData.deliveryDate}\n`;
    text += `- Ora Ritiro indicativa: ${formData.deliveryTime}\n`;
    if (formData.specialNotes.trim()) {
      text += `- Note particolari/Scritte: ${formData.specialNotes}\n`;
    }
    text += `\n👤 RECAPITO:\n`;
    text += `- Nome cliente: ${formData.customerName}\n`;
    text += `- Telefono: ${formData.customerPhone}\n`;
    
    text += `\nStima indicativa preventiva: € ${calculateEstimatedPrice().toFixed(2)}`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/39${phone}?text=${encodedText}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden" id="order-inquiry-wizard">
      
      {/* Top beautiful header with warm color */}
      <div className="bg-amber-950 text-amber-50 p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_bottom,rgba(180,83,9,0.15),transparent_70%)]" />
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
          Crea il tuo Preventivo Dolce
        </h3>
        <p className="text-amber-200/90 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Sia che tu stia sognando una torta di compleanno spettacolare o voglia ordinare un cabaret di mignon assortiti per la domenica. Compila i semplici passi.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* INQUIRY BASKET AREA if they pre-selected items */}
            {selectedItems.length > 0 && (
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-900/10 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-amber-900/15">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-900">
                    Dolci Selezionati dal Menu ({selectedItems.length})
                  </span>
                  <button
                    type="button"
                    onClick={onClearItems}
                    className="text-stone-500 hover:text-amber-800 text-xs underline"
                    id="clear-basket-btn"
                  >
                    Svuota tutto
                  </button>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {selectedItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs sm:text-sm bg-white p-2.5 rounded-xl border border-stone-150 shadow-sm"
                    >
                      <div className="pr-4">
                        <p className="font-semibold text-stone-800 leading-tight">
                          {item.product.name}
                        </p>
                        <span className="text-amber-900 font-medium text-xs">
                          € {item.product.price.toFixed(2)} / {item.product.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            type="button"
                            onClick={() => onDecrementItem(item.product.id)}
                            className="p-1 hover:bg-stone-150 text-stone-600 transition-colors"
                            aria-label="Riduci copia"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 font-bold font-mono text-xs select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrementItem(item.product.id)}
                            className="p-1 hover:bg-stone-150 text-stone-600 transition-colors"
                            aria-label="Aumenta copia"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                          title="Rimuovi prodotto"
                          id={`remove-cart-${item.product.id}`}
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WIZARD DIVISION 1: Cake Config */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-sans text-xs font-black">
                  1
                </span>
                Configura la tua Torta Personalizzata
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Occasion Option */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Occasione della Festa
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                    id="select-occasion"
                  >
                    {occasions.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                {/* Slices of Cake */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Numero di Fette / Persone ({formData.servings})
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="4"
                      max="60"
                      step="2"
                      value={formData.servings}
                      onChange={(e) => setFormData({ ...formData, servings: parseInt(e.target.value) })}
                      className="w-full accent-amber-900"
                    />
                    <span className="w-12 text-center bg-amber-50 text-amber-950 px-2 py-1.5 rounded-lg border border-amber-200 font-bold font-mono text-sm shrink-0">
                      {formData.servings}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-1">Consigliato: ~120g di torta per persona</span>
                </div>

                {/* Base Cake selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Base della Torta (Pan di spagna o sfoglia)
                  </label>
                  <select
                    value={formData.baseFlavor}
                    onChange={(e) => setFormData({ ...formData, baseFlavor: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                    id="select-base"
                  >
                    {bases.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Fillings selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Gusto della Farcia
                  </label>
                  <select
                    value={formData.filling}
                    onChange={(e) => setFormData({ ...formData, filling: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                    id="select-filling"
                  >
                    {fillings.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Checkboxes decoration options */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Dettagli Decorativi Aggiuntivi
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDecors.map(dec => {
                    const checked = formData.decorations.includes(dec);
                    return (
                      <label
                        key={dec}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-colors ${
                          checked 
                            ? 'bg-amber-50/60 border-amber-800 text-amber-900 font-medium' 
                            : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleDecorToggle(dec)}
                          className="accent-amber-950 rounded"
                        />
                        <span>{dec}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* WIZARD DIVISION 2: Pickup details */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <h4 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-sans text-xs font-black">
                  2
                </span>
                Dettagli di Ritiro & Logistica
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Date selection with calendar */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Data Ritiro In Pasticceria
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                      required
                      id="input-date"
                    />
                  </div>
                  <span className="text-[10px] text-amber-700 block mt-1">
                    Nota: si richiede preferibilmente un anticipo di 48 ore. Lunedì chiuso.
                  </span>
                </div>

                {/* Time selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Ora del Ritiro
                  </label>
                  <select
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                    id="select-time"
                  >
                    <option value="08:30">08:30 (Sfornato Fresco)</option>
                    <option value="11:00">11:00 (Pranzo della Domenica)</option>
                    <option value="12:00">12:00 (Ideale per asporto pomeridiano)</option>
                    <option value="16:00">16:00</option>
                    <option value="18:30">18:30 (Aperitivo fine giornata)</option>
                  </select>
                </div>

              </div>

              {/* Special written note or request */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Note Speciali, Allergie o Scritta della Torta
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    placeholder="Specificare qui la frase da scrivere sulla torta (es: 'Buon Compleanno Sofia 10') o segnalare intolleranze alimentari rilevanti..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none placeholder:text-stone-400"
                    id="input-notes"
                  />
                </div>
              </div>
            </div>

            {/* WIZARD DIVISION 3: Contact */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              <h4 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-sans text-xs font-black">
                  3
                </span>
                Recapito e Contatto
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="es. Marco Rossi"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                      required
                      id="input-name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Telefono / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="es. 340 1234567"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                      required
                      id="input-phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Indirizzo Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="es. nome@email.it"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:ring-2 focus:ring-amber-900 outline-none"
                      id="input-email"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Error alerts */}
            {errorMsg && (
              <div className="bg-red-50 text-red-900 p-4 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            {/* Price Preview section & CTA */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-150 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-stone-500 uppercase font-mono">Totale Stimato Preventivo</p>
                <p className="text-amber-950 font-serif text-2xl sm:text-3xl font-black mt-1">
                  € {calculateEstimatedPrice().toFixed(2)}
                </p>
                <span className="text-[10px] text-stone-400 block max-w-sm mt-0.5">
                  Il prezzo effettivo potrebbe leggermente variare in base alla decorazione finale concordata con lo chef.
                </span>
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold rounded-xl transition-all shadow-lg text-sm"
                  id="btn-submit-inquiry"
                >
                  <Send className="w-4 h-4 text-yellow-300" />
                  Calcola e Procedi
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* SUCCESS SCREEN with preconfigured Whatsapp button */
          <div className="text-center py-10 px-4 space-y-6" id="success-inquiry">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto text-3xl shadow-md">
              <CheckCircle className="w-8 h-8 font-black" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-950">
                Grazie, {formData.customerName}!
              </h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Il tuo preventivo è stato calcolato ed è pronto nell’hub di asporto della pasticceria. 
                Puoi inviarcelo subito su WhatsApp per velocizzare la preparazione e confermare il ritiro.
              </p>
            </div>

            {/* Generated Order Summary Box */}
            <div className="bg-stone-50 text-left p-5 sm:p-6 rounded-2xl border border-stone-150 max-w-lg mx-auto space-y-3.5 text-xs sm:text-sm">
              <div className="border-b border-stone-200 pb-2">
                <p className="font-mono text-[10px] uppercase font-bold text-amber-800">Riepilogo Preventivo</p>
                <p className="font-serif font-bold text-stone-900 text-lg mt-0.5">{formData.occasion}</p>
              </div>

              <ul className="space-y-2 text-stone-700">
                <li>• <strong>Dimensione Torta:</strong> {formData.servings} fette</li>
                <li>• <strong>Base scelta:</strong> {formData.baseFlavor}</li>
                <li>• <strong>Farcitura:</strong> {formData.filling}</li>
                {formData.decorations.length > 0 && (
                  <li>• <strong>Decorazioni:</strong> {formData.decorations.join(', ')}</li>
                )}
                {selectedItems.length > 0 && (
                  <li>
                    • <strong>Dolci da vetrina aggiunti:</strong>
                    <ul className="pl-4 mt-1 space-y-1 list-disc text-stone-600 font-light">
                      {selectedItems.map(item => (
                        <li key={item.product.id}>
                          {item.product.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                <li>• <strong>Data di Ritiro in Negozio:</strong> {formData.deliveryDate} alle ore {formData.deliveryTime}</li>
                {formData.specialNotes && (
                  <li>• <strong>Messaggio o note:</strong> &quot;{formData.specialNotes}&quot;</li>
                )}
              </ul>

              <div className="border-t border-stone-200 pt-3 flex items-center justify-between font-bold text-base text-amber-950">
                <span>Stima Totale:</span>
                <span className="font-serif text-xl">€ {calculateEstimatedPrice().toFixed(2)}</span>
              </div>
            </div>

            {/* Dual Actions for converting order */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md w-full"
                id="btn-whatsapp-redirect"
              >
                <Smartphone className="w-5 h-5 text-emerald-100" />
                Invia Ordine su WhatsApp
              </a>
              
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  onClearItems();
                }}
                className="px-6 py-4 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold rounded-xl transition-all border border-amber-900/10 w-full"
                id="btn-order-new"
              >
                Crea Nuovo Ordine
              </button>
            </div>

            <p className="text-[11px] text-stone-400">
              Inviando la richiesta WhatsApp, verrai collegato direttamente con i mastro pasticceri per definire i dettagli.
            </p>

          </div>
        )}
      </div>

    </div>
  );
}
