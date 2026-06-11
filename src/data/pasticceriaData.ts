import { Product, Review } from '../types';

export const SIGNATURE_CAKE_IMAGE = '/src/assets/images/signature_cake_1781201004606.jpg';
export const MIGNON_TRAY_IMAGE = '/src/assets/images/mignon_tray_1781201022637.jpg';

export const productsList: Product[] = [
  {
    id: 'sig-1',
    name: 'Il Sogno di Cremona (Torta Compleanno Signature)',
    description: 'Il nostro dolce più amato: un pan di spagna soffice bagnato finemente, doppia farcitura di vellutata crema chantilly e una sfoglia croccante al cioccolato belga.',
    detailedDescription: 'Creata seguendo la ricetta esclusiva di famiglia della nostra pasticcera. L’unione armoniosa del pan di spagna leggero come una nuvola, la ricchezza della chantilly artigianale fatta con baccelli di vaniglia Bourbon e lo scrigno croccante di cioccolato ne fanno una vera gloria locale.',
    price: 32.00,
    unit: 'kg',
    category: 'torte',
    allergens: ['Glutine', 'Uova', 'Latte', 'Soia'],
    isSignature: true,
    image: SIGNATURE_CAKE_IMAGE,
    badge: 'La Ricetta del Cuore'
  },
  {
    id: 'torta-1',
    name: 'Crostata Premium alle Fragoline e Lamponi',
    description: 'Pasta frolla friabilissima stesa fine a mano, velata con confettura artigianale di lamponi e coronata da freschissime fragoline di bosco.',
    price: 28.00,
    unit: 'kg',
    category: 'torte',
    allergens: ['Glutine', 'Uova', 'Latte'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    badge: 'Fatta Oggi'
  },
  {
    id: 'torta-2',
    name: 'Torta Cremosa Nocciola e Caramello',
    description: 'Base di biscotto friabile al sale di Cervia, bavarese alla nocciola tonda gentile delle Langhe IGP e specchio di caramello morbido.',
    price: 34.00,
    unit: 'kg',
    category: 'torte',
    allergens: ['Frutta a guscio', 'Latte', 'Uova', 'Glutine'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mignon-1',
    name: 'Vassoio Mignon d’Autore (Selezionato)',
    description: 'Assortimento raffinato dei nostri piccoli gioielli: bignè croccanti ripieni di crema al pistacchio di Bronte, mini tartellette, cannolicchi mignon e cestini di frutta.',
    price: 34.00,
    unit: 'kg',
    category: 'mignon',
    allergens: ['Glutine', 'Latte', 'Uova', 'Frutta a guscio'],
    image: MIGNON_TRAY_IMAGE,
    badge: 'I più venduti'
  },
  {
    id: 'mignon-2',
    name: 'Macarons della Boutique',
    description: 'Morbidi gusci di meringa alle mandorle con ripieni setosi di ganache ai frutti di bosco, cioccolato monorigine e vaniglia d’Andasibe.',
    price: 2.00,
    unit: 'cad.',
    category: 'mignon',
    allergens: ['Frutta a guscio', 'Uova', 'Latte'],
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'liev-1',
    name: 'Brioche Sfogliata Classica',
    description: 'Sfogliatura perfetta a specchio ottenuta con burro di Normandia d’affioramento. Fragrante e leggera, ideale per iniziare la giornata.',
    price: 1.50,
    unit: 'cad.',
    category: 'lievitati',
    allergens: ['Glutine', 'Latte', 'Uova'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
    badge: 'Sfornata ore 07:00'
  },
  {
    id: 'liev-2',
    name: 'Krapfen con Crema Espresso',
    description: 'Soffice impasto lievitato lentamente, fritto leggero e farcito al momento con crema calda infusa con caffè 100% Arabica cremonese.',
    price: 1.80,
    unit: 'cad.',
    category: 'lievitati',
    allergens: ['Glutine', 'Latte', 'Uova'],
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cioc-1',
    name: 'Praline Artigianali al Fondente 72%',
    description: 'Piccole gemme realizzate a mano con miscele di cacao del Madagascar e dell’Ecuador, con cuori ganache al liquore e scorzette.',
    price: 45.00,
    unit: 'kg',
    category: 'cioccolateria',
    allergens: ['Soia', 'Latte', 'Frutta a guscio'],
    image: 'https://images.unsplash.com/photo-1548907040-4d42b52125bf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'stag-1',
    name: 'Colomba Artigianale di Cremona',
    description: 'Lievito madre centenario, 36 ore di lievitazione, profumata con cubetti di arancia candita a mano e ricoperta da una croccante glassa alle mandorle baresi.',
    price: 36.00,
    unit: 'cad.',
    category: 'stagionali',
    allergens: ['Glutine', 'Uova', 'Latte', 'Frutta a guscio'],
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=600&auto=format&fit=crop',
    badge: 'Specialità di Primavera'
  },
  {
    id: 'reg-1',
    name: 'Cesto Regalo "Golosità di Cremona"',
    description: 'Una confezione di lusso comprendente un vassoio di pasticceria assortita, un sacchetto di biscotti krumiri speziati e una bottiglia di moscato selezionato DOCG.',
    price: 48.00,
    unit: 'confez.',
    category: 'regali',
    allergens: ['Glutine', 'Latte', 'Uova', 'Frutta a guscio', 'Solfiti'],
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=600&auto=format&fit=crop',
    badge: 'Regalo Perfetto'
  }
];

export const reviewsList: Review[] = [
  {
    id: 'rev-1',
    author: 'MANUELA ANDREOLI',
    rating: 5,
    date: '3 mesi fa',
    text: 'È la pasticceria che consiglierei anche a chi non conosce Cremona, proprio perché, nonostante la posizione non centralissima e la scarsa visibilità del negozio, produce i dolci migliori della città. Ho già provato, in diverse occasioni, i mignon e la torta di compleanno e sono di una leggerezza indescrivibile.',
    isLocalGuide: true,
    tag: 'Consigliatissimo per la Mignon',
    replied: true,
    replyText: 'La ringraziamo di cuore per le Sue splendide parole! Sapere che ha apprezzato la nostra pasticceria è per noi la più grande soddisfazione. Mettiamo passione e cura in ogni dolce, e leggere la Sua recensione ci riempie di orgoglio.'
  },
  {
    id: 'rev-2',
    author: 'Gxxx Txxx',
    rating: 5,
    date: '2 anni fa',
    text: 'La nostra pasticceria di fiducia da anni! Pasticcini ottimi, sempre freschi e di grosse dimensioni. La torta di compleanno (un pan di spagna con doppia farcitura e sfoglia al cioccolato) era semplicemente deliziosa, è stata lodata da tutti gli invitati per la leggerezza e la bontà. Grazie mille di cuore!',
    isLocalGuide: false,
    tag: 'Migliori torte di compleanno',
    replied: true,
    replyText: 'Grazie infinite! Per noi è un onore far parte dei vostri compleanni e dei vostri ricordi più dolci da così tanto tempo!'
  },
  {
    id: 'rev-3',
    author: 'Anna',
    rating: 5,
    date: '2 anni fa',
    text: 'Pasticceria molto piccola e semplice ma con un buon assortimento di prodotti sia in versione mignon che per più persone. Il caffè è buono e può essere consumato sul posto a un piccolo bancone. Abbiamo provato una crostatina e l’impasto era steso molto fine, marmellata buona di ottima qualità. La gerente è molto gentile e i prezzi sono ottimi.',
    isLocalGuide: true,
    tag: 'Frolla incredibile e caffè'
  }
];

export const openHours = [
  { day: 'Lunedì', hours: 'Chiuso' },
  { day: 'Martedì', hours: '08:00 - 12:30 | 15:30 - 19:30' },
  { day: 'Mercoledì', hours: '08:00 - 12:30 | 15:30 - 19:30' },
  { day: 'Giovedì', hours: '08:00 - 12:30 | 15:30 - 19:30' },
  { day: 'Venerdì', hours: '08:00 - 12:30 | 15:30 - 19:30' },
  { day: 'Sabato', hours: '08:00 - 13:00 | 15:30 - 20:00' },
  { day: 'Domenica', hours: '08:00 - 13:00' }
];

export const trustBadges = [
  {
    title: 'Ricette di Famiglia',
    desc: 'Dolci confezionati con ricette tradizionali tramandate dal 1998, curando ogni singolo passaggio.',
    icon: 'Heart'
  },
  {
    title: '100% Artigianale',
    desc: 'Lavorazione interamente manuale. Niente preparati industriali, lievitazioni forzate o scorciatoie.',
    icon: 'Sparkles'
  },
  {
    title: 'Ingredienti Selezionati',
    desc: 'Uova fresche da allevamenti km0, burro normanno d’affioramento, cioccolato belga d’origine protetta.',
    icon: 'Award'
  },
  {
    title: 'Senza Conservanti',
    desc: 'Garantiamo al 100% la purezza del dolce. Creme freschissime e frutta fresca di stagione.',
    icon: 'ShieldCheck'
  }
];
